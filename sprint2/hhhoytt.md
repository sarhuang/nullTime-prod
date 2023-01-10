# Sprint 2

Name: Harrison Hoytt
Github ID: hhhoytt
Group Name: nullTime

### What you planned to do
- #15 [Game Card List: Enhancements](https://github.com/utk-cs340-fall22/nullTime/issues/15)
- #35 [Game Card List: Cycling through cards](https://github.com/utk-cs340-fall22/nullTime/issues/35)
- #16 [Game State Manager: Helper Functions](https://github.com/utk-cs340-fall22/nullTime/issues/16)

### What you did not do
- #16 [Game State Manager: Helper Functions](https://github.com/utk-cs340-fall22/nullTime/issues/16)

### What problems you encountered
No real issues, there was a small merging issue when the card list enhancements merged with the lobby page but it was resolved with no issue

### Issues you worked on
- #15 [Game Card List: Enhancements](https://github.com/utk-cs340-fall22/nullTime/issues/15)
- #35 [Game Card List: Cycling through cards](https://github.com/utk-cs340-fall22/nullTime/issues/35)

### Files you worked on
src/app/game-card
src/app/game-card-list
src/gameHelper/utils.ts

### What you accomplished
I made some major improvements to the card list component that allows it to be used for the game along with it being more general purpose.
For some of the improvements, we can disable adding/editing cards, can display them in a list or stacked view, and a way to get a card count.
I then added the ability to "Succeed" or "Fail" on a card and go through remaining cards in the list. This will be a core part of the game.
I also added helper utilities that allow us to generate random lists of cards on demand, which streamlines testing.