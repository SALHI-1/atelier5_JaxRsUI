# atelier5_JaxRsUI (Frontend)

Ce projet est une application web Angular (Single Page Application) conçue pour interagir avec l'API backend `Atelier5_JAX_RS`. Elle permet de visualiser, ajouter et gérer les stations-service et les types de carburants.

## Technologies utilisées

* **Angular 20**
* **TypeScript**
* **Angular Material** : Pour les composants d'interface utilisateur (cartes, formulaires, tables).
* **RxJS** : Pour la gestion des flux de données asynchrones.

## Prérequis

1.  **Node.js 20+** et **npm 10+**.
2.  **Backend** : L'API [Atelier5_JAX_RS](<URL_VERS_VOTRE_REPO_BACKEND>) doit être en cours d'exécution sur `http://localhost:8080`.

## Installation et Lancement

1.  **Cloner le dépôt** (si ce n'est pas déjà fait) :
    ```bash
    git clone <url-du-repo-frontend>
    cd atelier5_jaxrsui
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm start
    ```
    Cette commande (définie dans `package.json` comme `ng serve`) démarre un serveur de développement local.

4.  **Accéder à l'application** :
    Ouvrez votre navigateur et allez sur `http://localhost:4200/`.

## Configuration du Proxy

Ce projet utilise un fichier `proxy.conf.json` pour gérer les requêtes vers le backend pendant le développement afin d'éviter les problèmes de CORS.

* **Fichier** : `proxy.conf.json`
* **Configuration** :
    * Toutes les requêtes faites par l'application Angular vers `/api` (ex: `GET /api/stations`) sont interceptées par le serveur de développement Angular.
    * Elles sont ensuite redirigées vers `http://localhost:8080`.
    * Le chemin est réécrit de `/api` vers `/Atelier5_JAX_RS-1.0-SNAPSHOT/api`.

Cela garantit que l'appel `GET /api/stations` dans `api.ts` frappe bien l'endpoint `http://localhost:8080/Atelier5_JAX_RS-1.0-SNAPSHOT/api/stations` de votre backend JAX-RS.

## Build de Production

Pour créer une version optimisée de l'application pour la production :

```bash
npm run build
