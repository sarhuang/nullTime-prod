//import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { IGameCard, IGameRound, RoundState } from "src/gameHelper/interfaces";
import { RandomizeArray, ScoreTeam, StartTimer, GetRoundInstructions } from "src/gameHelper/utils";

export class GameplayService {
    private allCardsRef : IGameCard[] = []; //This holds a static reference to all cards, it should not be changed
    private cardsAtPlay: IGameCard[] = []; //This holds only the current cards at play
    private currentRound: number = 0;
    private turnMaxTime: number = 20; //How long a turn should last in seconds
    private maxRounds: number = 2; //This sets the max rounds this game should run for (0 index)
    private currentTeam: number = 1; //Either 1 or 2
    private turnTime = 0;
    private roundHistory: IGameRound[] = [];
    //Note: To be efficient, these scores don't get calculated until the game is over and are only used for display
    team1Score = 0;
    team2Score = 0;

    //These below are observables, they are efficent ways of making sure data updates at the correct time on other pages
    private _playTurn: BehaviorSubject<boolean> = new BehaviorSubject(false);
    playTurn: Observable<boolean> = this._playTurn.asObservable();
    private _currentRoundPhase: BehaviorSubject<RoundState> = new BehaviorSubject<RoundState>(RoundState.Intro);
    currentRoundPhase: Observable<RoundState> = this._currentRoundPhase.asObservable();

    constructor () {
        this.roundHistory = [];
    }

    getCardsAtPlay() {
        return this.cardsAtPlay;
    }

    getCurrentRoundObject() {
        return this.roundHistory[this.currentRound];
    }

    getCurrentRound() {
        return this.currentRound+1;
    }

    getMaxRounds() {
      return this.maxRounds+1;
    }

    getCurrentTeam() {
        return this.currentTeam;
    }

    getRemainingCards() {
        return this.cardsAtPlay.length;
    }

    getRoundInstructions() {
        return GetRoundInstructions(this.currentRound);
    }

    getAllCardsRef() {
      return this.allCardsRef;
    }

    setAllCardsRef(allCards: IGameCard[]) {
        //This is only set once at the beginning of the game
        let cards: IGameCard[] = [];
        allCards.forEach(element => {
          if (!cards.find(x => x.value == element.value)) cards.push(element);
        });
        console.log(cards);
        this.allCardsRef = cards;
        this.cardsAtPlay = cards;
    }

    gameInit() {
            console.log(this.roundHistory.length)
        this.cardsAtPlay = RandomizeArray(this.allCardsRef);
        this.roundHistory.push({
            cardsUsed: this.cardsAtPlay.map(x => x.value),
            team0ScoredCards: [],
            team1ScoredCards: [],
            team2ScoredCards: []
        })
              console.log(this.roundHistory.length)
    }

    startRound() {
      console.log(this.roundHistory.length)
        //Call this to start a new round
        this.currentRound++;

        if (this.currentRound > this.maxRounds) {
            this.calculateScores();
            this._currentRoundPhase.next(RoundState.End);
            return;
        }

        //Shuffle the cards, switch teams, and take us back to the instructions
        this.cardsAtPlay = RandomizeArray(this.allCardsRef);
        this._currentRoundPhase.next(RoundState.Intro);
        this.switchTeams();
        this.roundHistory.push({
            cardsUsed: this.cardsAtPlay.map(x => x.value),
            team0ScoredCards: [],
            team1ScoredCards: [],
            team2ScoredCards: []
        })
              console.log(this.roundHistory.length)
    }

    startTurnPhase() {
        //This starts the actual gameplay part of the game where teams guess cards
        this._playTurn.next(false);
        this._currentRoundPhase.next(RoundState.Turn);
    }

    getRoundPhase() {
        return this.currentRoundPhase;
    }

    endTurnPhase() {
        //This ends the gameplay part of the game to then take us to the moderation screen
        console.log('Ending Turn phase');
        this._currentRoundPhase.next(RoundState.Moderation);
    }

    setTimeRemaining(time: number) {
        this.turnTime = time;
    }

    getTimeRemaining() {
        return this.turnTime;
    }

    isPlayingTurn() {
        return this.playTurn;
    }

    switchTeams() {
        if (this.currentTeam == 1) this.currentTeam = 2;
        else this.currentTeam = 1;
    }

    clearCardList() {
        this.allCardsRef = [];
        this.cardsAtPlay = [];
    }

    cardGuessedCallback(card: IGameCard) {
        console.log('Card Guessed');
        if (this.currentTeam == 1) {
            this.roundHistory[this.currentRound].team1ScoredCards.push(card.value);
        } else {
            this.roundHistory[this.currentRound].team2ScoredCards.push(card.value);
        }
    }

    outOfCardsCallback() {
        console.log('Out of Cards Callback');
        this.endTurnPhase();
    }

    startTurn() {
      console.log(this.roundHistory.length)
        //This starts a new turn within the gameplay part of the round
        let timeDelta = this.turnMaxTime;
        this.turnMaxTime = this.turnMaxTime;
        this.setTimeRemaining(this.turnMaxTime);
        this._playTurn.next(true);
        console.log('Turn started');
        let inter = setInterval(function(service) {
            timeDelta--;
            service.setTimeRemaining(timeDelta);
            if (service.getRemainingCards() == 0) {
                //Quietly exit if we have already guessed all the cards
                console.log('Remaining cards is 0')
                clearInterval(inter);
            } else if (timeDelta <= 0) {
                clearInterval(inter);
                service.playEndBuzzer();
                service.endTurn();
            }
        }, 1000, this);
    }

    playEndBuzzer() {
        const audio = new Audio();
        audio.src = "../assets/music/TimeUpBuzzer.mp3";
        audio.load();
        audio.play();
    }

    endTurn() {
        //If there are no more cards, start the next round, otherwise just switch teams and do another turn
        console.log('Ending Turn');
        if (this.cardsAtPlay.length > 0) {
            //TODO: Show modal that says "End of the round!"
            this.switchTeams();
            this._playTurn.next(false);
        }
    }

    setTeamCallback(team: number, card: IGameCard|null) {
      console.log(this.roundHistory.length)
      var index;
      if(card != null){
          console.log('card is not null')

          index = this.roundHistory[this.currentRound].team0ScoredCards.indexOf(card.value)
          if(index != -1){
              console.log('card belonged to')
              console.log(0)
              this.roundHistory[this.currentRound].team0ScoredCards.splice(index, 1)
          }

          index = this.roundHistory[this.currentRound].team1ScoredCards.indexOf(card.value)
          if(index != -1){
              console.log('card belonged to')
              console.log(1)
              this.roundHistory[this.currentRound].team1ScoredCards.splice(index, 1)
          }

          index = this.roundHistory[this.currentRound].team2ScoredCards.indexOf(card.value)
          if(index != -1){
              console.log('card belonged to')
              console.log(2)
              this.roundHistory[this.currentRound].team2ScoredCards.splice(index, 1)
          }
          if(team === 0){
              this.roundHistory[this.currentRound].team0ScoredCards.push(card.value)
          }
          if(team === 1){
              this.roundHistory[this.currentRound].team1ScoredCards.push(card.value)
          }
          if(team === 2){
              this.roundHistory[this.currentRound].team2ScoredCards.push(card.value)
          }
      }
    }

    getTeam1Score = () => {
        return ScoreTeam(this.roundHistory, 1);
    }

    getTeam2Score = () => {
        return ScoreTeam(this.roundHistory, 2);
    }

    calculateScores() {
        this.team1Score = this.getTeam1Score();
        this.team2Score = this.getTeam2Score();
    }
}
