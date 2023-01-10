# Sprint 2

Name: Sarah Huang

Github ID: sarhuang

Group Name: nullTime


### What you planned to do
- #7 [Game Lobby Component](https://github.com/utk-cs340-fall22/nullTime/issues/7)
- #14 [Game Lobby: Local Lobby](https://github.com/utk-cs340-fall22/nullTime/issues/14)
- #27 [Change the player box to phrase counter](https://github.com/utk-cs340-fall22/nullTime/issues/27)

### What you did not do
- [#8](https://github.com/utk-cs340-fall22/nullTime/issues/8) Game State Manager Component

### What problems you encountered
- Figuring out how clicking a button can route you to a different page without both pages showing up

### Issues you worked on
- [#7](https://github.com/utk-cs340-fall22/nullTime/issues/7) Game Lobby Component
- [#14](https://github.com/utk-cs340-fall22/nullTime/issues/14) Game Lobby: Local Lobby
- [#27](https://github.com/utk-cs340-fall22/nullTime/issues/27) Change the player box to phrase counter

### Files you worked on
- null-time-web/src/app/game-card-list/game-card-list.component.scss

- null-time-web/src/app/game-join/game-join.component.html
- null-time-web/src/app/game-join/game-join.component.scss
- null-time-web/src/app/game-join/game-join.component.ts

- null-time-web/src/app/game-lobby/game-lobby.component.html
- null-time-web/src/app/game-lobby/game-lobby.component.scss
- null-time-web/src/app/game-lobby/game-lobby.component.ts

- null-time-web/src/app/app-routing.module.ts



### What you accomplished
I routed the Join Page to be the very first page that users see. If they enter the correct join code, it will take them to a screen where they can add and edit cards for the game. If the user chooses to host the game, that button will take them to the lobby page with a randomly generated code, the current word counter, and several options. From the lobby, the host can start the game, create a new lobby by changing the room code and reset the word counter, and jump straight into a local game and add new words.
