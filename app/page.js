"use client";

import { useEffect, useMemo, useState } from "react";

const SOCIALS = [
  { name: "Kick", handle: "@dogiabiniz", href: "https://kick.com/dogiabiniz", icon: "K", className: "kick" },
  { name: "YouTube", handle: "@dogiabi", href: "https://www.youtube.com/@dogiabi", icon: "▶", className: "youtube" },
  { name: "Instagram", handle: "@doganmercan7", href: "https://www.instagram.com/doganmercan7/", icon: "◎", className: "instagram" },
  { name: "Discord", handle: "Topluluğumuza katıl", href: "#", icon: "◖◗", className: "discord", disabled: true },
  { name: "İletişim", handle: "dogiabiniz@gmail.com", href: "mailto:dogiabiniz@gmail.com", icon: "✉", className: "mail" }
];

function formatNumber(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
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
    const loadKick = () =>
      fetch("/api/kick", { cache: "no-store" })
        .then((r) => r.json())
        .then(setKick)
        .catch(() => setKick({ unavailable: true }));

    const loadYoutube = () =>
      fetch("/api/youtube")
        .then((r) => r.json())
        .then(setYoutube)
        .catch(() => setYoutube({ unavailable: true }));

    loadKick();
    loadYoutube();

    const kickTimer = setInterval(loadKick, 60_000);
    const clockTimer = setInterval(() => setClock(Date.now()), 60_000);

    return () => {
      clearInterval(kickTimer);
      clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX / innerWidth * 100}%`);
      document.documentElement.style.setProperty("--my", `${e.clientY / innerHeight * 100}%`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const streamDuration = useMemo(() => elapsed(kick?.startedAt), [kick?.startedAt, clock]);
  const isLive = Boolean(kick?.live);

  const youtubeStats = youtube?.channel
    ? [
        { label: "TOPLAM ABONE", value: formatNumber(youtube.channel.subscribers), sub: "YouTube abonesi", icon: "♟" },
        { label: "TOPLAM İZLENME", value: formatNumber(youtube.channel.views), sub: "Kanal izlenmesi", icon: "◉" },
        { label: "VİDEO SAYISI", value: formatNumber(youtube.channel.videos), sub: "Yayınlanan video", icon: "▣" }
      ]
    : [
        { label: "TOPLAM ABONE", value: "—", sub: "API bağlanınca görünür", icon: "♟" },
        { label: "TOPLAM İZLENME", value: "—", sub: "API bağlanınca görünür", icon: "◉" },
        { label: "VİDEO SAYISI", value: "—", sub: "API bağlanınca görünür", icon: "▣" }
      ];

  return (
    <main className="page">
      <div className="scene" aria-hidden="true">
        <div className="glow leftGlow" />
        <div className="glow rightGlow" />
        <div className="cursorLight" />
        <div className="edgeBeam leftBeam" />
        <div className="edgeBeam rightBeam" />
      </div>

      <section className="dashboard">
        <aside className="sidebar">
          <div className="avatarZone">
            <div className="avatarEnergy" />
            <div className="avatarRing">
              <img src="/profil.png" alt="Dogi Abiniz profil fotoğrafı" />
            </div>
            <span className="verified">✓</span>
          </div>

          <div className="identity">
            <h1>Dogi <span>Abiniz</span></h1>
            <p>Streamer · Content Creator · Gamer</p>
          </div>

          <div className={`statusPill ${isLive ? "live" : ""}`}>
            <i />
            {isLive ? "Şu anda çevrimiçi!" : kick?.unavailable ? "Durum alınamadı" : "Şu anda çevrimdışı"}
          </div>

          <nav className="socialList">
            {SOCIALS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`socialRow ${item.className} ${item.disabled ? "disabled" : ""}`}
                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
              >
                <span className="socialIcon">{item.icon}</span>
                <span className="socialInfo">
                  <b>{item.name}</b>
                  <small>{item.handle}</small>
                </span>
                {item.name === "Kick" && (
                  <span className={`tinyState ${isLive ? "online" : ""}`}>
                    <i /> {isLive ? "CANLI" : "OFFLINE"}
                  </span>
                )}
                <span className="arrow">↗</span>
              </a>
            ))}
          </nav>

          <div className="sideActions">
            <a href="mailto:dogiabiniz@gmail.com">♡ Destekle</a>
            <span />
            <a href="#links">Tüm linkler →</a>
          </div>
        </aside>

        <section className="mainPanel">
          <div className="topAction">
            <a href="https://kick.com/dogiabiniz" target="_blank" rel="noreferrer">♡ Takip et</a>
          </div>

          <section className={`heroPanel ${isLive ? "isLive" : ""}`}>
            <div className="heroKicker">
              <span><i /> {isLive ? "CANLI YAYINDA" : "CANLI YAYIN"}</span>
            </div>

            <div className="heroGrid">
              <div className="kickOrbWrap">
                <div className="kickOrbit one" />
                <div className="kickOrbit two" />
                <div className="kickOrb">K</div>
              </div>

              <div className="heroCopy">
                <span className="welcome">HOŞGELDİN!</span>
                <h2>
                  {isLive ? (
                    <>Şu anda <strong>CANLI</strong> yayındayım!</>
                  ) : (
                    <>Şu anda <strong>çevrimdışı</strong></>
                  )}
                </h2>
                <p>
                  {isLive
                    ? "Kick kanalımda yayındayım. Hemen katıl, sohbetin bir parçası ol!"
                    : "Yayın açtığımda buradan anlık olarak takip edebilirsin. Bildirimleri açmayı unutma!"}
                </p>

                <div className="heroButtons">
                  <a className="primaryButton" href="https://kick.com/dogiabiniz" target="_blank" rel="noreferrer">
                    Kick kanalına git ↗
                  </a>
                  <button type="button" className="secondaryButton" onClick={() => alert("Tarayıcı bildirim özelliği sonraki sürümde eklenecek.")}>
                    ♧ Bildirimleri aç
                  </button>
                </div>
              </div>

              {isLive && (
                <div className="liveBadgeTop">
                  <span>● LIVE</span>
                  <b>{formatNumber(kick.viewers)}</b>
                </div>
              )}
            </div>

            <div className="statsGrid">
              {youtubeStats.map((stat, index) => (
                <div className="statCard" key={stat.label}>
                  <span className={`statIcon icon${index}`}>{stat.icon}</span>
                  <div>
                    <small>{stat.label}</small>
                    <b>{stat.value}</b>
                    <em>{stat.sub}</em>
                  </div>
                </div>
              ))}
              {isLive && streamDuration && (
                <div className="statCard liveDuration">
                  <span className="statIcon icon3">◷</span>
                  <div>
                    <small>YAYIN SÜRESİ</small>
                    <b>{streamDuration}</b>
                    <em>Şu anki yayın</em>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="youtubeSection">
            <div className="sectionHead">
              <div>
                <span className="youtubeLabel">▣ YOUTUBE</span>
                <h2>Son videolar</h2>
              </div>
              <a href="https://www.youtube.com/@dogiabi" target="_blank" rel="noreferrer">
                YouTube kanalına git ↗
              </a>
            </div>

            {!youtube ? (
              <div className="notice">Videolar yükleniyor...</div>
            ) : youtube.configured === false ? (
              <div className="notice">
                YouTube otomatik bağlantısı hazır. Vercel’e <b>YOUTUBE_API_KEY</b> eklenince son videolar burada görünecek.
              </div>
            ) : youtube.unavailable ? (
              <div className="notice">YouTube verileri şu anda alınamıyor.</div>
            ) : (
              <div className="videoGrid">
                {youtube.latestVideos?.map((video) => (
                  <a key={video.id} href={video.url} target="_blank" rel="noreferrer" className="videoCard">
                    <div className="thumb">
                      <img src={video.thumbnail} alt="" />
                      <span className="play">▶</span>
                    </div>
                    <h3>{video.title}</h3>
                    <small>{new Date(video.publishedAt).toLocaleDateString("tr-TR")}</small>
                  </a>
                ))}
              </div>
            )}
          </section>

          <footer className="footer">
            <span>© 2026 Dogi Abiniz. Tüm hakları saklıdır. 💜</span>
            <div>
              <b>♛</b>
              <b>▣</b>
              <b>♢</b>
            </div>
          </footer>
        </section>
      </section>
    </main>
  );
}
