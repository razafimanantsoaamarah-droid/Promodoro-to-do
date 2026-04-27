<div align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-cyan?style=for-the-badge" alt="Version 1.1.0" />
  <img src="https://img.shields.io/badge/react-19.2.5-06b6d4?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/vite-8.0.9-646cff?style=for-the-badge&logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License MIT" />
  <img src="https://img.shields.io/github/actions/workflow/status/razafimanantsoaamarah-droid/Promodoro-to-do/.github/workflows/deploy.yml?style=for-the-badge&label=CI/CD" alt="CI/CD Status" />
</div>

<br />

<div align="center">
  <h1>⏳ RMY FOCUS</h1>
  <p><em>Maîtrisez votre temps, accomplissez l'essentiel.</em></p>
</div>

---

## 🎯 À propos

**RMY FOCUS** est une application web moderne de gestion de tâches combinée à la technique **Pomodoro**.  
Interface glassmorphism, thèmes dynamiques, musique intégrée : tout est pensé pour vous garder dans la zone.

> 🧠 *"La productivité n'est pas une question de temps, mais de focus."*

---

## ✨ Fonctionnalités

| 🎨 | ⏱️ | 🎵 |
|---|---|---|
| **5 thèmes dynamiques** avec fonds personnalisables | **Minuteur Pomodoro** 25/5/15 min | **Lecteur musical intégré** avec recherche Pixabay |
| **Changement instantané** sans rechargement | **Gestion de tâches** avec priorités | **Playlist personnalisable** (ajout/suppression) |
| **Images uploadables** par thème | **Sous-étapes** découpables | **Contrôles** Play/Pause/Volume/Next |

| 📋 | 🔔 | 💾 |
|---|---|---|
| **CRUD complet** des tâches | **Notifications navigateur** en fin de cycle | **Persistance locale** via localStorage |
| **Formulaire modal** d'ajout rapide | **Toasts animés** pour chaque action | **Pas de backend requis** |
| **Drawer d'édition** coulissant | **Son de fin de cycle** personnalisé | **Données privées** par navigateur |

---

## 🎨 Thèmes

| Thème | Icône | Ambiance |
|-------|-------|----------|
| RMY Dark | 🌌 | Bleu nuit profond |
| Cyberpunk | 🤖 | Rose néon sur fond noir |
| Nature | 🌿 | Vert forêt apaisant |
| Minimal | 🤍 | Blanc épuré |
| Galaxy | ✨ | Violet cosmique |

---

## 🛠️ Stack technique

```json
{
  "frontend": "React 19 + Vite 8",
  "styling": "Tailwind CSS 4",
  "animations": "Framer Motion 12",
  "icônes": "Lucide React 1.8",
  "state": "useLocalStorage (hook personnalisé)",
  "recherche musique": "Pixabay API",
  "déploiement": "GitHub Pages + GitHub Actions"
}
```

---

## 📁 Architecture

```
frontend/src/
├── App.jsx
├── main.jsx
├── index.css                    # Variables CSS + Tailwind
├── assets/
│   ├── images/                  # Fond par défaut
│   ├── sounds/                  # Son de notification
│   └── themes/                  # Images des thèmes
├── components/shared/
│   ├── ui/                      # Button, Card, Input, Modal, Textarea
│   └── ux/alerts/               # Toast, ToastContainer
├── features/
│   ├── music/                   # MusicPlayer + playlists
│   ├── tasks/                   # AddForm, EditDrawer, TaskCard, TaskList
│   ├── theme/                   # SettingsPanel, ThemePicker, ThemeSwitcher
│   └── timer/                   # Timer + CircularProgress
├── hooks/
│   └── useLocalStorage.js       # Hook de persistance
└── constant/
    └── variant.js               # Modes Pomodoro
```

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Cloner le repo
git clone https://github.com/razafimanantsoaamarah-droid/Promodoro-to-do.git
cd Promodoro-to-do/frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

### Build production

```bash
npm run build
npm run preview
```

---

## 🔄 CI/CD

À chaque push sur `main`, GitHub Actions :
1. Installe les dépendances
2. Build le projet
3. Déploie sur **GitHub Pages**

[![Deploy Status](https://img.shields.io/github/actions/workflow/status/razafimanantsoaamarah-droid/Promodoro-to-do/.github/workflows/deploy.yml?style=flat-square)](https://github.com/razafimanantsoaamarah-droid/Promodoro-to-do/actions)

---

## 🎵 Configuration de l'API Pixabay

Pour que la recherche musicale fonctionne :

1. Créez un compte sur [pixabay.com](https://pixabay.com)
2. Récupérez votre clé API sur [pixabay.com/api/docs](https://pixabay.com/api/docs/)
3. Créez un fichier `.env` dans `frontend/` :
```env
VITE_PIXABAY_API_KEY=votre_clé_api
```
4. Redémarrez le serveur de développement

---

## 📝 Versions

| Version | Date | Changements |
|---------|------|-------------|
| **v1.1.0** | Avril 2026 | Thèmes dynamiques, lecteur musical, SettingsPanel |
| v1.0.1 | Avril 2026 | Composants UI réutilisables, refonte design |
| v1.0.0 | Mars 2026 | Version initiale (CRUD + Pomodoro) |

---

## 🔮 Roadmap

- [x] Minuteur Pomodoro (Focus / Pause / Repos)
- [x] CRUD Tâches avec sous-étapes
- [x] Notifications navigateur
- [x] 5 thèmes dynamiques
- [x] Lecteur musical avec recherche
- [ ] Authentification utilisateur
- [ ] Statistiques de productivité
- [ ] Export des tâches (JSON/CSV)
- [ ] Mode hors-ligne complet
- [ ] Synchronisation cloud

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. **Fork** le projet
2. Crée une branche : `git checkout -b feature/ma-feature`
3. Commit : `git commit -m 'feat: ma feature'`
4. Push : `git push origin feature/ma-feature`
5. Ouvre une **Pull Request**

---

## 📄 Licence

MIT © [RMY FOCUS Team](https://github.com/razafimanantsoaamarah-droid)

---

<div align="center">
  <sub>Made with ❤️ and ☕ by <strong>RMY FOCUS Team</strong></sub>
</div>
