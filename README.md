# Dogi Abiniz – Next.js V4

## Özellikler

- Kick canlı durumunu dakikada bir otomatik kontrol eder.
- Canlıysa izleyici sayısı, başlık, kategori ve yayın süresini gösterir.
- YouTube son üç videoyu ve kanal istatistiklerini otomatik getirir.
- YouTube API anahtarı yoksa site bozulmaz; kurulum uyarısı gösterir.
- Discord şimdilik pasif durumdadır.
- Mobil uyumlu neon tasarım ve animasyonlar içerir.

## Vercel'e yükleme

Bu klasörü ZIP'ten çıkar. Vercel Dashboard'da mevcut `dogiabiniz` projesine yeni proje kaynak kodu olarak yükle.

Framework otomatik olarak **Next.js** seçilmeli. Build ayarlarını değiştirme.

## YouTube API anahtarı

1. Google Cloud Console'da bir proje oluştur.
2. **YouTube Data API v3** hizmetini etkinleştir.
3. Credentials bölümünden bir **API key** oluştur.
4. Vercel > Project Settings > Environment Variables bölümüne gir.
5. İsim: `YOUTUBE_API_KEY`
6. Değer: oluşturduğun anahtar
7. Production, Preview ve Development ortamlarını seç.
8. Kaydet ve projeyi yeniden deploy et.

Anahtarı kimseyle paylaşma ve kaynak koda yazma.

## Yerel çalıştırma

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Önemli not

Kick canlı verisi, Kick'in web sitesinde kullandığı herkese açık uç noktadan alınmaktadır.
Kick bu uç noktayı değiştirirse yalnızca canlı durum kartı geçici olarak kapanır;
sosyal bağlantılar ve YouTube bölümü çalışmaya devam eder.
