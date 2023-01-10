# Sprint 2

Name: Bear Moran
Github ID: emoran11
Group Name: nullTime

### What you planned to do
- #13 [Game Moderator: Edit Values] (https://github.com/utk-cs340-fall22/nullTime/issues/13)
- #49 [Game Card List: Grid View] (https://github.com/utk-cs340-fall22/nullTime/issues/49)
- #56 [Game Moderator: Pass values] (https://github.com/utk-cs340-fall22/nullTime/issues/56)

### What you did not do
- #13 [Game Moderator: Edit Values] (https://github.com/utk-cs340-fall22/nullTime/issues/13)
- #49 [Game Card List: Grid View] (https://github.com/utk-cs340-fall22/nullTime/issues/49)

### What problems you encountered
Harrison was going to rework our game logic so that we could store and interact with game values differently. I did not have much time to work on the game moderator after he finished the logic rework. We switched to using services for storing and accessing our data and have been unable to figure out why the game-card component is not accessing the same values from the GameplayService as the other components are.

### Issues you worked on
- #13 [Game Moderator: Edit Values] (https://github.com/utk-cs340-fall22/nullTime/issues/13)
- #56 [Game Moderator: Pass values] (https://github.com/utk-cs340-fall22/nullTime/issues/56)

### Files you worked on
- src/app/game-card-component/game-card-component.html
- src/app/game-card-component/game-card-component.ts
- src/app/game-card-list-component/game-card-component-list.html
- src/app/game-card-list-component/game-card-component-list.ts
- src/app/services/gameplay-services.ts

### What you accomplished
I worked on the game moderation stage. I added buttons for each card that are supposed to assign the card to a specific team. I was successful in passing the values needed (the card's value and the team number it was being assigned to) to the GameplayService and could print it out. During this process, I improved the readability by removing a lot of redundant/unused functions that were outdated or made by other team members while trying to figure out how to use the new GameplayService.
