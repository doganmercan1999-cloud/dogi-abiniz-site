import "./globals.css";

export const metadata = {
  title: "Dogi Abiniz",
  description: "Dogi Abiniz yayınlar, videolar ve sosyal medya bağlantıları",
  metadataBase: new URL("https://dogiabiniz.vercel.app"),
  openGraph: {
    title: "Dogi Abiniz",
    description: "Yayınlar, videolar ve sosyal medya bağlantıları",
    url: "https://dogiabiniz.vercel.app",
    siteName: "Dogi Abiniz",
    images: [{ url: "/profil.png", width: 1200, height: 1200 }],
    locale: "tr_TR",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
