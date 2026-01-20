# Quick Start Guide - INPS Homepage Project

## 🚀 Benvenuto!

Hai appena creato un progetto GitHub Pages ispirato al design del sito ufficiale INPS (www.inps.it).

## ✅ Cosa è stato creato

### File Principali
- ✓ `index.html` - Homepage completa con tutte le sezioni
- ✓ `css/style.css` - Stili personalizzati ispirati a INPS
- ✓ `js/app.js` - Funzionalità interattive
- ✓ `img/logo-inps.svg` - Logo INPS
- ✓ `img/hero-illustration.svg` - Illustrazione hero section

### Documentazione
- ✓ `README.md` - Documentazione completa del progetto
- ✓ `DEPLOYMENT.md` - Guida passo-passo al deployment
- ✓ `.github/workflows/deploy.yml` - Workflow automatico per GitHub Actions

## 📋 Prossimi Passi

### 1. Testa Localmente (Opzionale)

Puoi visualizzare il sito sul tuo computer prima del deployment:

```bash
# Apri semplicemente index.html nel browser, oppure:
npx http-server -p 8080 -o
```

Visita: http://localhost:8080

### 2. Deploy su GitHub Pages

**Metodo Semplice (3 comandi):**

```bash
# 1. Inizializza Git
git init
git add .
git commit -m "Initial commit: INPS-inspired homepage"

# 2. Collega al tuo repository GitHub
git remote add origin https://github.com/TUO-USERNAME/NOME-REPO.git
git branch -M main
git push -u origin main

# 3. Vai su GitHub.com > Settings > Pages > Source: GitHub Actions
```

**Vedi DEPLOYMENT.md per istruzioni dettagliate!**

## 🎨 Struttura del Sito

```
┌─────────────────────────────────────┐
│         HEADER                       │
│  Logo | Navigazione | Login          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         HERO SECTION                 │
│  Titolo, Sottotitolo, CTA            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         SEARCH BAR                   │
│  Cerca servizi...                    │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         SERVIZI IN EVIDENZA          │
│  🔹 Pensioni   🔹 Disoccupazione     │
│  🔹 Famiglia   🔹 Certificazioni     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         ACCESSO RAPIDO               │
│  6 link rapidi ai servizi            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         NOTIZIE                      │
│  3 news card con date                │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         FOOTER                       │
│  Link, Social, Copyright             │
└─────────────────────────────────────┘
```

## 🎯 Caratteristiche

- ✅ Design responsive (mobile-first)
- ✅ Colori ufficiali INPS (#0066CC)
- ✅ Font Titillium Web (font ufficiale PA italiana)
- ✅ Bootstrap 5 integrato
- ✅ Font Awesome per le icone
- ✅ Accessibilità (skip links, ARIA labels)
- ✅ Animazioni smooth scroll
- ✅ SEO-friendly

## 🛠 Personalizzazione Rapida

### Cambiare i Colori
Modifica in `css/style.css`:
```css
:root {
  --inps-primary: #0066CC;  /* Cambia questo */
  --inps-secondary: #00CC66;
}
```

### Modificare i Testi
Apri `index.html` e cerca le sezioni:
- `<!-- Hero Section -->` - Titolo e sottotitolo
- `<!-- Services Section -->` - Servizi in evidenza
- `<!-- News Section -->` - Notizie

### Aggiungere Pagine
Duplica `index.html`, rinominalo (es. `servizi.html`) e aggiorna i link nella navigazione.

## 📱 Mobile-Friendly

Il sito è completamente responsive e si adatta a:
- 📱 Smartphone (< 768px)
- 📱 Tablet (768px - 991px)
- 💻 Desktop (992px - 1199px)
- 🖥 Large Desktop (≥ 1200px)

## 🔗 Link Utili

- [GitHub Pages Docs](https://docs.github.com/pages)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [INPS Sito Originale](https://www.inps.it/)

## ❓ Hai Bisogno di Aiuto?

1. Leggi `README.md` per documentazione completa
2. Leggi `DEPLOYMENT.md` per istruzioni di deploy
3. Controlla la console del browser per errori (F12)
4. Verifica che tutti i file siano presenti

## 📝 Checklist Pre-Deploy

- [ ] Ho testato il sito localmente?
- [ ] Tutti i link funzionano?
- [ ] Le immagini si caricano?
- [ ] Il sito è responsive su mobile?
- [ ] Ho creato il repository su GitHub?
- [ ] Ho fatto commit di tutti i file?

---

**Buon lavoro! 🚀**

Per domande o problemi, controlla la documentazione o crea un issue su GitHub.

