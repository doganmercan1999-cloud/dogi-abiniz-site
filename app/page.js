"use client";

import { useEffect, useMemo, useState } from "react";

const socials = [
  { name: "Kick", handle: "@dogiabiniz", href: "https://kick.com/dogiabiniz", icon: "K", className: "kick" },
  { name: "YouTube", handle: "@dogiabi", href: "https://www.youtube.com/@dogiabi", icon: "▶", className: "youtube" },
  { name: "Instagram", handle: "doganmercan7", href: "https://www.instagram.com/doganmercan7/", icon: "◎", className: "instagram" },
  { name: "Discord", handle: "Yakında", href: "#", icon: "◖◗", className: "discord", disabled: true },
  { name: "İletişim", handle: "dogiabiniz@gmail.com", href: "mailto:dogiabiniz@gmail.com", icon: "✉", className: "mail" }
];

function formatNumber(value) {
  return new Intl.NumberFormat("tr-TR", { notation: "compact", maximumFractionDigits: 1 }).format(value ?? 0);
}

function elapsed(startedAt) {
  if (!startedAt) return null;
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours} sa ${minutes} dk` : `${minutes} dk`;
}

export default function Home() {
  const [kick, setKick] = useState(null);
  const [youtube, setYoutube] = useState(null);
  const [clock, setClock] = useState(Date.now());

  useEffect(() => {
    fetch("/api/kick").then((r) => r.json()).then(setKick).catch(() => setKick({ unavailable: true }));
    fetch("/api/youtube").then((r) => r.json()).then(setYoutube).catch(() => setYoutube({ unavailable: true }));

    const refreshKick = setInterval(() => {
      fetch("/api/kick").then((r) => r.json()).then(setKick).catch(() => {});
    }, 60000);

    const timer = setInterval(() => setClock(Date.now()), 60000);
    return () => {
      clearInterval(refreshKick);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const move = (event) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX / innerWidth * 100}%`);
      document.documentElement.style.setProperty("--my", `${event.clientY / innerHeight * 100}%`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const streamTime = useMemo(() => elapsed(kick?.startedAt), [kick?.startedAt, clock]);

  return (
    <main className="page">
      <div className="aurora" />
      <div className="noise" />

      <section className="profileCard">
        <header className="hero">
          <div className="avatarRing">
            <img src="/profil.png" alt="Dogi Abiniz profil fotoğrafı" />
          </div>
          <div className="verified">✓</div>
          <h1>Dogi <span>Abiniz</span></h1>
          <p>Streamer &amp; Content Creator</p>

          <div className={`mainStatus ${kick?.live ? "isLive" : ""}`}>
            <i />
            {!kick ? "Yayın durumu kontrol ediliyor..." :
             kick.live ? `${formatNumber(kick.viewers)} kişi şu an yayında` :
             kick.unavailable ? "Yayın durumu geçici olarak alınamıyor" :
             "Şu anda çevrimdışı"}
          </div>
        </header>

        {kick?.live && (
          <a className="streamPanel" href="https://kick.com/dogiabiniz" target="_blank" rel="noreferrer">
            <div className="streamTop">
              <span className="livePill"><i /> CANLI</span>
              <span>{formatNumber(kick.viewers)} izleyici</span>
              {streamTime && <span>{streamTime}</span>}
            </div>
            <h2>{kick.title || "Dogi Abiniz yayında"}</h2>
            <p>{kick.category || "Canlı yayın"}</p>
            <strong>Yayına git →</strong>
          </a>
        )}

        <nav className="socials">
          {socials.map((item) => (
            <a
              key={item.name}
              className={`social ${item.className} ${item.disabled ? "disabled" : ""}`}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
            >
              <span className="socialIcon">{item.icon}</span>
              <span className="socialText"><b>{item.name}</b><small>{item.handle}</small></span>
              {item.name === "Kick" && kick?.live && <span className="miniLive"><i /> CANLI</span>}
              <span className="chevron">›</span>
            </a>
          ))}
        </nav>

        <section className="youtubeSection">
          <div className="sectionHeading">
            <div>
              <span className="eyebrow">YOUTUBE</span>
              <h2>Son videolar</h2>
            </div>
            {youtube?.channel && (
              <div className="channelStats">
                <span><b>{formatNumber(youtube.channel.subscribers)}</b> abone</span>
                <span><b>{formatNumber(youtube.channel.views)}</b> görüntülenme</span>
              </div>
            )}
          </div>

          {!youtube ? (
            <div className="notice">Videolar yükleniyor...</div>
          ) : youtube.configured === false ? (
            <div className="notice">
              YouTube otomatik bağlantısı hazır. Vercel’e <b>YOUTUBE_API_KEY</b> eklenince videolar burada otomatik görünecek.
            </div>
          ) : youtube.unavailable ? (
            <div className="notice">YouTube verileri şu anda alınamadı. Kanal bağlantısı çalışmaya devam ediyor.</div>
          ) : (
            <div className="videoGrid">
              {youtube.latestVideos?.map((video) => (
                <a className="video" href={video.url} target="_blank" rel="noreferrer" key={video.id}>
                  <div className="thumb">
                    <img src={video.thumbnail} alt="" />
                    <span>▶</span>
                  </div>
                  <h3>{video.title}</h3>
                  <small>{new Date(video.publishedAt).toLocaleDateString("tr-TR")}</small>
                </a>
              ))}
            </div>
          )}
        </section>

        <footer>
          <span>♛</span>
          <p>Her gün yayın ve yeni videolar!</p>
        </footer>
      </section>
    </main>
  );
}
