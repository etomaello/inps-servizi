# Cloudflare Worker - Guida

## Descrizione

Questo progetto utilizza **Cloudflare Pages Functions** per creare un reverse proxy che inoltra automaticamente determinate richieste al server Adobe AEM Cloud.

## Come Funziona

### Architettura

Il file `functions/_middleware.js` contiene un **middleware** che viene eseguito su Cloudflare Edge Network prima di servire i file statici del tuo sito.

### Flusso delle Richieste

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ Request: /content/...
       ▼
┌─────────────────────────┐
│  Cloudflare Edge        │
│  (Worker Middleware)    │
│                         │
│  1. Intercetta request  │
│  2. Controlla path      │
│  3. Proxy se necessario │
└──────┬──────────────────┘
       │
       ├─────► Se path = /content, /etc, /etc.clientlibs, /libs
       │       ▼
       │   ┌──────────────────────────────────────────┐
       │   │  Adobe AEM Cloud                         │
       │   │  publish-p127204-e1900935.adobeaemcloud  │
       │   └──────────────────────────────────────────┘
       │
       └─────► Altrimenti
               ▼
           ┌──────────────────┐
           │  Cloudflare Pages│
           │  (Static Assets) │
           └──────────────────┘
```

### Path Mappings

Il worker intercetta le seguenti richieste:

| Path Locale | Destinazione AEM |
|-------------|------------------|
| `/content/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/content/*` |
| `/etc/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/etc/*` |
| `/etc.clientlibs/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/etc.clientlibs/*` |
| `/libs/*` | `https://publish-p127204-e1900935.adobeaemcloud.com/libs/*` |

Tutte le altre richieste vengono servite normalmente dai file statici di Cloudflare Pages.

## Deployment

### Deploy Automatico

Quando fai il push su GitHub, Cloudflare Pages:
1. Esegue il build del progetto (`npm run build`)
2. Deploya i file statici
3. **Deploya automaticamente** il worker da `functions/_middleware.js`

Non è necessaria alcuna configurazione aggiuntiva!

### Requisiti

- **Cloudflare Pages** configurato per il tuo repository GitHub
- File `wrangler.toml` presente nella root (già incluso)
- Wrangler 4.x installato come dev dependency

## Testing Locale

### Opzione 1: Wrangler (consigliato)

Installa Wrangler CLI:

```bash
npm install -g wrangler
```

Oppure come dev dependency:

```bash
npm install --save-dev wrangler@4
```

Il progetto include già un file `wrangler.toml` con la configurazione necessaria.

Avvia il server di sviluppo locale:

```bash
npx wrangler pages dev ./dist --port 8788
```

Questo comando:
- Esegue il worker middleware localmente
- Serve i file dalla directory `dist`
- Supporta hot reload
- Usa la compatibility_date configurata

### Opzione 2: Cloudflare Pages con Build

1. Prima fai il build:
```bash
npm run build
```

2. Poi avvia Pages dev:
```bash
npx wrangler pages dev ./dist
```

### Test delle Rotte

Una volta avviato il server locale, puoi testare:

```bash
# Test proxy verso AEM
curl http://localhost:8788/content/test
curl http://localhost:8788/etc/designs/test
curl http://localhost:8788/etc.clientlibs/test.js
curl http://localhost:8788/libs/test

# Test files statici locali (non proxied)
curl http://localhost:8788/
curl http://localhost:8788/index.html
curl http://localhost:8788/css/style.css
```

## Configurazione Avanzata

### Modificare l'Origin AEM

Apri `functions/_middleware.js` e modifica la costante:

```javascript
const AEM_ORIGIN = 'https://your-aem-instance.adobeaemcloud.com';
```

### Aggiungere Altri Path

Aggiungi nuovi path all'array `PROXY_PATHS`:

```javascript
const PROXY_PATHS = [
  '/content',
  '/etc.clientlibs',
  '/etc',
  '/libs',
  '/apps',  // Nuovo path
];
```

### Headers Personalizzati

Puoi modificare gli headers nella sezione della response:

```javascript
// Aggiungi headers CORS
newResponse.headers.set('Access-Control-Allow-Origin', '*');
newResponse.headers.set('X-Custom-Header', 'value');
```

### Caching

Per abilitare il caching di Cloudflare:

```javascript
// Dopo aver creato aemRequest
const response = await fetch(aemRequest, {
  cf: {
    cacheTtl: 3600,  // Cache per 1 ora
    cacheEverything: true
  }
});
```

## Monitoring e Debugging

### Logs in Produzione

I logs del worker sono visibili in:
1. Cloudflare Dashboard
2. Pages Project → Functions → Logs

### Logs Locali

Durante lo sviluppo locale con wrangler, i `console.log()` vengono mostrati nel terminale.

## Troubleshooting

### Il worker non viene eseguito

- Verifica che il file sia in `functions/_middleware.js`
- Controlla i logs di build su Cloudflare Pages
- Assicurati di aver fatto il commit e push del file

### Errori CORS

Se hai problemi CORS, verifica gli headers nella response del worker.

### Performance

I worker Cloudflare sono estremamente veloci (< 1ms overhead), ma il tempo totale dipende dalla risposta di AEM.

## Vantaggi di Questo Approccio

✅ **Zero configurazione**: Nessun wrangler.toml necessario
✅ **Deploy automatico**: Parte del deploy di Pages
✅ **Edge network globale**: Il proxy gira su 275+ datacenter
✅ **Scalabilità automatica**: Gestisce milioni di richieste
✅ **Costi ridotti**: Incluso nel piano gratuito di Pages
✅ **Facile manutenzione**: Un solo file da gestire

## Risorse

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Workers Runtime API](https://developers.cloudflare.com/workers/runtime-apis/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

