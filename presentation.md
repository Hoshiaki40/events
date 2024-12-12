# Introduction

Mesdames et Messieurs, honorables membres du jury, il est un honneur de présenter aujourd'hui vous présenter un projet ambitieux **« L'intelligence artificielle comme allié éducatif : Consolidation des acquis des élèves grâce à un assistant pédagogique virtuel »**.

Dans un contexte où l'éducation malgache fait face à de nombreux défis—un taux élevé d'analphabétisme et un accès inégal aux ressources—l'intégration de l'intelligence artificielle (IA) se révèle essentielle. L'UNESCO soutient cette initiative en encourageant l'utilisation de l'IA pour optimiser les performances éducatives, et le gouvernement prévoit la création d'instituts dédiés à cette technologie. Cependant, sans une adaptation aux spécificités locales, l'impact de ces innovations risque de rester limité.

C'est ici que se pose notre **problématique** : **Comment un assistant pédagogique virtuel, basé sur l'IA, peut-il améliorer la qualité de l'apprentissage et renforcer la persévérance scolaire des élèves à Madagascar, en prenant en compte les particularités de notre système éducatif ?**

L'objectif global de ce projet est clair : concevoir et implémenter un système d'assistance virtuel qui améliore efficacement la consolidation des connaissances chez les élèves. Pour atteindre cet objectif, plusieurs **objectifs spécifiques** ont été définis, tels que l'analyse des besoins des élèves et la création d'un outil efficace pour l'apprentissage.

Pour soutenir cette démarche, nous avons formulé les hypothèses suivantes :

1. L'analyse des besoins pour la mise en place d'un assistant pédagogique permettra d’identifier les différents profils d'élèves et de justifier l'instauration d’un APV.
2. La conception et l'implémentation d'un mentor virtuel basé sur l'IA contribueront à améliorer le niveau de compétence des élèves.

**Pour structurer ma présentation**, je vous proposerai un plan détaillé suivant de cette brève introduction, les méthodes d'analyse et de conception employée, les résultats obtenus, des discussions sur ces résultats, des recommandations pour l'avenir, et enfin une conclusion sur l'importance de l'IA dans l'éducation.

# Méthode (2 minutes)

La méthodologie adoptée dans ce projet vise à vérifier les hypothèses formulées de manière rigoureuse.

## Démarche de vérification commune aux hypothèses

Une analyse documentaire et des statistiques ont été réalisées pour établir un cadre théorique solide, confrontant les hypothèses aux résultats d'études antérieures sur l'intelligence artificielle dans l'éducation.

## Démarche de vérification spécifique à l’hypothèse 1

Pour la démarche de vérification à la première hypothèse, une analyse détaillée a été effectuée, incluant l'examen des performances académiques et des attitudes envers l'apprentissage. Cela a justifié la conception d'un assistant pédagogique virtuel adapté aux besoins des élèves.

## Démarche de vérification spécifique à l’hypothèse 2

Concernant la démarche de vérification de la seconde hypothèse, plusieurs simulations des interactions des élèves avec le système ont été réalisées pour reproduire un environnement réaliste. Un benchmarking entre deux algorithmes d'apprentissage a permis de déterminer celui qui est le plus adapté au cas d'usage.

## Méthode de conception et de travail

La méthode MoSCoW a été adoptée pour prioriser les fonctionnalités essentielles du projet, assurant le développement des éléments critiques tout en permettant des ajustements basés sur les retours d'expérience.

## Limites de la méthodologie

Cependant, certaines limites ont été identifiées. D'une part, l'absence de données sur les résultats scolaires individuels des élèves a restreint l'évaluation de l'impact direct de l'application. D'autre part, le manque de répertorisation des exercices pour certaines matières à Madagascar a également constitué un obstacle à la mise en œuvre optimale de l'assistant virtuel.

# Résultats (10 minutes)

1. **Explication des besoins essentiels pour la mise en place d’un APV (1 minute 30)**

   **Analyse de l’existant :**  
   Une évaluation des applications existantes, telles que **Brainly**, **Stewdy**, et **MagicSchool**, a été réalisée. Par exemple, la fonctionnalité "Snap to Solve" de Brainly, qui utilise l'intelligence artificielle pour résoudre rapidement des problèmes, a un taux de satisfaction de 70 % parmi les utilisateurs. Cependant, les évaluations de Brainly sur des plateformes comme Trustpilot révèlent une insatisfaction générale, avec des notes très basses. Cela indique un besoin pressant d'améliorer les outils existants.

   **Analyse des besoins :**  
   L'identification des différents profils d'élèves est cruciale. Une étude basée sur les données de l'OCDE PISA 2022 a montré que 82,6 % des élèves possèdent un ordinateur, mais une proportion significative d'entre eux ne tire pas pleinement parti des outils d'intelligence artificielle disponibles. L'analyse des performances académiques a révélé que 41,1 % des élèves rencontrent des difficultés en mathématiques, tandis que 57,7 % sont motivés. Ces indicateurs soulignent l'importance d'un APV qui répond aux besoins spécifiques et adaptés aux compétences de chaque élève.

2. **Explication de la mise en place de l’assistant pédagogique virtuel (3 minutes)**

   **Architecture du système :**  
   Le diagramme présente les interactions entre l'utilisateur et le système lors de l'utilisation de l'assistant pédagogique virtuel (APV). L'utilisateur demande d'abord la liste des matières et sélectionne une sous-matière, comme "Probabilités", avant de recevoir un exercice adapté à son niveau, généré par l'agent d'IA. Après avoir soumis ses réponses, les résultats sont sauvegardés et analysés pour mettre à jour les compétences de l'utilisateur en fonction de ses performances.

   **Interaction utilisateur :**  
    Un diagramme de classe (à présenter avec des images) illustre l'interaction entre les utilisateurs (élèves et enseignants) et le système. Les principaux composants incluent la gestion des utilisateurs, des exercices et des performances. Ces composants interagissent de manière dynamique pour offrir un parcours d'apprentissage personnalisé.

   **Simulation effectuée :**  
    La simulation a été réalisée à l'aide des algorithmes Q-learning et ε-greedy, permettant d'évaluer l'efficacité de l'adaptation des exercices selon les performances des élèves. Ces simulations ont démontré une amélioration significative des résultats scolaires des élèves en difficulté.

3. **Présentation de l'application (5 minutes)**

   **Interface utilisateur :**  
   L'interface de l'application est intuitive, permettant aux élèves de naviguer facilement entre les exercices. Des captures d'écran montreront les principales fonctionnalités, comme la soumission d'exercices, la visualisation des résultats et le suivi des compétences.

   **Fonctionnalités clés :**

   - **Adaptation dynamique des exercices :** Le système ajuste la difficulté en fonction des performances passées, garantissant que chaque élève est mis au défi tout en consolidant ses acquis.
   - **Suivi des compétences :** Les élèves peuvent consulter leur progression dans les différentes matières, favorisant ainsi une prise de conscience de leurs forces et faiblesses.

   **Exemples concrets :**  
   Des exemples d'utilisation illustreront comment l'APV adapte les exercices en temps réel. Par exemple, un élève en difficulté pourrait recevoir des exercices supplémentaires sur des concepts spécifiques, tandis qu'un élève performant pourrait être proposé des défis plus avancés.

# Discussions et Recommandations

## Discussions

Les résultats de cette recherche mettent en lumière des défis majeurs, mais également des opportunités significatives dans l'intégration d'un assistant pédagogique virtuel (APV) à Madagascar. L'analyse des profils d'élèves révèle une grande diversité dans leurs compétences et motivations, soulignant l'importance cruciale d'une personnalisation des outils éducatifs. En effet, le fait que 41,1 % des élèves rencontrent des difficultés en mathématiques n'est pas seulement une statistique ; c'est un appel à l'action pour développer des solutions adaptées qui répondent à ces besoins spécifiques. D'un autre côté, les 57,7 % d'élèves motivés montrent qu'il existe un potentiel considérable à exploiter, où des défis bien conçus peuvent non seulement stimuler leur engagement mais également les encourager à exceller.

La mise en place de l'APV doit également s'accompagner d'une réflexion sur l'infrastructure technologique. Bien que 82,6 % des élèves possèdent un ordinateur, une proportion significative reste sous-exploitée, ce qui pose la question de l'accessibilité réelle à l'outil d'apprentissage. Ce constat suggère que, au-delà de la sensibilisation, des initiatives ciblées devraient être mises en place pour maximiser l'engagement avec les technologies d'apprentissage.

Concernant la conception de l'application, l'architecture adoptée s'est avérée adéquate pour répondre aux besoins identifiés. L'utilisation d'algorithmes d'apprentissage adaptatif comme le Q-learning et ε-greedy a le potentiel d'offrir une expérience d'apprentissage vraiment personnalisée. Cependant, il est primordial d'effectuer des tests rigoureux et continus pour garantir que ces algorithmes s'ajustent efficacement aux spécificités locales. La variabilité des résultats selon les régions souligne la nécessité de flexibilité et d'adaptabilité dans les réponses éducatives.

## Recommandations

Pour garantir le succès de l'intégration de l'APV, plusieurs recommandations concrètes et réalisables peuvent être formulées :

1. **Sensibilisation et accompagnement des utilisateurs** :

   1. Plutôt que de se concentrer sur des programmes de formation formels, des sessions de sensibilisation interactives pourraient être mises en place. Ces ateliers permettraient de montrer aux élèves et aux enseignants comment tirer parti des outils d'IA sans imposer des contraintes de formation formelle. Cela pourrait inclure des démonstrations pratiques et des retours d'expérience d'autres utilisateurs.

2. **Partenariats avec des acteurs locaux** :

   1. La collaboration avec des écoles, des administrations locales et des ONG devrait être encouragée pour faciliter le déploiement de l'APV. Ces partenariats peuvent non seulement fournir un soutien logistique mais aussi aider à adapter culturellement les contenus proposés, en s'assurant qu'ils résonnent avec le contexte local.

3. **Collecte de données et ajustements dynamiques** :

   1. Établir un système de collecte de données sur les performances des élèves permettrait d'affiner en continu les algorithmes d'apprentissage. En intégrant des retours en temps réel sur l'efficacité des exercices, l'application pourrait évoluer et s'améliorer en fonction des besoins réels des utilisateurs.

4. **Mécanisme de suivi et d'évaluation** :
   1. Créer un cadre de suivi et d'évaluation flexible pour mesurer l'impact de l'APV sur les résultats scolaires est essentiel. Cela pourrait impliquer des indicateurs de performance clairs, permettant des ajustements rapides en réponse aux résultats observés.

En somme, l'intégration d'un assistant pédagogique virtuel basé sur l'intelligence artificielle représente une avancée prometteuse pour améliorer la qualité de l'éducation à Madagascar. Toutefois, son succès dépendra de l'adhésion des acteurs locaux, de l'optimisation continue de l'application, et de l'écoute attentive des besoins des élèves. C'est à travers une approche intégrée, qui prend en compte les spécificités culturelles et technologiques, que cet outil pourra réellement transformer l'apprentissage et l'engagement des élèves.

# Conclusions

## Conclusion générale

Pour conclure nous avons examiné le rôle de l'intelligence artificielle comme allié éducatif, se concentrant sur la consolidation des acquis des élèves grâce à un système de mentorat virtuel. Une analyse approfondie des facteurs influençant les performances scolaires a permis d'identifier les opportunités et défis liés à l'intégration de l'IA dans le processus éducatif.

## Validation des hypothèses

La première hypothèse, stipulant que l'analyse des besoins pour la mise en place d’un assistant pédagogique permet d’identifier les différents profils des élèves et justifie la mise en place d’un APV, a été vérifiée. Les résultats montrent qu'un tel système peut fournir un accompagnement personnalisé et adaptatif, facilitant la maîtrise des concepts mathématiques. De plus, la seconde hypothèse, suggérant que la conception et la mise en place d'un mentor virtuel basé sur l'IA permettent d’améliorer le niveau de compétence des élèves, a également été confirmée. Cela souligne l'importance d'une approche intégrée qui tient compte des contraintes pédagogiques et technologiques, garantissant ainsi la personnalisation et l'adaptabilité nécessaires dans l'enseignement.

## Finir la conclusion

Les analyses indiquent qu'un système de mentorat virtuel, utilisant des algorithmes d'apprentissage automatique, peut considérablement améliorer l'apprentissage en répondant aux besoins spécifiques des élèves. Le modèle Q-learning a démontré une capacité d'adaptation supérieure et une efficacité accrue pour les élèves en difficulté. Pour l'avenir, il est pertinent d'explorer l'impact à long terme de tels systèmes sur l'éducation, avec des études complémentaires évaluant leur efficacité dans divers contextes éducatifs et intégrant des technologies émergentes pour enrichir l'expérience d'apprentissage. Une question demeure : comment l'IA peut-elle résoudre des inégalités d'accès à l'éducation et créer des environnements d'apprentissage inclusifs pour tous, y compris ceux ayant des besoins éducatifs particuliers ?

# Clôturer la présentation

**Ainsi, ma présentation s'achève.** J'espère avoir réussi à vous transmettre l'importance et le potentiel d'un assistant pédagogique virtuel dans le contexte éducatif malgache. Ce projet ne se limite pas seulement à un outil technologique, mais représente une véritable opportunité d'améliorer la qualité de l'apprentissage et de répondre aux besoins spécifiques des élèves.

Je tiens à remercier chaleureusement le président du jury, les examinateurs, et tous les membres du public pour votre attention et votre intérêt. Votre soutien et vos questions sont précieux pour le développement de ce projet.

Merci encore, et je suis maintenant à votre disposition pour répondre à vos questions ou pour engager des discussions supplémentaires.
