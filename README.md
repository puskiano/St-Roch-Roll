# 🎸 Accordeur de Guitare Web

Application web mobile complète pour guitaristes : accordeur en temps réel + bibliothèque de vidéos YouTube intégrée.

## ✨ Fonctionnalités

### 🎵 Accordeur
- **Détection de pitch en temps réel** - Utilise l'API Web Audio pour détecter la fréquence des notes
- **Interface ultra graphique** - Design moderne avec animations et effets visuels
- **Optimisé mobile** - Responsive design parfait pour smartphones
- **Indicateur visuel** - Aiguille animée montrant si la corde est accordée
- **Référence des cordes** - Affiche les 6 cordes standard (E-A-D-G-B-E)
- **Précision en cents** - Affiche la différence en cents (1/100 de demi-ton)
- **Sons de référence** - Cliquez sur une corde pour entendre la note cible

### 📺 Bibliothèque de Vidéos
- **20+ vidéos YouTube intégrées** - Tutoriels et morceaux de guitare
- **Filtrage par style** - Rock, Blues, Jazz, Metal, Classique, Folk
- **Recherche intelligente** - Par morceau, artiste ou titre
- **Lecteur intégré** - Regardez sans quitter l'application
- **Interface cohérente** - Design moderne et responsive
- **Miniatures animées** - Prévisualisation avec durée

## 🚀 Installation

Aucune installation requise ! Il suffit d'ouvrir `index.html` dans votre navigateur.

### Méthode 1: Ouvrir directement
```bash
# Ouvrez index.html avec votre navigateur
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Méthode 2: Serveur local
```bash
# Python 3
python -m http.server 8000

# Node.js (avec npx)
npx serve

# Puis ouvrez: http://localhost:8000
```

## 📱 Utilisation

### Accordeur
1. **Cliquer sur l'onglet "Accordeur"** (🎵)
2. **Autoriser le microphone** - Votre navigateur demandera l'accès au micro
3. **Cliquer sur "Démarrer l'accordeur"** - Active la détection audio
4. **Jouer une corde** - L'application détecte automatiquement la note
5. **Accorder** - Suivez l'aiguille et les indications:
   - ⬇️ **Trop bas** - Tendez la corde
   - ✅ **Parfait** - La corde est accordée (±5 cents)
   - ⬆️ **Trop haut** - Détendez la corde

### Vidéos
1. **Cliquer sur l'onglet "Vidéos"** (📺)
2. **Filtrer par style** - Sélectionnez Rock, Blues, Jazz, etc.
3. **Rechercher** - Tapez le nom d'un morceau, artiste ou titre
4. **Cliquer sur une vidéo** - Le lecteur YouTube s'ouvre dans l'application
5. **Regarder** - La vidéo se lance automatiquement
6. **Fermer** - Cliquez sur le ✕ pour revenir à la galerie

## 🎯 Accordage Standard

| Corde | Note | Fréquence |
|-------|------|-----------|
| 6 (grave) | E | 82.4 Hz |
| 5 | A | 110.0 Hz |
| 4 | D | 146.8 Hz |
| 3 | G | 196.0 Hz |
| 2 | B | 246.9 Hz |
| 1 (aiguë) | E | 329.6 Hz |

## 🎬 Vidéos Disponibles

La bibliothèque inclut 20+ vidéos classées par style :

- **Rock** - Stairway to Heaven, Bohemian Rhapsody, Sweet Child O' Mine, etc.
- **Blues** - The Thrill Is Gone, Red House, Texas Flood
- **Metal** - Master of Puppets, Crazy Train, Eruption
- **Jazz** - Autumn Leaves, All Blues, Round Midnight
- **Classique** - Asturias, Recuerdos de la Alhambra, Romance
- **Folk** - Blackbird, The Boxer, Dust in the Wind

### Ajouter vos propres vidéos

Pour ajouter des vidéos, modifiez le fichier `videos.js` :

```javascript
{
    id: 'VIDEO_ID_YOUTUBE',  // ID de la vidéo YouTube
    title: 'Titre de la vidéo',
    artist: 'Artiste',
    style: 'rock',  // rock, blues, jazz, metal, classique, folk
    song: 'Nom du morceau',
    duration: '4:32'
}
```

**Note** : L'ID YouTube se trouve dans l'URL : `youtube.com/watch?v=VIDEO_ID`

## 🔧 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec animations
- **JavaScript ES6+** - Logique applicative
- **Web Audio API** - Capture et analyse audio
- **Autocorrelation** - Algorithme de détection de pitch
- **YouTube Iframe API** - Intégration vidéos YouTube

## 💡 Conseils

- Accordez dans un **environnement calme** pour de meilleurs résultats
- Jouez une **seule corde à la fois**
- Placez votre téléphone **près de la guitare**
- Utilisez un **navigateur récent** (Chrome, Firefox, Safari)

## 🌐 Compatibilité

- ✅ Chrome/Edge (recommandé)
- ✅ Firefox
- ✅ Safari (iOS/macOS)
- ✅ Opera

**Note**: Nécessite HTTPS en production (ou localhost pour le développement)

## 📊 Précision

- **Détection**: ±0.5 Hz
- **Plage**: 80-400 Hz (couvre toutes les cordes)
- **Latence**: ~50ms
- **Seuil "accordé"**: ±5 cents

## 🎨 Personnalisation

Vous pouvez modifier les couleurs dans `styles.css`:

```css
:root {
    --accent-primary: #00d9ff;    /* Couleur principale */
    --accent-secondary: #ff006e;  /* Couleur secondaire */
    --accent-success: #00ff88;    /* Couleur "accordé" */
    /* ... */
}
```

## 📝 Licence

Projet open source - Utilisez librement !

## 🤝 Contribution

N'hésitez pas à améliorer l'application et partager vos modifications !

---

**Bon accordage ! 🎵**
