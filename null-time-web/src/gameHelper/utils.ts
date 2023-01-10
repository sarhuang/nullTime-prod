import { IGameCard, IGameRound } from "./interfaces";

const testCardValues = [
    'Harrison',
    'Sarah',
    'Bear',
    'Kuba',
    'Ryland',
    'Min Kao',
    'Tea',
    'iPhone',
    'Table',
    'Window',
    'Printer',
    'Truist',
    'Worlds Fair',
    'Paper',
    'Chair',
    'Whiteboard',
]

const instructions = [
    'During this round, the player with the card deck can use as many words as they want to describe the word on the card.',
    'During this round, the player with the card deck can only use one word to describe the word on the card.',
    'During this round, the player with the card deck can only use hand motions and acting to describe the word on the card.'
]

export const GetRoundInstructions = (roundIndex: number): string => {
    if (roundIndex > 2) return '';
    return instructions[roundIndex];
}

export const GetRandomCardVal = (): string => {
    return testCardValues[Math.floor(Math.random() * testCardValues.length)];
}

export const GetRandomCard = (): IGameCard => {
    return {
        value: GetRandomCardVal(),
        owner: 0
    }
}

export const RandomizeArray = (arrayCopy: any[]) => {
    //Stolen from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const array = [...arrayCopy];
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const StartTimer = async (time: number, callback: () => void) => {
    await new Promise(resolve => setTimeout(resolve, time*1000));
    callback();
}

export const ScoreTeam = (rounds: IGameRound[], team: number) => {
    let score = 0;
    rounds.forEach(x => {
        if (team == 1) {
            score += x.team1ScoredCards.length;
        } else {
            score += x.team2ScoredCards.length;
        }
    });
    return score;
}
