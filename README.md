# Portfolio — N'GUETTA Christ Emmanuel

Portfolio personnel responsive réalisé pour le mini-projet des séances 5 et 6
(Institut Ivoirien de Technologie).

## Architecture

```
Portfolio/
├── index.html              page principale (accueil, à propos, projets, CV, contact)
├── cv.html                 CV complet, imprimable et téléchargeable en PDF
├── vercel.json             en-têtes HTTP du site publié
└── assets/
    ├── css/
    │   ├── style.css       feuille principale (assemble les 3 fichiers ci-dessous)
    │   ├── base.css        variables de couleur, réglages généraux, titres
    │   ├── composants.css  header, boutons, cartes, frise, formulaire
    │   ├── animations.css  toutes les animations CSS3
    │   └── cv.css          mise en page du CV (écran + impression A4)
    ├── js/
    │   ├── data.js         le contenu : projets, compétences, métiers, e-mail
    │   ├── rendu.js        fabrique les cartes à partir de data.js
    │   ├── theme.js        mode sombre / clair
    │   ├── navigation.js   menu mobile, header, lien actif, retour en haut
    │   ├── animations.js   chargement, particules, frappe, apparitions
    │   ├── projets.js      filtre des projets par catégorie
    │   ├── contact.js      validation du formulaire
    │   └── cv.js           bouton de téléchargement du CV
    ├── icons/sprite.svg    toutes les icônes du site
    ├── images/             photo de profil
    └── docs/               cv.pdf (à générer depuis cv.html)
```

## Le CV

`cv.html` affiche le CV en ligne, au format d'une page A4. Le bouton
**Télécharger en PDF** télécharge `assets/docs/cv.pdf` s'il existe, sinon il
ouvre la fenêtre d'impression où l'on choisit « Enregistrer au format PDF ».

## Le formulaire de contact

Le site est statique : il n'a ni serveur ni base de données. Les messages
partent donc par e-mail et arrivent dans la boîte Gmail, donc lisibles sur
**ordinateur, téléphone et tablette** — partout où le compte Gmail est
connecté.

Le relais utilisé est **FormSubmit** : aucun compte à créer, aucune clé.
L'adresse de destination est celle définie dans `PORTFOLIO.email`
(`assets/js/data.js`).

**Activation, à faire une seule fois :** au premier message envoyé,
FormSubmit envoie un e-mail contenant un lien « Activate Form ». Tant que ce
lien n'est pas cliqué, les messages ne sont pas transmis. Après le clic, tout
fonctionne définitivement.

Le formulaire contient aussi un champ caché (`#site-web`) qui piège les
robots : un visiteur ne le voit pas, un robot le remplit, et le message est
alors ignoré. Si le réseau échoue, le site ouvre la messagerie du visiteur
pour que le message ne soit pas perdu.

## Déploiement sur Vercel

Le dépôt git est prêt et le premier commit est fait. Deux chemins possibles.

**Le plus simple — par le site Vercel**

1. Créer un dépôt vide sur GitHub, puis :
   `git remote add origin <adresse-du-depot>` et `git push -u origin main`
2. Sur vercel.com, se connecter avec GitHub, **Add New → Project**,
   importer le dépôt.
3. Garder le répertoire racine `./` et le préréglage **Other** : ni build ni
   répertoire de sortie, le site est statique.
4. **Deploy**. Vercel donne une adresse publique en `.vercel.app`.

Chaque `git push` déclenchera ensuite un nouveau déploiement automatique.

**Par le terminal**

```
npx vercel login      (connexion par e-mail ou GitHub)
npx vercel --prod     (déploiement en production)
```

Après le déploiement, remplacer l'adresse `portfolio-nce.vercel.app` par la
vraie adresse dans `index.html` (balises `canonical` et `og:`),
`robots.txt` et `sitemap.xml`.

## Reste à compléter

- Nom du lycée et ville du baccalauréat (`index.html` et `cv.html`)
- Niveau d'anglais (`cv.html`)
- Vérifier l'adresse exacte du profil LinkedIn (`assets/js/data.js`)
- Générer `assets/docs/cv.pdf` depuis `cv.html`

## Couleurs

La palette est définie par trois variables, au début de `assets/css/base.css` :

```css
--principal:       #0ea5e9;  /* bleu ciel */
--principal-fonce: #0369a1;
--accent:          #22d3ee;  /* cyan */
```

## Cache du navigateur

Les fichiers CSS et JS sont appelés avec `?v=3`. Après une modification,
augmenter ce numéro dans `index.html`, `cv.html` et `assets/css/style.css`,
sinon le navigateur peut servir une ancienne version.

## Développement local

Ouvre `index.html` avec l'extension **Live Server** de VS Code.

## Ajouter un projet

Ajoute une entrée dans la liste `projets` de `assets/js/data.js`. Le rendu des
cartes est pris en charge par `assets/js/rendu.js`.
