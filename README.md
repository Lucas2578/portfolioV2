# 💼 Portfolio
**Site web personnel - Présentation interactive de mon parcours développeur**

## 🚀 Installation
Clonez le repository et installez les dépendances :

```bash
git clone <repository-url>
cd portfolio
npm install
```

## 📋 Commandes disponibles
| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm test` | Lance les tests |
| `npm run eject` | Éjecte la configuration Create React App |

## 🖥️ Utilisation

### Mode Développement

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

### Mode Production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `build/`

## ✨ Fonctionnalités

### 🎨 Interface & Design
* ✅ Thème terminal/cyberpunk avec effets néon
* ✅ Animations fluides au scroll (Intersection Observer)
* ✅ Effets de glow et de typing
* ✅ Design responsive (mobile, tablette, desktop)
* ✅ Navigation smooth entre les sections

### 📂 Sections du site
* ✅ **Hero** - Présentation animée avec particules
* ✅ **About** - Parcours et présentation personnelle
* ✅ **Skills** - Compétences techniques avec barres de progression
* ✅ **Projects** - Portfolio de projets avec filtres
* ✅ **Contact** - Liens sociaux et téléchargement CV

### 🛠️ Technologies
* ✅ React 18
* ✅ React Router
* ✅ CSS/SCSS avec animations
* ✅ Intersection Observer API
* ✅ Font Awesome icons

### ⚡ Performance
* ✅ Lazy loading des composants
* ✅ Optimisation des animations
* ✅ Code splitting automatique
* ✅ Bundle optimisé pour la production

## 📁 Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   └── contact/
│   ├── datas/
│   │   ├── projects.json
│   │   └── contacts.json
│   ├── styles/
│   │   └── *.scss
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎯 Points techniques
* Architecture componentisée et réutilisable
* Gestion d'état avec React Hooks (useState, useEffect, useRef)
* Animations CSS performantes avec GPU acceleration
* Accessibilité ARIA pour une meilleure expérience utilisateur
* SEO optimisé avec balises meta

## 📝 Configuration
Le site utilise des fichiers JSON pour la gestion du contenu :
* `projects.json` - Liste des projets avec détails et technologies
* `contacts.json` - Liens sociaux et informations de contact

## 👤 Auteur
Développé avec ❤️ par **Lucas Dunis** (ldunis)
