# Plateforme de Coordination d'Incident Cybersécurité

## Description
Cette plateforme est conçue pour coordonner les actions lors d'incidents de cybersécurité, comme dans le cas de la cyberattaque simulée sur le CPAS de Charleroi (Projet Becode Mitnick4). Elle permet de centraliser les informations, suivre les tâches et assurer une réponse efficace et coordonnée.

## Fonctionnalités
- **Tableau de bord d'incident** : Vue d'ensemble des incidents en cours
- **Gestion des tâches** : Attribution et suivi des actions de réponse
- **Chronologie des événements** : Enregistrement chronologique des actions et découvertes
- **Gestion des preuves** : Catalogue des preuves collectées
- **Communication d'équipe** : Partage d'informations entre les intervenants
- **Génération de rapports** : Création automatisée de rapports d'incident

## Installation

### Prérequis
- Node.js (v14+)
- MongoDB
- Git

### Installation locale
```bash
# Cloner le dépôt
git clone https://github.com/servais1983/incident-response-coordination.git

# Accéder au dossier
cd incident-response-coordination

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditez le fichier .env avec vos configurations

# Lancer l'application
npm start
```

## Structure du Projet
- `/frontend` - Interface utilisateur React
- `/backend` - API Node.js/Express
- `/docs` - Documentation et guides
- `/scripts` - Scripts utilitaires

## Contribution
Les contributions sont les bienvenues. Veuillez suivre ces étapes :
1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence
MIT

## Contact
Projet Becode Mitnick4
