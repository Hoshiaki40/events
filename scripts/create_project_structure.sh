#!/bin/bash

# Création de la structure principale
mkdir -p src/{app,components,core,data,domain,infrastructure,presentation,server-actions,utils}

# Création des sous-dossiers
mkdir -p src/core/{config,logger}
mkdir -p src/data/datasources/{api,db}
mkdir -p src/data/repositories
mkdir -p src/domain/{entities,usecases,interfaces}
mkdir -p src/infrastructure/{database,api}
mkdir -p src/presentation/{hooks,store}

echo "Structure de dossiers créée avec succès!"