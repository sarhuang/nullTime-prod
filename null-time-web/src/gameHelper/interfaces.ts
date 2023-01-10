enum CardOwner {
    NONE,
    TEAM1,
    TEAM2
}

export enum RoundState {
    Intro,
    Turn,
    Moderation,
    End
}

export interface IGameCard {
    owner: CardOwner, //Whoever owns the card is who gets the score for the card
    value: string
}

export interface IGameRound {
    cardsUsed: string[],
    team0ScoredCards: string[],
    team1ScoredCards: string[],
    team2ScoredCards: string[]
}
