# Byssus Tenebrarum — site statique GitHub Pages

Pack prêt à déposer dans un dépôt GitHub.

## Pages
- `index.html` : accueil
- `collections.html` : catalogue + filtres
- `product.html?id=collier-elise` : fiche produit
- `creation.html` : configurateur ludique en 6 étapes
- `pierres.html` : pierres & vertus
- `apropos.html` : marque / atelier
- `contact.html` : formulaire visuel
- `cart.html` : panier / commande

## Fonctionnel dès l'ouverture
- catalogue chargé depuis `data/products.json`
- filtres catalogue
- panier `localStorage`
- quantités
- code promo démo `BYSSUS10`
- configurateur personnalisé en 6 étapes
- ajout d'une création personnalisée au panier
- responsive mobile / tablette

## GitHub Pages
Déposez tout le contenu à la racine du dépôt.
Dans Settings > Pages, publiez la branche `main` depuis `/root`.

## Paiement
Le bouton de paiement est volontairement en mode démo.
Pour la production, remplacez son action dans `js/checkout.js` par une redirection vers votre
prestataire de paiement (ex. Stripe Checkout / PayPal). Ne stockez jamais de données bancaires dans GitHub Pages.

## Produits
Éditez `data/products.json`.
Les illustrations sont dans `assets/products/`.

## Logo
Le logo fourni est inclus dans `assets/logo/byssus-tenebrarum-logo.jpg`.

## Références visuelles
Les maquettes validées sont conservées dans `assets/reference/` pour faciliter le travail CSS.
