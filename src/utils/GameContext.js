import React, { useState, createContext, useEffect } from 'react';
import { getStartingDeck, shuffleArray } from './CardManager';

const GameContext = createContext(null);

const allCards = [];
for (let i=1; i<827; i++) allCards.push(i);

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
    const [newCards, setNewCards] = useState([]);
    const [namedCards, setNamedCards] = useState([]);
    const [guessedCards, setGuessedCards] = useState([]);
    const [modalData, setModalData] = useState({});

    //temporarily skip start screens
    useEffect( ()=> {
        // startGame(3, 15, 8);
        // setPlayerScores([2,2,1,2]);
        // setGuessedCards([1,2,3,4,5,6,7,8]);
    },[]);

    function nextPlayer(){
        let newPlayer = currentTurnPlayer;
        do {
            newPlayer = (newPlayer+1) % playerScores.length;
        } while (playerScores[newPlayer]<0); //if player is out (score=-1) then skip to next one

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
        console.log("starting deck",startingCards);
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
            handleEndgame();
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

    function handleEndgame() {
        //get max score then set all tied to 1 and others to -1
        let maxScore=0;
        playerScores.forEach( (ps) => {
            maxScore = Math.max(ps, maxScore);
        });
        const newPlayerScores = playerScores.map( (ps) => {
            if (ps==maxScore){
                return ps;
            }
            else {
                return -1
            }
        })
        setPlayerScores(newPlayerScores);
        
        //shuffle then add a blank placeholder to guessedCards (so faceoff shows intro screen)
        let updatedGuessedCards = [...guessedCards]
        updatedGuessedCards = shuffleArray(updatedGuessedCards)
        setGuessedCards(updatedGuessedCards);

        //show faceoff... but if there's already a winner, skip to winner screen
        setIsFaceoff(true);
        nextPlayer();
        setCurrentView(views.FACEOFF);
        checkForWinner(newPlayerScores);
    }

    function handleFaceoffGuess(isCorrect){
        if (!isCorrect) {
            const newPlayerScores = [...playerScores];
            newPlayerScores[currentTurnPlayer] = -1;
            setPlayerScores(newPlayerScores);
            checkForWinner(newPlayerScores);
        }
        const newGuessedCards = [...guessedCards];
        newGuessedCards.shift();
        setGuessedCards(newGuessedCards);
        nextPlayer();
    }

    function checkForWinner(scores){
        let numberOfWinners = 0;
        scores.forEach( ps => {
            if (ps>0) numberOfWinners++;
        });
        if (numberOfWinners==1) {
            setCurrentView(views.WINNER);
        }
    }
    
console.log(newCards.length+","+namedCards.length);
    return (
        <GameContext.Provider value={{
            currentTurnPlayer,
            currentGuessingPlayer, 
            playerScores,
            views,
            currentView,
            isFaceoff,
            currentCardToIntroduce: newCards[0],
            currentCardToGuess: namedCards[0],
            currentCardForFaceoff: guessedCards[0],
            cardsRemaining: newCards.length+namedCards.length,
            showHome,
            showAbout,
            showOptions,
            startGame,
            handleIntroduce,
            handleGuess,
            handleChallenge,
            handleFaceoffGuess
        }}
        debug = {{ //just for debugging visibility
            numberOfCardsBeforeGuessing,
            newCards,
            namedCards,
            guessedCards
        }}
        >
        {children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };