# Cloudflare Worker - Cheat Sheet

## 🚀 Comandi Rapidi

### Development
```bash
# Installa dipendenze
npm install

# Build progetto
npm run build

# Avvia worker locale (dev + watch)
npm run dev:worker

# Server normale (senza worker)
npm start
```

### Testing
```bash
# Test page interattiva
open http://localhost:8788/worker-test.html

# Test proxy path (con curl)
curl -I http://localhost:8788/content/test
curl -I http://localhost:8788/etc/designs/test
curl -I http://localhost:8788/etc.clientlibs/test.js
curl -I http://localhost:8788/libs/test

# Test static path
curl -I http://localhost:8788/
curl -I http://localhost:8788/index.html
```

### Deployment
```bash
# Commit e push (deploy automatico su Cloudflare Pages)
git add .
git commit -m "Update worker"
git push
```

## 📝 Path Mappings

```
/content/*        → AEM
/etc/*            → AEM
/etc.clientlibs/* → AEM
/libs/*           → AEM
/*                → Cloudflare Pages (static)
```

## 🔧 File Importanti

```
functions/_middleware.js    # Worker code
wrangler.toml               # Wrangler configuration
package.json                # Config & scripts
.gitignore                  # Git exclusions
worker-test.html            # Test page
```

## 📚 Documentazione

```
WORKER_SETUP_COMPLETE.md   # Setup completo
WORKER_QUICKSTART.md       # Quick start
CLOUDFLARE_WORKER.md       # Guida dettagliata
ARCHITECTURE.md            # Diagrammi
```

## 🐛 Debug

### Logs Locali
```bash
# Durante npm run dev:worker, i console.log() appaiono nel terminale
```

### Logs Produzione
```
Cloudflare Dashboard → Pages → Functions → Logs
```

### Syntax Check
```bash
node -c functions/_middleware.js
```

## ⚙️ Configurazione Cloudflare Pages

### Dashboard Settings
```
Framework: None
Build command: npm run build
Build output: dist
Root directory: /
Node version: 18 (or latest)
```

### wrangler.toml
```toml
name = "inps-github-forms-areaprivata"
compatibility_date = "2026-01-22"
pages_build_output_dir = "./dist"
```

### Environment Variables (opzionali)
```
AEM_ORIGIN=https://publish-p127204-e1900935.adobeaemcloud.com
```

## 🎯 Quick Edits

### Cambiare AEM Origin
```javascript
// functions/_middleware.js
const AEM_ORIGIN = 'https://your-new-origin.com';
```

### Aggiungere Path
```javascript
// functions/_middleware.js
const PROXY_PATHS = [
  '/content',
  '/etc.clientlibs',
  '/etc',
  '/libs',
  '/your-new-path',  // ← Add here
];
```

### Abilitare Cache
```javascript
// functions/_middleware.js - nella fetch call
const response = await fetch(aemRequest, {
  cf: {
    cacheTtl: 3600,
    cacheEverything: true
  }
});
```

### Custom Headers
```javascript
// functions/_middleware.js - dopo new Response
newResponse.headers.set('X-Custom', 'value');
newResponse.headers.set('Cache-Control', 'max-age=3600');
```

## 🔗 Links Utili

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Pages Docs**: https://developers.cloudflare.com/pages/
- **Workers Docs**: https://developers.cloudflare.com/workers/
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/

## 💡 Tips

✅ Il worker aggiunge < 1ms di overhead
✅ Deploy automatico ad ogni push
✅ Zero configurazione necessaria
✅ Scalabilità infinita
✅ Incluso nel piano gratuito Pages
✅ SSL/TLS automatico
✅ DDoS protection integrata

## ⚠️ Note

- Il file deve essere in `functions/_middleware.js`
- L'ordine in PROXY_PATHS è importante (più specifico prima)
- Il worker gira su edge, non su origin
- Timeout massimo: 30 secondi

