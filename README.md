# socialart_node

## Récupérer le projet via gitclone <url du projet> 

 ## aller dans le dossier serveur
cd serveur
  -> npm i (## afin de récupérer les packets)
  
 ## aller dans le dossier client
cd client
  -> npm i (##afin de récupérer les packets)
  
 ## créer la base de données mysql au nom *STRICT* de:
## socialart_node 
-> CREATE DATABASE socialart_node 
  ## les logs de connexion à la DB sont les suivants: host: 127.0.0.1, username: root, password: root
  ## si à modifier, aller dans le fichier config.json dans le dossier config du dossier serveur et modifier à la main pour la partie 3development"
  ## dans le dossier serveur:
  cd serveur
  npm start
  
  ## Dans le dossier client:
  cd client
  npm start
  
 
  L'application est lancée !
