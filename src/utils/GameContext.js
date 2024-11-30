import React, { useState, createContext, useEffect } from 'react';
import { getStartingDeck, shuffleArray } from './CardManager';

const GameContext = createContext(null);

// const allCards = [];
// for (let i=1; i<827; i++) allCards.push(i);

const GameProvider = ({ children }) => {

    const GUESS_TIME_LIMIT = 40;
    const CHALLENGE_TIME_LIMIT = 20;
    const FACEOFF_TIME_LIMIT = 5;
    
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

    const modals = {
        CHALLENGE_SELECT: {
            title:"Nudge, Nudge",
            content:<>
                <p>Choose a player by tapping on their tab</p>
            </>,
            isInactive:true
        },
        DECK_COUNTER: {
            title:"Cards Remaining",
            content:<>
                <p>This shows how many cards are left in the game.</p>
                <p>It counts down every time a character reappears for you to remember.</p>
            </>,
            buttonText:"OK",
            verticalOffset:"-80px"
        },
        PHASE_1: {
            title:"Meet & Greet",
            content:<>
                <p>Let's make some friends! On your turn, introduce a new character by making up a name and a fun fact about them. Get creative, be funny, but don't make it impossible to remember.</p>
                <p>Everyone should try to remember these characters to score points later. Repeat them to yourself. Make up silly or visual mnemonics. Whatever works for you. Practicing this powerful social skill is what it's all about!</p>
            </>,
            buttonText:"OK",
            isFullScreen:true
        },
        PHASE_2: {
            title:"Mix & Mingle",
            content:<>
                <p>Look, our new friends are coming around again! We'll still introduce some new friends, but on your turn, you also get one try to recall an earlier character to earn a point. Click on <b>Right</b> or <b>Wrong</b> to score your response, and I'll keep the tally in your <b>Player Tab</b>.</p>
                <p>Alternately, you can <b>Nudge</b> another player to give them a chance. If they can recall the character, they get a point. If they can't, then you get a point after all. It's a bit of a gamble, so choose wisely.</p>
                <p>Oh, and I'm giving you a <b>timer</b>. Decide together if you will use that strictly, or as a suggestion, or ignore it completely.</p>
            </>,
            buttonText:"OK",
            isFullScreen:true,
            callback: ()=> {resetTimer(GUESS_TIME_LIMIT);}
        },
        PHASE_3: {
            title:"Winding Down",
            content:<>
                <p>That's it! No more new characters. Just take turns recalling the rest of the friends we introduced. The <b>Countdown</b> beside the player tabs tracks how many are left.</p>
                <p>Once we've seen all our characters, the player with most points wins. If it's a tie, they'll go to a final <b>Face-Off</b> round.</p>
                <p>I hope it is. That's my favorite part.</p>
            </>,
            buttonText:"OK",
            isFullScreen:true,
            callback: ()=> {resetTimer(GUESS_TIME_LIMIT);}
        },
        PHASE_4: {
            title:"Face-Off Round!",
            content:<>
                <p>All the players with the highest score now compete in a single elimination tie-breaker.</p>
                <p>On your turn, you have just 5 seconds to recall a character's name and fun fact. If you get it wrong, you're out.</p>
                <p>The last player remaining is the winner, and gets the grand prize: a randomly generated trophy to celebrate your fabulous performance.</p>
            </>,
            buttonText:"OK",
            isFullScreen:true,
            callback: ()=> {resetTimer(FACEOFF_TIME_LIMIT);}
        }
    }

    const [currentView, setCurrentView] = useState(views.HOME);
    const [numberOfCardsBeforeGuessing, setNumberOfCardsBeforeGuessing] = useState(0);
    const [currentTurnPlayer, setCurrentTurnPlayer] = useState(0);
    const [currentGuessingPlayer, setCurrentGuessingPlayer] = useState(0);
    const [playerScores, setPlayerScores] = useState([]); //-1 means out of the game
    const [newCards, setNewCards] = useState([]);
    const [namedCards, setNamedCards] = useState([]);
    const [guessedCards, setGuessedCards] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [timer, setTimer] = useState(0);
    const [timerId, setTimerId] = useState(0);
    const [phase, setPhase] = useState(0);

    useEffect( ()=> { //this will show the appropriate model when we move to a new phase
        if (phase==1) setModalData(modals.PHASE_1);
        if (phase==2) setModalData(modals.PHASE_2);
        if (phase==3) setModalData(modals.PHASE_3);
        if (phase==4) setModalData(modals.PHASE_4);
    },[phase]);

    function nextPlayer(scores){ //can pass in scores to override delayed state
        if (!scores) scores = playerScores;

        let newPlayer = currentTurnPlayer;
        do {
            newPlayer = (newPlayer+1) % scores.length;
        } while (scores[newPlayer]<0); //if player is out (score=-1) then skip to next one

        setCurrentGuessingPlayer(newPlayer);
        setCurrentTurnPlayer(newPlayer);
    }
    
    function incrementPlayerScore(player){
        const newPlayerScores = [...playerScores];
        newPlayerScores[player] = newPlayerScores[player]+1
        setPlayerScores(newPlayerScores);
        return newPlayerScores;
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
        setPhase(1);

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
            setPhase(2);
            showGuess();
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
        let playerScoresNow = playerScores;  //to avoid using useEffect and dealing with idempotence, just provide the playerScores directly
        if (isCorrect) {
            playerScoresNow = incrementPlayerScore(currentGuessingPlayer);
        }
        else if (currentTurnPlayer!==currentGuessingPlayer){
            playerScoresNow = incrementPlayerScore(currentTurnPlayer);
        }

        //check for winner, or next player introduces or guesses
        nextPlayer();
        if (namedCards.length<1) {
            handleEndgame(playerScoresNow);
        }
        else if (newCards.length>0) {
            setCurrentView(views.INTRODUCE);
        }
        else {
            setPhase(3);
            showGuess()
        }
    }

    function showGuess(){
        resetTimer(GUESS_TIME_LIMIT);
        setCurrentView(views.GUESS);
    }

    function handleChallenge(player){
        setCurrentGuessingPlayer(player);
        setCurrentView(views.CHALLENGE);
        resetTimer(CHALLENGE_TIME_LIMIT);
    }

    function handleEndgame(playerScoresNow) {
        //get max score then set all tied to 1 and others to -1
        let maxScore=0;
        playerScoresNow?.forEach( (ps) => {
            maxScore = Math.max(ps, maxScore);
        });
        const newPlayerScores = playerScoresNow.map( (ps) => {
            if (ps===maxScore){
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

        //if there's a single winner show winner screen
        const isSingleWinner = checkForWinner(newPlayerScores);
        if (!isSingleWinner) startFaceoff(newPlayerScores);
        
    }

    function startFaceoff(newPlayerScores){
        setPhase(4);
        setCurrentView(views.FACEOFF);
        nextPlayer(newPlayerScores);
    }

    function handleFaceoffGuess(isCorrect){
        
        const newPlayerScores = [...playerScores];
        if (!isCorrect) {
            newPlayerScores[currentTurnPlayer] = -1;
            setPlayerScores(newPlayerScores);
        }
        checkForWinner(newPlayerScores);
        const newGuessedCards = [...guessedCards];
        newGuessedCards.shift();
        setGuessedCards(newGuessedCards);
        nextPlayer();
        resetTimer(FACEOFF_TIME_LIMIT);
    }

    function resetTimer(seconds){
        clearInterval(timerId);

        const tick = 20;
        const max = seconds*1000;
        let timerValue = 0;
        const newTimerId = setInterval(()=>{
            timerValue += tick/max;
            setTimer(timerValue);
            if (timerValue>=1) {
                clearInterval(newTimerId);
            }
        },tick);
        setTimerId(newTimerId);
    }

    function checkForWinner(scores){
        let numberOfWinners = 0;
        scores.forEach( ps => {
            if (ps>0) numberOfWinners++;
        });
        if (numberOfWinners===1 || guessedCards.length<=1) {
            setCurrentView(views.WINNER);
            return true;
        }
        return false;
    }
    
    return (
        <GameContext.Provider value={{
            currentTurnPlayer,
            currentGuessingPlayer, 
            playerScores,
            views,
            modals,
            modalData,
            currentView,
            phase,
            currentCardToIntroduce: newCards[0],
            currentCardToGuess: namedCards[0],
            currentCardForFaceoff: guessedCards[0],
            cardsRemaining: newCards.length+namedCards.length,
            timer,
            showHome,
            showAbout,
            showOptions,
            startGame,
            handleIntroduce,
            handleGuess,
            handleChallenge,
            handleFaceoffGuess,
            setModalData
        }}

        debug = {{ //just for debugging visibility
            numberOfCardsBeforeGuessing,
            newCards,
            namedCards,
            guessedCards
        }}

        >{children}</GameContext.Provider>
    );
}

export { GameContext, GameProvider };