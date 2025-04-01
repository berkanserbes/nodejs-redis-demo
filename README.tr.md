# Node.js Redis & MongoDB Demo

Bu proje, Node.js kullanarak Redis önbelleği ve MongoDB veritabanı entegrasyonunu gösteren bir REST API uygulamasıdır.

## 🚀 Özellikler

- Express.js ile REST API
- MongoDB veritabanı entegrasyonu
- Redis önbelleği ile performans optimizasyonu
- CRUD operasyonları
- Örnek ürün verileri ile test imkanı

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
- Redis
- npm veya yarn

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/nodejs-redis-demo.git
cd nodejs-redis-demo
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:
```env
MONGODB_CONNECTION=mongodb://localhost:27017/your_database
NODE_ENV=development
PORT=3000
REDIS_URL=redis://localhost:6379
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

## 🔌 API Endpoints

### Ürün İşlemleri

- `GET /api/products` - Tüm ürünleri getir (Redis önbellekli)
- `GET /api/products/:id` - ID'ye göre ürün getir (Redis önbellekli)
- `POST /api/products` - Yeni ürün ekle
- `PUT /api/products/:id` - Ürün güncelle
- `DELETE /api/products/:id` - Ürün sil
- `DELETE /api/products` - Tüm ürünleri sil
- `POST /api/products/insert-dummy` - Örnek ürün verilerini ekle

## 🏗️ Proje Yapısı

```
src/
├── configs/
│   ├── env.config.js
│   ├── mongodb.config.js
│   └── redis.config.js
├── controllers/
│   └── product.controller.js
├── models/
│   └── product.model.js
├── routes/
│   └── product.route.js
├── utils/
│   └── products.json
└── index.js
```

## 🔄 Redis Önbellek Stratejisi

- GET istekleri için 1 dakikalık önbellek
- POST, PUT, DELETE işlemlerinde ilgili önbellek otomatik temizlenir
- Ürün listesi ve tekil ürünler için ayrı önbellek anahtarları

## 🧪 Test

Örnek ürün verilerini eklemek için:
```bash
curl -X POST http://localhost:3000/api/products/insert-dummy
```