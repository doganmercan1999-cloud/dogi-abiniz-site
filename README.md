# Dogi Abiniz – Next.js V8

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


## V5
- Premium üst ışık çizgisi
- Geliştirilmiş neon ve cam görünümü
- Daha akıcı kart ve video animasyonları
- Mobil görünüm iyileştirmeleri


## V6 büyük yeniden tasarım

- Masaüstünde iki sütunlu yeni düzen
- Sol tarafta profil ve sosyal bağlantılar
- Sağ tarafta büyük Kick canlı/offline paneli
- YouTube videoları için yeni kart düzeni
- Mobilde tek sütuna dönüşen responsive yapı


## V7 dashboard tasarımı

- Mockup'a yakın neon dashboard düzeni
- Büyük canlı/offline yayın paneli
- Sol sabit profil ve sosyal alanı
- YouTube video kartları
- Kanal istatistik kartları
- Geniş ekran ve mobil uyumluluk


## V8
- YouTube istatistikleri canlı yayın panelinden kaldırıldı.
- Abone, izlenme ve video sayısı Son Videolar bölümünün altına taşındı.
