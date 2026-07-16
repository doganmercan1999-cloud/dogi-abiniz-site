import { NextResponse } from "next/server";

export const revalidate = 60;

function normalize(data) {
  const live = Boolean(data?.livestream);
  const stream = data?.livestream ?? null;

  return {
    live,
    username: data?.slug ?? "dogiabiniz",
    title: stream?.session_title ?? null,
    viewers: stream?.viewer_count ?? 0,
    category: stream?.categories?.[0]?.name ?? stream?.category?.name ?? null,
    startedAt: stream?.created_at ?? stream?.start_time ?? null,
    thumbnail: stream?.thumbnail?.url ?? null,
    profileImage: data?.user?.profile_pic ?? null
  };
}

export async function GET() {
  try {
    // Kick'in herkese açık web uç noktası. Kick bunu değiştirirse site güvenli
    // biçimde "durum alınamadı" gösterecek; sayfanın geri kalanı çalışmaya devam eder.
    const response = await fetch("https://kick.com/api/v2/channels/dogiabiniz", {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 DogiAbinizWebsite/1.0"
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Kick HTTP ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(normalize(data), {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
    });
  } catch (error) {
    return NextResponse.json(
      {
        live: false,
        unavailable: true,
        message: "Kick durumu şu anda alınamıyor."
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" }
      }
    );
  }
}
