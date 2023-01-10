# Sprint 3

Name: Sarah Huang

Github ID: sarhuang

Group Name: nullTime


### What you planned to do 
- #33 [Modal System: The Basics](https://github.com/utk-cs340-fall22/nullTime/issues/33)
- #47 [Game Lobby: Mobile Support](https://github.com/utk-cs340-fall22/nullTime/issues/47)


### What you did not do
- [#47](https://github.com/utk-cs340-fall22/nullTime/issues/47) Game Lobby: Mobile Support

### What problems you encountered
- Learning what a modal was and how to make it reusable.

### Issues you worked on
- [#33](https://github.com/utk-cs340-fall22/nullTime/issues/33) Modal System: The Basics

### Files you worked on
- null-time-web/src/app/dialogs/confirm (confirm.component.html, .scss, and .ts)
- null-time-web/src/app/dialogs/message (message.component.html, .scss, and .ts)
- null-time-web/src/app/reusable/confirm-dialog-data.ts
- null-time-web/src/app/reusable/message-dialog-data.ts
- null-time-web/src/app/services/dialog.service.ts

- null-time-web/src/app/game-join/game-join.component.html
- null-time-web/src/app/game-join/game-join.component.ts
- null-time-web/src/app/game-lobby/game-lobby.component.html
- null-time-web/src/app/game-lobby/game-lobby.component.ts



### What you accomplished
I created a pop-up modal, or what Angular calls a "dialog." Specifically, I made one that only displays text like for error messages and another that has two buttons like a confirmation pop-up. The modals appear when the user types in the wrong game pin in the Join Game page and when the user is about to create a new lobby or start a local game in the Game Lobby page. They are reusable in which we are able to create many modals with different messages for any page. 
