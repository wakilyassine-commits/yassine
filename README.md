# LexiPro — Business English PWA

Application de révision de vocabulaire Business English, installable sur mobile et desktop.

## 📁 Structure des fichiers

```
lexipro-pwa/
├── index.html          ← L'app complète
├── manifest.json       ← Config PWA (nom, icône, couleurs)
├── sw.js               ← Service Worker (mode offline)
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README.md
```

---

## 🚀 Déploiement sur GitHub Pages (5 minutes)

### Étape 1 — Créer un repo GitHub
1. Va sur [github.com](https://github.com) → **New repository**
2. Nom : `lexipro` (ou ce que tu veux)
3. Visibilité : **Public** ✅ (requis pour GitHub Pages gratuit)
4. Clique **Create repository**

### Étape 2 — Uploader les fichiers
**Option A — Interface web (le plus simple) :**
1. Dans ton repo → clique **"uploading an existing file"**
2. Glisse-dépose **tout le contenu** du dossier `lexipro-pwa/`
3. ⚠️ Important : le dossier `icons/` doit être uploadé avec ses fichiers dedans
4. Clique **Commit changes**

**Option B — Git en ligne de commande :**
```bash
cd lexipro-pwa
git init
git add .
git commit -m "Initial commit — LexiPro PWA"
git remote add origin https://github.com/TON_USERNAME/lexipro.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages
1. Dans ton repo → onglet **Settings**
2. Menu gauche → **Pages**
3. Source : **Deploy from a branch**
4. Branch : `main` / `/(root)`
5. Clique **Save**
6. ⏳ Attends 1-2 minutes
7. Ton app sera disponible sur : `https://TON_USERNAME.github.io/lexipro/`

---

## 📱 Installation sur mobile

### Android (Chrome)
1. Ouvre l'URL dans Chrome
2. Une bannière "Installer LexiPro" apparaît automatiquement
3. Ou : menu ⋮ → **"Ajouter à l'écran d'accueil"**

### iPhone (Safari)
1. Ouvre l'URL dans **Safari** (pas Chrome — iOS impose Safari pour les PWA)
2. Bouton partage **⬆** → **"Sur l'écran d'accueil"**
3. L'icône LexiPro apparaît sur ton écran d'accueil

### Desktop (Chrome / Edge)
1. Une icône d'installation ⊕ apparaît dans la barre d'adresse
2. Clique → **Installer**
3. L'app s'ouvre comme une fenêtre native sans barre de navigation

---

## ✈️ Mode hors ligne

Une fois installée, l'app fonctionne **entièrement hors ligne** :
- Toutes les flashcards et le quiz sont disponibles sans connexion
- Les fonts Google sont mises en cache à la première visite
- Le service worker se met à jour automatiquement en arrière-plan quand tu es en ligne

---

## 🛠 Pour mettre à jour le contenu

1. Modifie `index.html` (ajoute des mots dans le tableau `vocab`)
2. Dans `sw.js`, incrémente le numéro de version : `'lexipro-v1'` → `'lexipro-v2'`
3. Commit & push → GitHub Pages se met à jour automatiquement

---

*Made with Claude · Anthropic*
