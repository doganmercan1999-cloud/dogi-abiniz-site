import { NextResponse } from "next/server";

export const revalidate = 900;

const API = "https://www.googleapis.com/youtube/v3";

async function youtube(path, params, key) {
  const url = new URL(`${API}/${path}`);
  Object.entries({ ...params, key }).forEach(([name, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(name, String(value));
  });

  const response = await fetch(url, { next: { revalidate: 900 } });
  if (!response.ok) throw new Error(`YouTube HTTP ${response.status}`);
  return response.json();
}

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;

  if (!key) {
    return NextResponse.json({
      configured: false,
      channelUrl: "https://www.youtube.com/@dogiabi",
      message: "YouTube API anahtarı henüz eklenmedi."
    });
  }

  try {
    const channels = await youtube(
      "channels",
      {
        part: "snippet,statistics,contentDetails",
        forHandle: "@dogiabi"
      },
      key
    );

    const channel = channels?.items?.[0];
    if (!channel) throw new Error("YouTube kanalı bulunamadı.");

    const uploads = channel.contentDetails?.relatedPlaylists?.uploads;
    const playlist = await youtube(
      "playlistItems",
      {
        part: "snippet,contentDetails",
        playlistId: uploads,
        maxResults: 3
      },
      key
    );

    const videos = (playlist.items ?? []).map((item) => {
      const id = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
      return {
        id,
        title: item.snippet?.title,
        publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt,
        thumbnail:
          item.snippet?.thumbnails?.maxres?.url ??
          item.snippet?.thumbnails?.high?.url ??
          item.snippet?.thumbnails?.medium?.url,
        url: `https://www.youtube.com/watch?v=${id}`
      };
    });

    return NextResponse.json(
      {
        configured: true,
        channel: {
          id: channel.id,
          title: channel.snippet?.title,
          description: channel.snippet?.description,
          avatar:
            channel.snippet?.thumbnails?.high?.url ??
            channel.snippet?.thumbnails?.default?.url,
          subscribers: Number(channel.statistics?.subscriberCount ?? 0),
          views: Number(channel.statistics?.viewCount ?? 0),
          videos: Number(channel.statistics?.videoCount ?? 0),
          url: "https://www.youtube.com/@dogiabi"
        },
        latestVideos: videos
      },
      {
        headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" }
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        unavailable: true,
        channelUrl: "https://www.youtube.com/@dogiabi",
        message: "YouTube verileri şu anda alınamıyor."
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" }
      }
    );
  }
}
