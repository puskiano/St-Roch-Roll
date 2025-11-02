# 📺 Guide pour Ajouter des Vidéos YouTube

## ⚠️ Erreur 153 - Vidéo Non Intégrable

Si vous voyez "Erreur 153" ou "Regarder la vidéo sur YouTube", cela signifie que le propriétaire de la vidéo a **désactivé la lecture intégrée**.

## ✅ Comment Trouver des Vidéos qui Fonctionnent

### Méthode 1: Tester une Vidéo YouTube

1. **Trouvez une vidéo YouTube** de guitare que vous aimez
2. **Copiez l'ID de la vidéo** depuis l'URL
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ` (la partie après `v=`)

3. **Testez si elle est intégrable** en visitant :
   ```
   https://www.youtube.com/embed/[ID_VIDEO]
   ```

4. **Si la vidéo se lance**, elle est intégrable ! ✅
5. **Si vous voyez une erreur**, cherchez une autre vidéo ❌

### Méthode 2: Chercher des Vidéos Intégrables

Les types de vidéos généralement intégrables :
- ✅ **Tutoriels de guitare** (chaînes éducatives)
- ✅ **Covers amateurs**
- ✅ **Leçons de guitare**
- ✅ **Performances live** (certaines)
- ✅ **Vidéos Creative Commons**

Les vidéos souvent NON intégrables :
- ❌ **Clips officiels** (labels de musique)
- ❌ **Performances professionnelles** (droits d'auteur)
- ❌ **Concerts officiels**

## 🔧 Ajouter vos Vidéos dans l'Application

### Étape 1: Ouvrez `videos.js`

Trouvez le tableau `this.videos` (ligne ~8)

### Étape 2: Ajoutez votre vidéo

```javascript
{
    id: 'VOTRE_ID_YOUTUBE',           // L'ID de la vidéo
    title: 'Titre de la vidéo',       // Titre affiché
    artist: 'Nom de l\'artiste',      // Artiste ou créateur
    style: 'rock',                    // rock, blues, jazz, metal, classique, folk
    song: 'Nom du morceau',           // Nom du morceau
    duration: '5:23'                  // Durée de la vidéo
}
```

### Étape 3: Exemple Complet

```javascript
this.videos = [
    {
        id: 'fJ9rUzIMcZQ',
        title: 'Bohemian Rhapsody - Guitar Tutorial',
        artist: 'Queen',
        style: 'rock',
        song: 'Bohemian Rhapsody',
        duration: '5:55'
    },
    // Ajoutez votre vidéo ici
    {
        id: 'abc123xyz',
        title: 'Ma Vidéo de Guitare',
        artist: 'Moi',
        style: 'blues',
        song: 'Mon Morceau',
        duration: '3:45'
    }
];
```

## 🎸 Chaînes YouTube Recommandées

Ces chaînes ont généralement des vidéos intégrables :

### Tutoriels en Français
- **Guitare Débutant**
- **MyGuitare**
- **HGuitare**
- **Tabs4acoustic**

### Tutoriels en Anglais
- **JustinGuitar**
- **Marty Music**
- **GuitarLessons365**
- **Andy Guitar**
- **Paul Davids**

### Jazz & Blues
- **Jens Larsen**
- **Rick Beato**
- **Active Melody**

## 💡 Astuces

1. **Privilégiez les tutoriels** plutôt que les clips officiels
2. **Testez toujours** avant d'ajouter l'ID dans votre code
3. **Créez vos playlists** YouTube et utilisez vos vidéos favorites
4. **Mélangez les styles** pour une bibliothèque variée

## 🆘 Dépannage

**Q: Toutes mes vidéos affichent Erreur 153**
R: Les IDs sont probablement pour des vidéos non intégrables. Testez chaque ID avec la méthode ci-dessus.

**Q: Comment savoir si une vidéo est intégrable avant de l'ajouter ?**
R: Visitez `https://www.youtube.com/embed/[ID]` dans votre navigateur.

**Q: Puis-je utiliser des vidéos de n'importe quelle chaîne ?**
R: Seulement si le propriétaire autorise l'intégration. Privilégiez les créateurs de contenu éducatif.

**Q: Combien de vidéos puis-je ajouter ?**
R: Autant que vous voulez ! L'application gère des centaines de vidéos sans problème.

## 📝 Template de Vidéo

Copiez-collez ce template pour ajouter rapidement vos vidéos :

```javascript
{
    id: '',              // ID YouTube
    title: '',           // Titre complet
    artist: '',          // Artiste/Créateur
    style: '',           // rock/blues/jazz/metal/classique/folk
    song: '',            // Nom du morceau
    duration: ''         // Format: 'MM:SS'
},
```

---

**Bon visionnage ! 🎵**
