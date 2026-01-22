# Architettura Cloudflare Worker - Diagramma Dettagliato

## 📊 Panoramica Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                          UTENTE FINALE                              │
│                    (Browser / Mobile App)                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTPS Request
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE EDGE NETWORK                          │
│                     (275+ Data Centers)                             │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │          CLOUDFLARE PAGES FUNCTIONS                       │    │
│  │          functions/_middleware.js                         │    │
│  │                                                           │    │
│  │  ┌─────────────────────────────────────────────────┐     │    │
│  │  │  1. Ricevi Request                              │     │    │
│  │  │     - Parse URL                                 │     │    │
│  │  │     - Extract pathname                          │     │    │
│  │  └─────────────────┬───────────────────────────────┘     │    │
│  │                    │                                     │    │
│  │                    ▼                                     │    │
│  │  ┌─────────────────────────────────────────────────┐     │    │
│  │  │  2. Controlla Path                              │     │    │
│  │  │     - Inizia con /content ?                     │     │    │
│  │  │     - Inizia con /etc ?                         │     │    │
│  │  │     - Inizia con /etc.clientlibs ?              │     │    │
│  │  │     - Inizia con /libs ?                        │     │    │
│  │  └─────────────────┬───────────────────────────────┘     │    │
│  │                    │                                     │    │
│  │          ┌─────────┴─────────┐                          │    │
│  │          │                   │                          │    │
│  │          ▼                   ▼                          │    │
│  │  ┌─────────────┐     ┌──────────────┐                  │    │
│  │  │ SI: PROXY   │     │ NO: STATIC   │                  │    │
│  │  └──────┬──────┘     └──────┬───────┘                  │    │
│  │         │                   │                          │    │
│  │         ▼                   ▼                          │    │
│  │  ┌─────────────────┐ ┌─────────────────┐               │    │
│  │  │ 3a. Proxy AEM   │ │ 3b. Serve Pages │               │    │
│  │  └─────────────────┘ └─────────────────┘               │    │
│  └───────────────────────────────────────────────────────┘    │
└──────────────┬────────────────────────────┬────────────────────┘
               │                            │
               │ Forward to AEM             │ Serve from CDN
               ▼                            ▼
┌──────────────────────────────┐  ┌─────────────────────────┐
│     ADOBE AEM CLOUD          │  │  CLOUDFLARE CDN         │
│ publish-p127204-e1900935     │  │  Static Assets          │
│  .adobeaemcloud.com          │  │  - index.html           │
│                              │  │  - CSS files            │
│  - /content/*                │  │  - JS files             │
│  - /etc/*                    │  │  - Images               │
│  - /etc.clientlibs/*         │  │  - etc.                 │
│  - /libs/*                   │  │                         │
└──────────────────────────────┘  └─────────────────────────┘
```

## 🔄 Flusso di Richiesta Dettagliato

### Scenario 1: Richiesta Static Asset (es. `/index.html`)

```
User → /index.html
  ↓
Cloudflare Edge
  ↓
Worker Middleware
  ├─ shouldProxy("/index.html") → false
  └─ return next()
      ↓
  Cloudflare Pages
      ├─ Cerca in /dist/index.html
      ├─ Cache hit/miss
      └─ Return HTML + Headers
          ↓
  User ← 200 OK + HTML
```

**Tempo medio**: ~10-50ms (global CDN)

### Scenario 2: Richiesta AEM Content (es. `/content/mypage.html`)

```
User → /content/mypage.html
  ↓
Cloudflare Edge
  ↓
Worker Middleware
  ├─ shouldProxy("/content/mypage.html") → true
  ├─ Costruisci URL: https://publish-p127204-e1900935.adobeaemcloud.com/content/mypage.html
  ├─ Crea nuovo Request
  └─ fetch(aemUrl)
      ↓
  Adobe AEM Cloud
      ├─ Process request
      ├─ Generate/Retrieve content
      └─ Return response
          ↓
  Worker Middleware
      ├─ Copia response body
      ├─ Aggiungi/Modifica headers
      │   ├─ Access-Control-Allow-Origin: *
      │   └─ Altri headers custom
      └─ Return modified response
          ↓
  User ← 200 OK + AEM Content
```

**Tempo medio**: ~100-500ms (dipende da AEM)

## 🌐 Edge Computing

Il worker viene eseguito su **Cloudflare Edge Network**:

```
┌─────────────────────────────────────────────────────────┐
│              CLOUDFLARE GLOBAL NETWORK                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🌍 Europa                                              │
│  ├─ Milano      (Worker Instance)                      │
│  ├─ Roma        (Worker Instance)                      │
│  ├─ Parigi      (Worker Instance)                      │
│  └─ Londra      (Worker Instance)                      │
│                                                         │
│  🌎 Americhe                                            │
│  ├─ New York    (Worker Instance)                      │
│  ├─ São Paulo   (Worker Instance)                      │
│  └─ Los Angeles (Worker Instance)                      │
│                                                         │
│  🌏 Asia-Pacific                                        │
│  ├─ Tokyo       (Worker Instance)                      │
│  ├─ Singapore   (Worker Instance)                      │
│  └─ Sydney      (Worker Instance)                      │
│                                                         │
│  ... + 265 altre location                              │
└─────────────────────────────────────────────────────────┘
```

**Vantaggi**:
- ⚡ Latenza ultra-bassa (worker più vicino all'utente)
- 🔄 Failover automatico
- 📈 Scalabilità infinita
- 🛡️ DDoS protection integrata

## 📦 Deployment Flow

```
┌──────────────────┐
│  Developer       │
│  git push        │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  GitHub Repository                   │
│  - functions/_middleware.js          │
│  - Other source files                │
└────────┬─────────────────────────────┘
         │ Webhook
         ▼
┌──────────────────────────────────────┐
│  Cloudflare Pages Build              │
│  1. Clone repository                 │
│  2. npm install                      │
│  3. npm run build                    │
│  4. Collect static assets → /dist    │
│  5. Detect Functions → /functions    │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Cloudflare Pages Deploy             │
│  1. Upload /dist to CDN              │
│  2. Deploy _middleware.js to Edge    │
│  3. Update routing                   │
│  4. Invalidate cache                 │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  LIVE on Edge Network                │
│  ✅ Static assets cached globally    │
│  ✅ Worker running on all edges      │
│  ✅ SSL/TLS automatic                │
└──────────────────────────────────────┘
```

**Tempo medio di deploy**: 30-90 secondi

## 🔍 Path Matching Logic

```javascript
// Ordine importante! etc.clientlibs deve essere prima di etc
const PROXY_PATHS = [
  '/content',
  '/etc.clientlibs',  // ← Controllato PRIMA
  '/etc',             // ← Controllato DOPO
  '/libs'
];

// Esempi di matching:

Request: /etc.clientlibs/mysite/clientlibs.js
  ✅ Match: /etc.clientlibs
  ❌ Skip: /etc (già trovato match)
  → PROXY to AEM

Request: /etc/designs/mysite
  ❌ Skip: /content
  ❌ Skip: /etc.clientlibs
  ✅ Match: /etc
  → PROXY to AEM

Request: /static/image.jpg
  ❌ Skip: /content
  ❌ Skip: /etc.clientlibs
  ❌ Skip: /etc
  ❌ Skip: /libs
  → SERVE STATIC
```

## 🎯 Performance Metrics

```
┌─────────────────────────────────────────────────────────┐
│  Performance Breakdown                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Static File Request:                                  │
│  ├─ DNS Lookup:          ~5ms                          │
│  ├─ TLS Handshake:       ~20ms                         │
│  ├─ Worker Processing:   <1ms                          │
│  ├─ CDN Fetch (cached):  ~5-10ms                       │
│  └─ TOTAL:               ~30-40ms                      │
│                                                         │
│  AEM Proxy Request:                                    │
│  ├─ DNS Lookup:          ~5ms                          │
│  ├─ TLS Handshake:       ~20ms                         │
│  ├─ Worker Processing:   <1ms                          │
│  ├─ AEM Fetch:           ~100-500ms ⚠️                 │
│  ├─ Response Processing: <1ms                          │
│  └─ TOTAL:               ~120-530ms                    │
│                                                         │
│  💡 Con Caching:                                        │
│  └─ AEM Fetch (cached):  ~10-20ms ✨                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Security Features

```
┌─────────────────────────────────────────────────────────┐
│  Security Layers                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Cloudflare Level                                   │
│     ├─ DDoS Protection (unlimited)                     │
│     ├─ WAF (Web Application Firewall)                  │
│     ├─ Bot Management                                  │
│     └─ SSL/TLS Encryption                              │
│                                                         │
│  2. Worker Level                                       │
│     ├─ Request Validation                              │
│     ├─ Header Sanitization                             │
│     ├─ CORS Configuration                              │
│     └─ Custom Security Headers                         │
│                                                         │
│  3. Origin Level                                       │
│     └─ AEM Security (Adobe managed)                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📊 Monitoring & Analytics

```
Cloudflare Dashboard
├─ Analytics
│  ├─ Requests per second
│  ├─ Bandwidth usage
│  ├─ Cache hit ratio
│  └─ Geographic distribution
│
├─ Functions Logs
│  ├─ Real-time logs
│  ├─ Error tracking
│  ├─ Performance metrics
│  └─ Custom console.log()
│
└─ Alerts
   ├─ Error rate threshold
   ├─ Performance degradation
   └─ Custom webhooks
```

## 🎓 Casi d'Uso

### Use Case 1: Hybrid Site
```
Static Marketing Pages (Fast CDN)
  +
Dynamic AEM Content (Proxied)
  =
Best of Both Worlds
```

### Use Case 2: Gradual Migration
```
Legacy AEM System
  ↓
Proxy some paths (/content, /etc, /libs)
  ↓
Migrate incrementally
  ↓
Eventually: Full static or new system
```

### Use Case 3: Multi-Origin
```
Different Backends for Different Paths:
- /api → API Server
- /content → AEM
- /assets → Object Storage
- /* → Static CDN
```

Questo worker è il punto di ingresso per **tutte queste possibilità**! 🚀

