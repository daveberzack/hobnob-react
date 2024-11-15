import React, { useState, createContext } from 'react';

const GameContext = createContext(null);

const allCards = [];
for (let i=0; i<52; i++) allCards.push(i);

const GameProvider = ({ children }) => {

    const views = {
        HOME: 0,
        ABOUT: 1,
        OPTIONS: 2,
        INTRODUCE: 3,
        GUESS: 4,
        CHALLENGE: 5,
        FACEOFF: 6,
        WINNER: 7
    }
    const [currentView, setCurrentView] = useState(views.HOME);

    const [numberOfCardsBeforeGuessing, setNumberOfCardsBeforeGuessing] = useState(0);
    const [currentTurnPlayer, setCurrentTurnPlayer] = useState(0);
    const [currentGuessingPlayer, setCurrentGuessingPlayer] = useState(0);
    const [isFaceoff, setIsFaceoff] = useState(false);
    const [playerScores, setPlayerScores] = useState([]); //-1 means out of the game
    const [newCards, setNewCards] = useState([2,4,6,8,1,3,5,7]);
    const [namedCards, setNamedCards] = useState([]);
    const [guessedCards, setGuessedCards] = useState([]);

    function getStartingDeck(count){
        const shuffled = [...allCards].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function nextPlayer(){
        const newPlayer = (currentTurnPlayer+1) % playerScores.length;
        setCurrentGuessingPlayer(newPlayer);
        setCurrentTurnPlayer(newPlayer);
    }
    
    function incrementPlayerScore(player){
        const newPlayerScores = [...playerScores];
        newPlayerScores[player] = newPlayerScores[player]+1
        setPlayerScores(newPlayerScores);
    }

    function showHome(){
        setCurrentView(views.HOME);
    }
    function showAbout(){
        setCurrentView(views.ABOUT);
    }
    function showOptions(){
        setCurrentView(views.OPTIONS);
    }

    function startGame(numPlayers, numCards, numBeforeGuessing){
        setIsFaceoff(false);
        const scores = [];
        for (let i=0; i<numPlayers; i++) scores.push(0);
        setPlayerScores(scores);
        setNumberOfCardsBeforeGuessing(numBeforeGuessing);
        const startingCards = getStartingDeck(numCards);
        setNewCards(startingCards);
        setNamedCards([]);
        setGuessedCards([]);
        setCurrentGuessingPlayer(0);
        setCurrentTurnPlayer(0);
        setCurrentView(views.INTRODUCE);
    }

    function handleIntroduce(){
        //at random, occasionally move the first card in namedCards to the end (to slightly mix up order)
        if (namedCards.length>1 && Math.random()>.7) {
            console.log("flip top card");
            const updatedCards = namedCards;
            updatedCards.push(updatedCards.shift());
            setNamedCards(updatedCards);
        }

        //remove the first card from newCards, add it to end of namedCards
        const updatedNewCards = newCards;
        const cardToMove = updatedNewCards.shift();
        const updatedNamedCards = [...namedCards, cardToMove]
        setNewCards(updatedNewCards);
        setNamedCards(updatedNamedCards);

        //if there are enough named cards, player tries to guess. otherwise, next turn
        if (namedCards.length+guessedCards.length >= numberOfCardsBeforeGuessing){
            setCurrentView(views.GUESS);
        }
        else {
            nextPlayer();
        }
    }

    function handleGuess(isCorrect){
        //remove the first card from namedCards, add it to end of guessedCards
        const updatedNamedCards = namedCards;
        const cardToMove = updatedNamedCards.shift();
        const updatedGuessedCards = [...guessedCards, cardToMove]
        setNamedCards(updatedNamedCards);
        setGuessedCards(updatedGuessedCards);
        
        //increment successful player's score (regular or challenge), or challengers score if incorrect on challenge
        if (isCorrect) {
            incrementPlayerScore(currentGuessingPlayer);
        }
        else if (currentTurnPlayer!=currentGuessingPlayer){
            incrementPlayerScore(currentTurnPlayer);
        }

        //check for winner, or next player introduces or guesses
        nextPlayer();
        if (namedCards.length<1) {
            setCurrentView(views.WINNER);
        }
        else if (newCards.length>0) {
            setCurrentView(views.INTRODUCE);
        }
        else {
            setCurrentView(views.GUESS);
        }
    }

    function handleChallenge(player){
        setCurrentGuessingPlayer(player);
        setCurrentView(views.CHALLENGE);
    }

    return (
        <GameContext.Provider value={{
            currentTurnPlayer,
            currentGuessingPlayer, 
            playerScores,
            views,
            currentView,
            currentCardToIntroduce: newCards[0],
            currentCardToGuess: namedCards[0],
            showHome,
            showAbout,
            showOptions,
            startGame,
            handleIntroduce,
            handleGuess,
            handleChallenge,

            newCards,
            namedCards,
            guessedCards
        }}>
        {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };