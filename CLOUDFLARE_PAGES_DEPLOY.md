# Cloudflare Pages - Guida al Deploy

## 📋 Configurazione Necessaria

### 1. File di Configurazione

Il file `wrangler.toml` è configurato correttamente:

```toml
name = "inps-servizi"
compatibility_date = "2026-01-22"
pages_build_output_dir = "./dist"
```

### 2. Build Command

Lo script `npm run build` ora include automaticamente:
1. Compilazione SASS → CSS
2. Webpack build → dist/

```json
"build": "npm run sass:build && webpack --config webpack.config.prod.js"
```

## 🚀 Deploy su Cloudflare Pages

### Setup Iniziale (Dashboard)

1. Vai su [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Pages** → **Create a project**
3. **Connect to Git** → Seleziona il repository GitHub

### Configurazione Build

| Impostazione | Valore |
|--------------|--------|
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (o lascia vuoto) |
| **Node version** | `18` o `20` |

### Environment Variables (Opzionali)

Se necessario, puoi aggiungere:

```
NODE_VERSION=18
```

## 📦 Cosa Viene Deployato

### Struttura Output (`dist/`)

```
dist/
├── index.html              # HTML compilato da webpack
├── css/
│   └── style.css          # CSS compilato da SASS
├── js/
│   └── app.js             # JS bundled da webpack
├── img/                   # Immagini copiate
├── favicon.ico
└── ... altri static assets
```

### Worker Function

Il file `functions/_middleware.js` viene deployato **automaticamente** insieme ai file statici.

Non serve configurazione aggiuntiva - Cloudflare Pages rileva automaticamente la cartella `functions/`.

## 🔄 Workflow di Deploy

### Deploy Automatico (Consigliato)

Ogni push su GitHub triggera un deploy automatico:

```bash
git add .
git commit -m "Update application"
git push origin main
```

Cloudflare Pages:
1. ✅ Clone repository
2. ✅ `npm install`
3. ✅ `npm run build` (SASS + Webpack)
4. ✅ Deploy `dist/` folder
5. ✅ Deploy `functions/_middleware.js`
6. ✅ Live in ~1-2 minuti

### Deploy Manuale con Wrangler

Puoi anche deployare manualmente:

```bash
# Build locale
npm run build

# Deploy con Wrangler
npx wrangler pages deploy ./dist --project-name=inps-servizi
```

## 🧪 Test Locale Prima del Deploy

### 1. Build Completo
```bash
npm run build
```

### 2. Test con Wrangler
```bash
npm run dev:worker
```

Apri `http://localhost:8788` e verifica:
- ✅ CSS caricato correttamente
- ✅ JavaScript funzionante
- ✅ Worker proxy attivo (`/content`, `/etc`, `/libs`)
- ✅ Responsive design

### 3. Test Specifici

```bash
# Test proxy paths
curl -I http://localhost:8788/content/test
curl -I http://localhost:8788/etc/designs

# Test static assets
curl -I http://localhost:8788/
curl -I http://localhost:8788/css/style.css
```

## ✅ Checklist Pre-Deploy

Prima di fare push:

- [ ] Build locale funziona: `npm run build`
- [ ] SASS compilato correttamente: `css/style.css` esiste
- [ ] Worker testato: `npm run dev:worker` funziona
- [ ] HTML aggiornato con classi `area-privata` e `ap-*`
- [ ] Commit di tutti i file SCSS (non CSS compilato)
- [ ] `wrangler.toml` configurato correttamente

## 📊 Monitoraggio Deploy

### Durante il Deploy

Nel dashboard Cloudflare Pages puoi vedere:
- Build logs in tempo reale
- Errori di compilazione
- Deploy status
- Preview URL

### Dopo il Deploy

1. **Production URL**: `https://inps-servizi.pages.dev`
2. **Custom Domain**: Configura nelle impostazioni
3. **Analytics**: Visualizza traffico e performance
4. **Functions Logs**: Monitora il worker

## 🔧 Troubleshooting

### Build Fallisce

**Problema**: `npm run build` fallisce su Cloudflare

**Soluzione**: Verifica i logs e assicurati che:
```bash
# Localmente funziona
npm install
npm run build

# Se ok, verifica package.json
cat package.json
```

### Worker Non Funziona

**Problema**: Il proxy non inoltra richieste

**Soluzione**: Verifica che `functions/_middleware.js` sia nel repository:
```bash
git ls-files | grep functions
```

### CSS Non Caricato

**Problema**: Stili non applicati

**Soluzione**: Verifica che:
1. SASS sia compilato: `npm run sass:build`
2. CSS sia in `dist/css/style.css`
3. HTML includa `<link>` corretto

### Path Issues

**Problema**: Percorsi relativi non funzionano

**Soluzione**: Usa percorsi assoluti da root:
```html
<!-- ✅ Corretto -->
<link rel="stylesheet" href="/css/style.css">

<!-- ❌ Evita -->
<link rel="stylesheet" href="../css/style.css">
```

## 🎯 Best Practices

### 1. Branch Strategy

```
main → Production deploy
develop → Preview deploy
feature/* → Branch preview
```

### 2. Environment Variables

Per configurazioni diverse tra preview e production:

```javascript
// functions/_middleware.js
const AEM_ORIGIN = process.env.AEM_ORIGIN || 'https://publish-p127204-e1900935.adobeaemcloud.com';
```

Configura in Cloudflare Pages → Settings → Environment Variables.

### 3. Caching

Headers di cache per assets statici sono gestiti automaticamente da Cloudflare.

Per il worker, puoi aggiungere:
```javascript
newResponse.headers.set('Cache-Control', 'public, max-age=3600');
```

### 4. Preview Deployments

Ogni branch/PR ottiene un URL di preview:
```
https://[branch-name].inps-servizi.pages.dev
```

## 📈 Performance

Cloudflare Pages offre:
- ✅ Global CDN (275+ datacenter)
- ✅ Automatic SSL/TLS
- ✅ DDoS protection
- ✅ Edge caching
- ✅ Worker execution su edge
- ✅ Bandwidth unlimited (piano gratuito)

## 💰 Limiti Piano Gratuito

- ✅ 500 builds/mese
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 1 concurrent build
- ✅ 100,000 worker requests/giorno

Per progetti enterprise, considera il piano Pro.

## 🔗 Risorse Utili

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Build Configuration](https://developers.cloudflare.com/pages/platform/build-configuration/)
- [Functions Docs](https://developers.cloudflare.com/pages/platform/functions/)
- [Custom Domains](https://developers.cloudflare.com/pages/platform/custom-domains/)

## 🎓 Quick Commands

```bash
# Build locale
npm run build

# Test worker locale
npm run dev:worker

# Deploy manuale
npx wrangler pages deploy ./dist --project-name=inps-servizi

# Check build
npm run build && ls -la dist/
```

---

**🎉 Il tuo progetto è pronto per il deploy su Cloudflare Pages!**

Fai semplicemente `git push` e Cloudflare farà il resto automaticamente! 🚀

