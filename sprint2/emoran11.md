# Sprint 2

Name: Bear Moran
Github ID: emoran11
Group Name: nullTime

### What you planned to do
- #11 [Game Moderator: Component] (https://github.com/utk-cs340-fall22/nullTime/issues/11)
- #12 [Game Moderator: Display Card Values] (https://github.com/utk-cs340-fall22/nullTime/issues/12)
- #13 [Game Moderator: Edit Values] (https://github.com/utk-cs340-fall22/nullTime/issues/13)

### What you did not do
- #13 [Game Moderator: Edit Values] (https://github.com/utk-cs340-fall22/nullTime/issues/13)

### What problems you encountered
I struggled a lot since the data structure for the front end had not been fully planned. I still was having difficulty learning how Angular components worked and communicated with each other. Our team was very busy so it made meeting difficult.

### Issues you worked on
- #11 [Game Moderator: Component] (https://github.com/utk-cs340-fall22/nullTime/issues/11)
- #12 [Game Moderator: Display Card Values] (https://github.com/utk-cs340-fall22/nullTime/issues/12)
- #18 [Create Turn Page for when a player is taking their turn] (https://github.com/utk-cs340-fall22/nullTime/issues/18)

### Files you worked on
- null-time-web/src/styles.scss
- null-time-web/src/app/game/lobby/lobby.component.html
- null-time-web/src/app/game/lobby/lobby.component.ts
- null-time-web/src/app/game/round/round-page/round-page.component.html
- null-time-web/src/app/game/round/round-page/round-page.component.ts
- null-time-web/src/app/game/round/turn-play-page/turn-play-page.component.html
- null-time-web/src/app/game/round/turn-play-page/turn-play-page.component.ts
- null-time-web/src/app/game/round/turn-play-page/turn-play-page.component.html
- null-time-web/src/app/game/round/turn-play-page/turn-play-page.component.ts
- null-time-web/src/app/game/round/turn-start-page/turn-start-page.component.html
- null-time-web/src/app/game/round/turn-start-page/turn-start-page.component.ts
- null-time-web/src/app/game-lobby/game-lobby.component.html
- null-time-web/src/app/game-lobby/game-lobby.component.ts

### What you accomplished
I diagrammed out how the project is supposed to work, then added lots of components and set up the projects file structure to make sense. Following the pages diagram for how to play the game, I created 5 web pages: lobby, round-page, turn-start-page, turn-play-page, and moderation-page. I then created buttons and logic so that the pages were properly linked and showed the right html. I then added developer back buttons since there was no way to navigate backwards across the pages. This is proper, but without the dev back buttons, testing is tedious. My lobby was somewhat redundant since Sarah had already created a game-lobby page. I found this page convoluted so I had created a fresh one, but then I merged my lobby's functionality to apply to Sarah's game-lobby page. Because I had moved some formatting from a local to a global position, I was able to go and clean up the game-lobby's html and scss files so that they have less redundant code and are much more readable. I finally added the ability to observe the game card list from the moderation page.
