# Sprint 4

Name: Harrison Hoytt
Github ID: hhhoytt
Group: Nulltime

### Files I worked on
null-time-web/src/app/app.module.ts
null-time-web/src/app/game-card-list/game-card-list.component.html
null-time-web/src/app/game-card-list/game-card-list.component.scss
null-time-web/src/app/game-card-list/game-card-list.component.ts
null-time-web/src/app/game-card/game-card.component.scss
null-time-web/src/app/game-join/game-join.component.html
null-time-web/src/app/game-join/game-join.component.scss
null-time-web/src/app/game-join/game-join.component.ts
null-time-web/src/app/game-lobby/game-lobby.component.html
null-time-web/src/app/game-lobby/game-lobby.component.scss
null-time-web/src/app/game-lobby/game-lobby.component.ts
null-time-web/src/app/game-score-display/game-score-display.component.html
null-time-web/src/app/game-score-display/game-score-display.component.scss
null-time-web/src/app/game-score-display/game-score-display.component.ts
null-time-web/src/app/game/round/round-page/round-page.component.html
null-time-web/src/app/game/round/round-page/round-page.component.scss
null-time-web/src/app/game/round/turn-start-page/turn-start-page.component.html
null-time-web/src/app/services/gameplay-service.ts
null-time-web/src/gameHelper/utils.ts
null-time-web/src/styles.scss
null-time-web/src/assets/music/TimeUpBuzzer.mp3

### What I accomplished
Gameplay fixes: Styling #75
For this issue, most of the web app was reworked to work on mobile devices and have more responsive UI for the user. For instance, buttons that required previous data to be entered would be disabled before the user could press it.

Gameplay Fixes: Add team scores onto the gameplay page #76
For this issue, there was no way for players to see the current game score until the game was over. I added a way to see the current game score whie playing the game. I had to make a slight modification to how the score was calculated but it wasn't too bad to do.

Gameplay Fixes: Add Instructions #78
For this issue, I added instructions that show before each game round so new players will know how to play. I added them in a way that makes it easier to add more instructions for new rounds as needed.

Gameplay Fixes: Timer's Up sound effect #79
For this issue, I added a sound effect that plays when the timer runs out. To do this I found a royalty free buzzer sound effect that I edited to be slightly different to fit the game better. This provides more haptic feedback to users, since in the heat of the game they may not notice when time is up if they aren't looking at the screen.