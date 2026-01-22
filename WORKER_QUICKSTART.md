# Quick Start - Cloudflare Worker

## 🚀 Setup Rapido

### 1. Installare le dipendenze

```bash
npm install
```

### 2. Testare in locale

```bash
# Build + avvio worker locale
npm run dev:worker
```

Il sito sarà disponibile su `http://localhost:8788`

### 3. Testare il proxy

Apri nel browser:
- `http://localhost:8788/worker-test.html` - Pagina di test interattiva
- `http://localhost:8788/content/test` - Test proxy verso AEM
- `http://localhost:8788/` - Test file statici

### 4. Deploy su Cloudflare Pages

Semplicemente fai push su GitHub:

```bash
git add .
git commit -m "Add Cloudflare Worker proxy"
git push
```

Cloudflare Pages farà automaticamente il deploy del worker!

## 📋 Checklist Deploy

- [ ] File `functions/_middleware.js` presente nel repository
- [ ] Progetto collegato a Cloudflare Pages
- [ ] Build command configurata: `npm run build`
- [ ] Build output directory: `dist`
- [ ] Push su GitHub effettuato

## 🧪 Test Veloci

### Con curl

```bash
# Test proxy (dovrebbe rispondere AEM)
curl -I http://localhost:8788/content/test

# Test static (dovrebbe rispondere Pages)
curl -I http://localhost:8788/index.html
```

### Con browser

Apri la console JavaScript e prova:

```javascript
// Test proxy path
fetch('/content/test')
  .then(r => console.log('Status:', r.status, 'Headers:', [...r.headers]));

// Test static path
fetch('/index.html')
  .then(r => console.log('Status:', r.status));
```

## 🔧 Configurazione Cloudflare Pages

Se non l'hai già fatto, configura il progetto su Cloudflare:

1. Vai su [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pages → Create a project
3. Connetti il repository GitHub
4. Configura:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
5. Deploy!

## 📊 Monitoring

### Logs in produzione

1. Cloudflare Dashboard
2. Pages → Your project
3. Functions → Real-time logs

### Metriche disponibili

- Numero di richieste
- Latenza
- Errori
- Cache hit rate

## ⚡ Performance Tips

Il worker aggiunge un overhead minimo (~1ms) ma puoi ottimizzare:

### 1. Abilita caching

Modifica `functions/_middleware.js`:

```javascript
const response = await fetch(aemRequest, {
  cf: {
    cacheTtl: 3600,      // Cache 1h
    cacheEverything: true
  }
});
```

### 2. Comprimi le risposte

```javascript
newResponse.headers.set('Content-Encoding', 'gzip');
```

### 3. Usa Smart Routing

È già attivo di default su Cloudflare Pages!

## 🐛 Troubleshooting Comune

### Worker non si attiva

```bash
# Verifica che il file esista
ls -la functions/_middleware.js

# Verifica la sintassi
node -c functions/_middleware.js
```

### CORS errors

Aggiungi headers nel worker:

```javascript
newResponse.headers.set('Access-Control-Allow-Origin', '*');
newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
```

### Timeout errors

Il limite è 30 secondi per le Pages Functions (più che sufficiente).

## 💡 Esempi d'uso

### Esempio 1: Pagina che carica risorse AEM

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Questo viene proxato automaticamente -->
    <link rel="stylesheet" href="/etc.clientlibs/mysite/clientlibs.css">
</head>
<body>
    <!-- Questo viene proxato automaticamente -->
    <img src="/content/dam/mysite/image.jpg">

    <script src="/libs/granite/jquery.js"></script>
</body>
</html>
```

### Esempio 2: Fetch API

```javascript
// Automaticamente proxato verso AEM
fetch('/content/api/data.json')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Esempio 3: Form submission

```javascript
// POST verso AEM
fetch('/content/forms/submit', {
    method: 'POST',
    body: formData
});
```

## 🔐 Sicurezza

### Headers di sicurezza

Il worker può aggiungere headers di sicurezza:

```javascript
newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
newResponse.headers.set('X-Content-Type-Options', 'nosniff');
newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000');
```

### Rate limiting

Cloudflare offre rate limiting automatico per proteggere da DDoS.

## 📚 Risorse Utili

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Workers API Reference](https://developers.cloudflare.com/workers/runtime-apis/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Community Discord](https://discord.gg/cloudflaredev)

## 💰 Costi

Cloudflare Pages Include gratuitamente:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds/month
- ✅ Worker incluso
- ✅ SSL automatico

Per progetti enterprise, vedi [pricing](https://www.cloudflare.com/plans/developer-platform/).

