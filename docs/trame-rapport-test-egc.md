# Trame de test et état d'exécution — EGC

**Campagne arrêtée au :** 12 novembre 2026  
**Document associé :** `rapport-test-module-android-egc-2026-11-12.pdf`  
**Statuts :** Réussi = scénario exécuté avec le résultat attendu; Partiel = résultat observé mais portée incomplète; Non exécuté = aucune conclusion.

## 1. Identification

| Champ | Valeur |
|---|---|
| Projet | EGC — Église Glorieuse du Christ |
| Périmètre | Application Android et navigation du site de production |
| Application Android | `com.egc.eglise`, version 1.3, code 4 |
| Artefact | APK Railway, 63 711 375 octets; SHA-256 `421AC3CBA21AE31E32EFBEB0B1C35D14F655E72A80879FDB974F760F38B2439F` |
| Appareil Android | TECNO CN5c, Android 16 / API 36 |
| Installation | Version 1.3 confirmée sur l'appareil après mise à jour; installation fraîche non testée |
| Site web | Production, viewport mobile 390 × 844 |
| Date des essais | 12 novembre 2026; preuve Live antérieure du 8 novembre 2026 signalée séparément |
| Testeur / validateur | À renseigner avant transmission |

## 2. Objectif et périmètre

Vérifier les parcours observables de l'application EGC, l'accès à la Bible hors ligne, l'état du module Live, les fiches « Trouver mon église » et l'ouverture des liens cartographiques. Les essais web couvrent la navigation et quelques interactions sans écriture de données.

Les essais d'authentification, d'envoi, de paiement, de persistance des progrès, de notifications planifiées, d'installation fraîche et de lecture effective d'un direct ne sont pas déclarés réussis.

## 3. Matrice d'exécution

| ID | Plateforme / scénario | Résultat observé | Statut | Preuve |
|---|---|---|---|---|
| W-01 | Site — navigation de 21 routes à 390 × 844 | 21 réponses HTTP 200; pas d'erreur JavaScript de page ni de débordement horizontal constaté. Certains écrans paresseux ont nécessité une attente. | Réussi | Rapport |
| W-02 | Site — filtre et détail d'événement | Filtre « Culte » et détail (date, lieu, heure) affichés. | Réussi | Rapport |
| W-03 | Site — thème | Passage clair/sombre puis retour au thème clair. | Réussi | Rapport |
| W-04 | Site — plan personnalisé | Sélection du thème « Guérison » affichée; aucune progression n'a été enregistrée. | Réussi, portée limitée | Rapport |
| A-01 | Android — lancement et plein écran | Application lancée sur TECNO CN5c; affichage plein écran observé. | Réussi | Captures antérieures |
| A-02 | Android — Bible hors ligne | Après coupure temporaire du Wi-Fi et des données mobiles du téléphone, bannière hors ligne visible et Genèse 1 consultable; réseau rétabli ensuite. | Réussi | [E-01](./preuves-test-egc-2026-11-12/01-genese-hors-ligne.png) |
| A-03 | Android — Live sans direct actif | État « Aucun direct n'est en cours » et prédications archivées visibles. | Réussi | [E-02](./preuves-test-egc-2026-11-12/02-live-sans-direct.png) |
| A-04 | Android — fiches de localisation v1.3 | Brazzaville, Pointe-Noire et Oyo affichent leurs repères et numéros de téléphone. | Réussi | [E-03](./preuves-test-egc-2026-11-12/09-fiche-brazzaville.jpg), [E-04](./preuves-test-egc-2026-11-12/10-fiche-pointe-noire.jpg), [E-05](./preuves-test-egc-2026-11-12/11-fiche-oyo.jpg) |
| A-05 | Android — liens d'itinéraire | Google Maps s'ouvre pour les trois fiches. Brazzaville affiche l'église, Pointe-Noire résout vers l'hôtel Elais (repère de l'adresse) et Oyo vers la mairie. Le point exact de l'église de Pointe-Noire n'est pas confirmé indépendamment. | Partiel | [E-06](./preuves-test-egc-2026-11-12/12-destination-brazzaville.jpg), [E-07](./preuves-test-egc-2026-11-12/13-destination-pointe-noire.jpg), [E-08](./preuves-test-egc-2026-11-12/14-destination-oyo.jpg) |
| A-06 | Live — capture d'un direct actif | Capture du 8 novembre indiquant « Direct en cours » et montrant le lecteur. Elle ne prouve ni la lecture effective du flux ni le comportement de la version 1.3. | Partiel, historique | [E-09](./preuves-test-egc-2026-11-12/08-live-historique-2026-11-08.jpg) |
| A-07 | Android — plan de lecture et historique | Écrans consultés; enregistrement d'une progression et persistance de l'historique non vérifiés. | Partiel | Captures antérieures |
| A-08 | Android — rappels | Écran consulté; permission et programmation d'une notification non vérifiées. | Partiel | Capture antérieure |
| A-09 | Android — installation fraîche | Non exécutée; seul le parcours de mise à jour de la version déjà installée a été observé. | Non exécuté | — |
| A-10 | Android — lecture effective d'un direct v1.3 | Aucun direct actif disponible lors de l'essai du 12 novembre. | Non exécuté | — |
| A-11 | Parcours avec effets réels | Connexion à l'administration, envoi WhatsApp et paiement/don non exécutés. | Non exécuté | — |

## 4. Vérifications techniques

| Vérification | Résultat |
|---|---|
| Build web (`npm run build`) | Réussi; avertissement préexistant sur la taille de certains bundles Bible. |
| Tests backend (`npm --prefix backend test`) | 6 réussis, 0 échec. |
| Build Android debug (`:app:assembleDebug`) | Réussi. |
| ESLint ciblé sur `LocationMap.jsx` | Réussi. |
| ESLint complet | Échec sur des erreurs réparties dans le dépôt et des assets générés; résultat distinct des scénarios fonctionnels ci-dessus. |
| APK public | Version 1.3 (4), min SDK 24, target SDK 36; signature vérifiée. URL : https://egliseglorieuseduchrist.up.railway.app/app-egc.apk |

## 5. Limites et suites requises

- Tester une installation fraîche; la version 1.3 a été confirmée après mise à jour sur l'appareil.
- Vérifier l'enregistrement d'une progression et sa présence dans l'historique.
- Tester la permission et la réception d'un rappel planifié.
- Refaire le test Live pendant un véritable direct, avec lecture effective du flux, sur la version 1.3.
- Confirmer que le lien Pointe-Noire cible le point précis de l'église, au-delà du repère Hôtel Elais.
- N'exécuter l'administration, les envois ou les paiements qu'avec un environnement et des comptes de test autorisés.
- Des rubriques web affichent « Bientôt disponible » ou un contenu à venir; elles sont consignées comme limites observées, pas comme scénarios métier réussis.
- Les captures de cartes intégrées au dossier de preuves masquent le départ; ne pas redistribuer les originaux qui révèlent la position.

## 6. Synthèse et décision proposée

- Scénarios réussis : 8
- Scénarios partiels : 4
- Scénarios non exécutés : 3
- Anomalies fonctionnelles confirmées dans les scénarios exécutés : aucune recensée

**Décision proposée : validation partielle / GO sous réserves pour les seuls parcours exécutés.** La recette globale ne peut pas être déclarée complète tant que les suites ci-dessus ne sont pas réalisées ou formellement exclues du périmètre.

| Rôle | Nom | Décision / commentaire | Date |
|---|---|---|---|
| Testeur | À renseigner |  |  |
| Responsable de validation | À renseigner |  |  |
