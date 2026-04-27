<div align="center">
<h1>
  <img src="https://img.shields.io/badge/RMY_FOCUS-%E2%8F%B3-0f172a?style=for-the-badge&logo=clockify&logoColor=06b6d4&labelColor=0f172a&color=06b6d4" alt="RMY FOCUS" width="400" />
</h1>

<br />

[![Version](https://img.shields.io/badge/version-1.1.0-cyan?style=for-the-badge)](https://github.com/razafimanantsoaamarah-droid/Promodoro-to-do/releases)
[![React](https://img.shields.io/badge/react-19.2.5-06b6d4?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/vite-8.0.9-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/razafimanantsoaamarah-droid/Promodoro-to-do/.github/workflows/deploy.yml?style=for-the-badge&label=CI%2FCD)](https://github.com/razafimanantsoaamarah-droid/Promodoro-to-do/actions)

<h3><em>"Maîtrisez votre temps, accomplissez l'essentiel."</em></h3>

</div>

---

## 💎 Aperçu 

<div align="center">
  <img width="100%" alt="Hero Image" src="https://github.com/user-attachments/assets/a4259f44-6937-4bbb-937f-e264bd8d4d48" style="border-radius: 20px; border: 2px solid #facc15; box-shadow: 0 10px 40px rgba(6, 182, 212, 0.25);" />
</div>

---

## ⚡ Fonctionnalités

| 🎨 Design System | ⏱️ Moteur Pomodoro | 🎵 Ambiance Sonore |
| :--- | :--- | :--- |
| **Interface Glassmorphism** | **Cycles intelligents** | **Recherche Pixabay intégrée** |
| 5 thèmes dynamiques | Focus (25 min) / Pause (5 min) / Repos (15 min) | Lecture en continu avec playlist |
| Upload d'images personnalisées | Persistance via localStorage | Contrôle volume, mute, piste suivante |

| 📋 Gestion de Tâches | 🔔 Notifications | 🚀 Performance |
| :--- | :--- | :--- |
| **CRUD complet** | **Alertes navigateur natives** | **React 19 + Vite 8** |
| Sous-étapes & Priorités (Low/Medium/High) | Toasts animés contextuels | Tailwind CSS 4 |
| Drawer d'édition coulissant | Son de fin de cycle | Zéro backend - 100% client |

---

## 🎠 Galerie des Thèmes

<details open>
<summary><b>▶ Cliquez pour voir les ambiances disponibles</b></summary>
<br />
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/d2cfee39-e2d6-4d2b-b4c1-efacc6b3dcc3" width="400px" /><br/>
        <b>🌌 RMY Dark</b>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/e552f8ca-f364-40e9-832a-a0837e594cb5" width="400px" /><br/>
        <b>🤖 Cyberpunk</b>
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <i>🔄 Utilisez le menu Paramètres (⚙️) pour changer d'ambiance en un clic !</i>
      </td>
    </tr>
  </table>
</div>
</details>

---

## 🛠️ Stack Technique

```mermaid
graph TD
    A[React 19] --> B{State}
    B --> C[useLocalStorage Hook]
    A --> D[Framer Motion 12]
    A --> E[Tailwind CSS 4]
    A --> F[Pixabay API]
    D --> G[Animations fluides]
    E --> H[Variables CSS dynamiques]
    F --> I[Recherche musicale]
```

| Technologie | Usage |
|-------------|-------|
| **React 19** | UI Components & Hooks |
| **Vite 8** | Build tool ultra-rapide |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion 12** | Animations & transitions |
| **Lucide React** | Icônes vectorielles |
| **Pixabay API** | Recherche de musique libre de droit |

---

## 🚀 Installation Express

```bash
# 1. Cloner le repo
git clone https://github.com/razafimanantsoaamarah-droid/Promodoro-to-do.git

# 2. Aller dans le dossier frontend
cd Promodoro-to-do/frontend

# 3. Installer les dépendances
npm install

# 4. Lancer en développement
npm run dev
```

> [!TIP]
> Pour débloquer la recherche musicale, créez un fichier `.env` dans `frontend/` avec votre clé API Pixabay :
> ```
> VITE_PIXABAY_API_KEY=votre_clé_api
> ```
> Obtenez-la gratuitement sur [pixabay.com/api/docs](https://pixabay.com/api/docs/) 🎶

---

## 🔮 Roadmap 2026

- [x] **Phase 1 :** Core Pomodoro & CRUD Tâches
- [x] **Phase 2 :** Thèmes dynamiques & Lecteur musical
- [ ] **Phase 3 :** Authentification & Synchronisation cloud
- [ ] **Phase 4 :** Dashboard de productivité & Statistiques
- [ ] **Phase 5 :** PWA complète (mode hors-ligne)

---

## 📝 Changelog

| Version | Date | Nouveautés |
|---------|------|------------|
| **v1.1.0** | Avril 2026 | Thèmes dynamiques, lecteur musical, SettingsPanel |
| **v1.0.1** | Avril 2026 | Composants UI réutilisables, refonte glassmorphism |
| **v1.0.0** | Mars 2026 | Version initiale (Pomodoro + CRUD) |

---

<div align="center">
  <img src="https://img.shields.io/badge/made_with-%E2%9D%A4%EF%B8%8F_and_%E2%98%95-0f172a?style=for-the-badge" alt="Made with love" />
  <br />
  <sub>© 2026 <b>RMY FOCUS Team</b> - Tous droits réservés.</sub>
</div>
