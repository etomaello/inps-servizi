# Guida al Deployment su GitHub Pages

## Opzione 1: Deployment Automatico con GitHub Actions (Consigliato)

### Passi:

1. **Crea un nuovo repository su GitHub**
   - Vai su https://github.com/new
   - Dai un nome al repository (es. `inps-homepage`)
   - Scegli "Public" (necessario per GitHub Pages gratuito)
   - Non aggiungere README, .gitignore o license (già presenti nel progetto)

2. **Inizializza Git localmente**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: INPS-inspired homepage"
   ```

3. **Collega al repository remoto**
   ```bash
   git remote add origin https://github.com/TUO-USERNAME/NOME-REPO.git
   git branch -M main
   git push -u origin main
   ```

4. **Configura GitHub Pages**
   - Vai nelle Settings del repository
   - Clicca su "Pages" nel menu laterale
   - Sotto "Build and deployment":
     - Source: Seleziona "GitHub Actions"
   - Salva le impostazioni

5. **Il sito verrà deployato automaticamente!**
   - Ogni push su main triggererà il workflow
   - Il sito sarà disponibile a: `https://TUO-USERNAME.github.io/NOME-REPO/`

---

## Opzione 2: Deployment Manuale

### Passi:

1. **Segui i passi 1-3 dell'Opzione 1**

2. **Crea un branch gh-pages**
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

3. **Configura GitHub Pages**
   - Vai nelle Settings del repository
   - Clicca su "Pages"
   - Source: Seleziona "Deploy from a branch"
   - Branch: Seleziona "gh-pages" e "/ (root)"
   - Salva

4. **Il sito sarà disponibile a:**
   `https://TUO-USERNAME.github.io/NOME-REPO/`

---

## Test Locale

Prima di fare il deploy, puoi testare il sito localmente:

### Metodo 1: Con Python
```bash
# Python 3
python -m http.server 8080

# Oppure Python 2
python -m SimpleHTTPServer 8080
```

### Metodo 2: Con Node.js
```bash
npx http-server -p 8080 -o
```

### Metodo 3: Con webpack dev server
```bash
npm install
npm start
```

Visita: http://localhost:8080

---

## Personalizzazione

### Modificare il Contenuto
- Apri `index.html` e modifica testi, link e contenuti
- Le sezioni sono ben commentate e facili da individuare

### Modificare lo Stile
- Il file `css/style.css` contiene tutti gli stili
- Puoi modificare i colori nelle variabili CSS all'inizio del file:
  ```css
  :root {
    --inps-primary: #0066CC;
    --inps-secondary: #00CC66;
    /* ... altri colori ... */
  }
  ```

### Aggiungere Funzionalità
- Il file `js/app.js` contiene il JavaScript
- Puoi aggiungere nuove funzionalità o modificare quelle esistenti

---

## Troubleshooting

### Il sito non si carica
- Verifica che GitHub Pages sia abilitato nelle Settings
- Controlla che il branch corretto sia selezionato
- Attendi qualche minuto dopo il primo deploy

### Le immagini non si vedono
- Verifica che i path delle immagini siano corretti
- Se usi un custom domain, aggiusta i path di conseguenza

### Il CSS non viene applicato
- Controlla che il file CSS sia nel path corretto
- Verifica il link nel tag `<head>` di index.html

---

## Custom Domain (Opzionale)

Per usare un dominio personalizzato:

1. Crea un file `CNAME` nella root del progetto:
   ```
   tuodominio.com
   ```

2. Configura i DNS del tuo dominio:
   - Type: CNAME
   - Name: www (o @)
   - Value: TUO-USERNAME.github.io

3. Nelle Settings > Pages, inserisci il tuo dominio custom

---

## Supporto

Per problemi o domande su GitHub Pages:
- [Documentazione ufficiale](https://docs.github.com/pages)
- [GitHub Community](https://github.community/)

