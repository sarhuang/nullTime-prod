# Sprint 3

Name: Harrison Hoytt
Github ID: hhhoytt
Group Name: nullTime

### What you planned to do
- #16 [Game State Manager: Helper Functions](https://github.com/utk-cs340-fall22/nullTime/issues/16)
- #45 [Game State Manager: Put the Game Together](https://github.com/utk-cs340-fall22/nullTime/issues/45)
- #49 [Game Card List: Grid View](https://github.com/utk-cs340-fall22/nullTime/issues/49)

### What you did not do
- #49 [Game Card List: Grid View](https://github.com/utk-cs340-fall22/nullTime/issues/49)

### What problems you encountered
No issues, everything went pretty smoothly. We changed how we kept track of scoring compared to how it was originally done but it wasn't too hard to swith everything

### Issues you worked on
- #16 [Game State Manager: Helper Functions](https://github.com/utk-cs340-fall22/nullTime/issues/16)
- #45 [Game State Manager: Put the Game Together](https://github.com/utk-cs340-fall22/nullTime/issues/45)

### Files you worked on
gameHelper/interfaces.ts
gameHelper/utils.ts
services/gameplay-service.ts
src/game-card-list/game-card-list.component.ts
src/game-lobby/game-lobby.component.html
src/turn-start-page/*
src/turn-play-page/*
src/round-page/*

### What you accomplished
Now that routing was set up and we had a way to create our list of cards, I added all the logic to make the game playable. I did this by using a Service, which I had never used before in Angular. It correctly tracks the team's scores, the current round and phase of the game, and it correctly counts down the time when it's actually time to play the game. The game consists of 3 rounds, each with 3 seperate phases, and the game correctly goes through each. The game is now technically 100% playable from beginning to end and is in its MVP state.