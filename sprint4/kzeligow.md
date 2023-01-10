# Sprint 4
Kuba Zeligowski • huncfut • nullTime

### Files you worked on
##### The main ones are
* aws/api/lobby/src/main/kotlin/Server.kt
* aws/api/lobby/src/main/kotlin/endpointPing.kt
* aws/api/lobby/src/main/kotlin/endpointCreate.kt
* aws/api/lobby/src/main/kotlin/endpointClose.kt
* aws/api/lobby/src/main/kotlin/endpointCardSubmit.kt
* aws/api/lobby/src/main/kotlin/endpointCardDelete.kt
* aws/api/lobby/src/main/kotlin/dbutils.kt
* aws/api/lobby/src/build.gradle.kts
* aws/cdk/bin/cdk.ts
* aws/cdk/lib/cdk-stack.ts
* aws/cdk/.env

### What you accomplished
I was fighting with the aws java sdk. There is no information or information on how to create a client to DynamoDB. After many hours, I finally made it. Later it turned out that aws has recently prereleased a kotlin sdk (that despite being prerelease has better and more full documentation than the Java one, which already even had a few versions). So I have fixed the cdk .env loading (which required fixing the dotenv loading), moved the regions to us-east-1 (which required fixing the console panel on aws, fixing the cloud formations already created, and moving everything to another region), created DynamoDB tables (which required schema planning, managing permissions, which was tricky, planning out billing strategies), and updated the naming convention (that is pretty straight forward, but allowed for a way smoother orientation in the Cloud Formation). Then I have connected the DB to the lambda and created all the endpoints for the backend API: pinging (GET allows for checking the status of the lambda, POST allows for checking whether a lobby with a given code exists), creating lobbies (POST: random key generation, checking for availability in the DB, creating an entry), adding cards (POST: serializing the JSON, reading cards, checking lobby presence, adding card-entry with a unique id), deleting cards (DELETE: deletes a card-entry with a given id), closing lobbies (scans all the card-entries that are attached to a given lobby, deletes those entries, deletes the lobby, and formats the cards in a game-ready format). Serialization was a pain, but got through it.