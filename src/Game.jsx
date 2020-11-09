import React, { useState, useEffect } from 'react';
import IconButton from './components/IconButton';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import PlayerDisplay from './components/PlayerDisplay';
import { calcBotMove } from './util/Bot';
import { tinyWait, shortWait, mediumWait, mockNames, longWait, WIDESCREEN_SIZE, SUPER_WIDESCREEN_SIZE } from './util/Defaults';
import { randomInt } from './util/Helper';

import useSound from 'use-sound';
import { Sounds, Notes } from './util/Sounds'
import { Modal } from './components/Modal'
import Button from './components/Button';
import { faSmileBeam, faSadCry } from '@fortawesome/free-solid-svg-icons';
import UserInterface from './components/UserInterface';

const randomName = () => {
  const int = randomInt(mockNames.length);
  return mockNames[int];
}

const colorsArray = [
  Styles.colors.purple,
  Styles.colors.orange,
  Styles.colors.blue,
  Styles.colors.pink,
  Styles.colors.orange,
  Styles.colors.blue,
]

const EmptyCell = Styled.div`
  display: grid;
  width: 100%;
  opacity: 0;
  height: 100%;
`

const Wrapper = Styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 24px auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: start;
  margin: 8px 0;

  ${props => props.screenSize === 'medium' && `
    height: 100vh;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    justify-content: center;
    margin: 0;
  `}

  ${props => props.screenSize === 'medium' && props.isLeftHanded && `
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    margin: 0;
    justify-content: center;
  `}

  ${props => props.screenSize === 'large' && `
    height: 100vh;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    justify-content: center;
    margin: 0;
  `}

  ${props => props.screenSize === 'large' && props.isLeftHanded && `
    height: 100vh;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    justify-content: center;
    margin: 0;
  `}
  `

const GameGrid = Styled.div`
  grid-gap: 4px;
  display: grid;
  justify-items: center;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  justify-self: center;
  align-self: start;

  ${props => props.screenSize === 'large'&& `
    align-self: center;
  `}
`



const GamePage = ({ settings, onEnd }) => {
  const [players, setPlayers] = useState([]);
  const [turns, setTurns] = useState([]);
  const [log, setLog] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [defaultAmount, setDefaultAmount] = useState(1);
  const [defaultFv, setDefaultFv] = useState(1);
  const [isChallenge, setIsChallenge] = useState(false);
  const [shouldRestart, setShouldRestart] = useState(true);
  const [waitingForTurn, setWaitingForTurn] = useState(false);
  const [screenSize, setScreenSize] = useState('medium');
  const [isPaused, setIsPaused] = useState(false);
  const [isLeftHanded, setIsLeftHanded] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isShowingModalButton, setIsShowingModalButton] = useState(false);



  //Sound Hooks
  const [globalVolume, setGlobalVolume] = useState(1.0);
  const [turnPitch, setTurnPitch] = useState(1);
  const [playRerollSound] = useSound(Sounds.reroll, { volume: globalVolume });
  const [playChallengeSound] = useSound(Sounds.challenge, { volume: globalVolume });
  const [playNextRoundSound] = useSound(Sounds.nextRound, { volume: globalVolume });
  const [playNextTurnSound] = useSound(Sounds.nextTurn, { volume: globalVolume, playbackRate: turnPitch });
  const [playLoseDiceSound] = useSound(Sounds.loseDice, { volume: globalVolume });
  const [playErrorSound] = useSound(Sounds.errorSound, { volume: globalVolume });
  const [playClickDiceSound] = useSound(Sounds.clickUI, { volume: globalVolume });

  const [playNote0] = useSound(Notes[0], { volume: globalVolume });
  const [playNote1] = useSound(Notes[1], { volume: globalVolume });
  const [playNote2] = useSound(Notes[2], { volume: globalVolume });
  const [playNote3] = useSound(Notes[3], { volume: globalVolume });
  const [playNote4] = useSound(Notes[4], { volume: globalVolume });
  const [playNote5] = useSound(Notes[5], { volume: globalVolume });
  const [playNote6] = useSound(Notes[6], { volume: globalVolume });

  useEffect(() => {
    if (waitingForTurn) {
      const nextPlayer = turns[turns.length - 1].nextPlayer;
      if (nextPlayer.id !== 1) {
        calcBotTurn();
      }
      setWaitingForTurn(false);
    }

  }, [waitingForTurn]);

  useEffect(() => {
    const calcSize = (width) =>{
      if (width > SUPER_WIDESCREEN_SIZE) {
        console.log('large!')
        setScreenSize('large')
      } else if (width > WIDESCREEN_SIZE) {
        setScreenSize('medium')
        console.log('medium!')
      } else {
        setScreenSize('small')
        console.log('small!')
      }
    }
    const handleResize = (e) => {
      let width = e.currentTarget.innerWidth;
      calcSize(width);
    }
    window.addEventListener('resize', handleResize);
    function getWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    }
    let width = getWidth();
    calcSize(width);
  }, [])

  useEffect(() => {
    const restartGame = async () => {
      setIsShowingModal(false);
      setIsWin(false);
      setIsChallenge(false);
      rerollDice(true);
      const initialTurn = {
        number: 0,
        amount: 0,
        fv: 0,
        player: { id: 0 },
        nextPlayer: players[0],
      }
      setTurns([initialTurn]);
      setLog([]);
      setShouldRestart(false);
      await printLog('Starting a new game');
    }

    if (shouldRestart) {
      restartGame(settings);
    }
  }, [shouldRestart])

  useEffect(() => {
    const generatePlayers = () => {
      const newPlayers = [];
      for (let i = 0; i < settings.amountOfPlayers; i++) {
        let hand = [];

        let newHandSize = parseInt(settings.handSize);
        let isVisible = false;

        //If it's you
        if (i == 0) {
          isVisible = true;
          newHandSize = newHandSize + parseInt(settings.handicap);
        } else {
          if (settings.randomMode) {
            let rand = randomInt(settings.randomVariance)
            newHandSize = newHandSize + rand;
          }
        }

        for (let k = 0; k < newHandSize; k++) {
          const newFv = randomInt(6) + 1;

          const diceObj = {
            fv: newFv,
            visible: isVisible,
            disabled: false,
            highlight: false,
            hasArrow: false,
            found: false,
            highlightColor: Styles.colors.green,
          }
          hand.push(diceObj);
        }

        newPlayers.push({
          name: (i == 0) ? settings.name : randomName(),
          id: i + 1,
          hand: hand,
          color: colorsArray[i],
        })
      }

      return newPlayers;
    }

    const startGame = async () => {
      const newPlayers = generatePlayers();
      setIsShowingModal(false);
      setIsWin(false);
      setIsChallenge(false);
      setPlayers(newPlayers)

      const initialTurn = {
        number: 0,
        amount: 0,
        fv: 0,
        player: { id: 0 },
        nextPlayer: newPlayers[0],
      }
      setTurns([initialTurn]);
      setLog([]);
      setShouldRestart(false);
      await printLog('Starting a new game');
    }

    startGame(settings);
  }, [settings])

  const printLog = (value, fv, amount, value2) => {
    setLog(log => [...log, { value: value, fv: fv, amount: amount, value2: value2 }]);
  }

  const nextRound = async (currentPlayer) => {
    let nextPlayer = currentPlayer;
    if (checkOutOfDice(currentPlayer.hand)) {
      nextPlayer = calcNextPlayer(currentPlayer);
    }
    setIsChallenge(false);

    const winner = checkWinner();
    if (winner !== undefined) {
      await printLog(`${winner.name} won the game!`);
      setIsWin(true);
      await timeout(longWait)
      playNextRoundSound();
      setIsShowingModal(true);

    } else {
      const newTurn = {
        number: 0,
        amount: 0,
        fv: 0,
        player: { id: 0 },
        nextPlayer: nextPlayer,
      }
      setTurns([newTurn]);
      rerollDice();
      setWaitingForTurn(true);
      await printLog("");
      await printLog("");
      await printLog("Starting a new round");
      await timeout(longWait);
      // setLog([]);
    }
  }

  const checkWinner = () => {
    let amountOfPlayersLeft = 0;
    let winner = undefined;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (checkOutOfDice(player.hand) === false) {
        winner = player;
        amountOfPlayersLeft++;
      }
    }
    return (amountOfPlayersLeft === 1 ? winner : undefined);
  }

  const calcNextPlayer = (currentPlayer) => {
    let playerIndex = currentPlayer.id;
    if (playerIndex >= players.length) {
      playerIndex = 0;
    }
    let nextPlayer = players[playerIndex];

    let isOut = checkOutOfDice(nextPlayer.hand);

    while (isOut === true) {
      playerIndex = playerIndex + 1;
      if (playerIndex >= players.length) {
        playerIndex = 0;
      }
      nextPlayer = players[playerIndex];
      isOut = checkOutOfDice(nextPlayer.hand);
    }

    return nextPlayer;
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const calcBotTurn = async () => {
    const nextPlayer = turns[turns.length - 1].nextPlayer;
    const bet = calcBotMove(turns, amountOfActiveDice(), nextPlayer);
    await timeout(bet.timeout);
    submitBet(bet.amount, bet.fv, nextPlayer);
  }

  const isValidBet = (amount, fv) => {
    const currentTurn = turns[turns.length - 1];
    if (amount === -1 && fv === -1) {
      return true;
    }

    if (amount < currentTurn.amount) {
      return false;
    }

    if (amount === currentTurn.amount) {
      if (fv <= currentTurn.fv) {
        return false;
      }
    }

    return true;
  }

  const checkIsLying = async () => {
    const currentTurn = turns[turns.length - 1];
    const fv = currentTurn.fv;
    const amount = currentTurn.amount;

    let amntFound = 0;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.hand.forEach((dice) => {
        if (dice.fv === fv && dice.disabled === false) {
          amntFound++;
        }
      })
    }

    await printLog(`Found `, fv, amntFound, 's');

    if (amntFound >= amount) {
      await printLog(`It was the truth!`);
      return false;
    } else {
      await printLog(`It was a lie!`);
      return true;
    }
  }

  const playNextNote = (num, isChord) => {
    switch (num) {
      case 0:
        playNote0();
        break;
      case 1:
        playNote1();
        break;
      case 2:
        playNote2();
        if (isChord) {
          playNote0();
        }
        break;
      case 3:
        playNote3();
        if (isChord) {
          playNote1();
        }
        break;
      case 4:
        playNote4();
        if (isChord) {
          playNote2();
        }
        break;
      case 5:
        playNote5();
        if (isChord) {
          playNote3();
        }
        break;
      case 6:
        playNote6();
        if (isChord) {
          playNote4();
        }
        break;
      default:
        playNote6();
        if (isChord) {
          playNote4();
        }
        break;
    }
  }

  const rerollDice = (enabled) => {
    playRerollSound();
    const playersArray = [...players];
    const newPlayers = [];

    playersArray.forEach((player) => {
      const newHand = player.hand.map((dice) => {
        const newFv = randomInt(6) + 1;
        let visible = false;

        return {
          fv: newFv,
          visible: visible,
          disabled: enabled ? false : dice.disabled,
          highlight: false,
          highlightColor: Styles.colors.red,
          hasArrow: false,
          found: false,
        }
      })

      let playerClone = Object.assign({}, player);
      playerClone.hand = newHand;
      newPlayers.push(playerClone);
    })

    setPlayers(newPlayers);
  }

  const nextTurn = async (amount, fv, currentPlayer) => {
    const currentTurn = turns[turns.length - 1];
    playNextTurnSound();
    const nextPlayer = calcNextPlayer(currentPlayer);
    const newTurnNumber = currentTurn.number + 1;
    timeout(mediumWait);
    setDefaultAmount(amount)

    const newTurn = {
      number: newTurnNumber,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    await printLog(`${newTurn.player.name}: `, newTurn.fv, newTurn.amount);
    setTurns(turns => [...turns, newTurn]);
    setWaitingForTurn(true);
    timeout(mediumWait);
  }

  const handleClickSettings = () => {
    onEnd();
  }

  const handleRestartGame = () => {
    setShouldRestart(true);
  }

  const handleMute = () => {
    if (globalVolume < 1) {
      setGlobalVolume(1);
    } else {
      setGlobalVolume(0);
    }
  }

  const handleClickSubmit = async (amount, fv) => {
    if (isValidBet(amount, fv)) {
      submitBet(amount, fv, players[0]);
    } else {
      playErrorSound();
    }
  }

  const checkOutOfDice = (hand) => {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].disabled === false) {
        return false;
      }
    }

    return true;
  }

  const amountOfActiveDice = () => {
    let amount = 0;
    for (let i = 0; i < players.length; i++) {
      let hand = players[i].hand;

      for (let k = 0; k < hand.length; k++) {
        if (hand[k].disabled === false) {
          amount++;
        }
      }
    }

    return amount;
  }

  const resetHighlight = (playersArray) => {
    for (let i = 0; i < playersArray.length; i++) {
      let hand = playersArray[i].hand;
      for (let k = 0; k < hand.length; k++) {
        hand[k].hasArrow = false;
        hand[k].highlight = false;
        hand[k].highlightColor = Styles.colors.red;
      }
    }
  }


  const highlightLoser = (hand) => {
    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].disabled === false) {
        hand[i].highlight = true;
        hand[i].hasArrow = true;
        hand[i].highlightColor = Styles.colors.red;
        return;
      }
    }
  }

  const disableDice = (hand) => {
    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].disabled === false) {
        hand[i].highlight = false;
        hand[i].disabled = true;
        return;
      }
    }
  }

  const loopBack = async (ms) => {
    await timeout(ms);
    await revealNextDice();
  }

  const revealNextDice = async () => {
    const currentTurn = turns[turns.length - 1];
    const fv = currentTurn.fv;
    const amount = currentTurn.amount;
    const playersArray = [...players];
    let foundInvisible = false;

    for (let i = 0; i < playersArray.length; i++) {
      const player = playersArray[i];
      let hand = [...player.hand];

      for (let y = 0; y < hand.length; y++) {
        if (hand[y].disabled === false && hand[y].visible === false) {
          hand[y].visible = true;
          hand[y].hasArrow = true;

          if (y > 0) {
            hand[y - 1].hasArrow = false;
          } else {
            if (i > 0) {
              const handToUpdate = playersArray[i - 1].hand;
              handToUpdate.forEach((dice) => {
                dice.hasArrow = false;
              })
            }
          }

          foundInvisible = true;
          //TODO: make this immutable
          player.hand = hand;

          const isLyingFv = (hand[y].fv === fv);

          if (isLyingFv) {
            hand[y].highlight = true;
            hand[y].found = true;
          }

          const amountFound = calcAmountFound();

          if (amountFound >= amount) {
            for (let z = 0; z < playersArray.length; z++) {
              let playerHand = playersArray[z].hand;
              for (let p = 0; p < playerHand.length; p++) {
                playerHand[p].highlightColor = Styles.colors.green;
              }
            }
          }

          setPlayers(playersArray);

          if (isLyingFv) {
            let isEnough = (amountFound >= amount);
            playNextNote(amountFound - 1, isEnough);
          }


          const isBotChallenge = (currentTurn.player.id !== 1 && currentTurn.nextPlayer.id !== 1)
          let loopBackTime = tinyWait;

          if (isLyingFv) {
            loopBackTime = loopBackTime * 2;
          }

          if (isBotChallenge) {
            loopBackTime = tinyWait;
          }
          loopBackTime = Math.floor(loopBackTime);

          await loopBack(loopBackTime);
        }

      }
    }

    if (foundInvisible === false) {
      await endChallenge();
    }
  }

  const hidePlayerDice = () => {
    const player = players[0];
    const hand = player.hand;
    for (let i = 0; i < hand.length; i++) {
      hand[i].visible = false;
    }
  }

  const startChallenge = async () => {
    playChallengeSound();
    setIsChallenge(true);
    const currentTurn = turns[turns.length - 1];
    const nextPlayer = currentTurn.nextPlayer;
    await printLog(`${nextPlayer.name}: That's bull!!`);
    hidePlayerDice();
    await timeout(longWait);
    await revealNextDice();
  }

  const endChallenge = async () => {
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    const playersArray = [...players];
    let lyingPlayer = playersArray[nextPlayer.id - 1];

    const isLying = await checkIsLying();
    await timeout(longWait)

    if (isLying === true) {
      lyingPlayer = playersArray[player.id - 1];
    }

    await timeout(longWait);
    resetHighlight(playersArray);
    setPlayers(playersArray);
    await timeout(shortWait);
    highlightLoser(lyingPlayer.hand);
    setPlayers(playersArray);
    await timeout(shortWait);
    disableDice(lyingPlayer.hand);
    setPlayers(playersArray);
    await printLog(`${lyingPlayer.name} lost a dice.`);
    playLoseDiceSound();

    if (checkOutOfDice(lyingPlayer.hand)) {
      await printLog(`${lyingPlayer.name} is out of the game.`);
      await timeout(mediumWait);
      if (lyingPlayer.id === 1) {
        await timeout(longWait);
        playErrorSound();
        setIsShowingModal(true);
        return;
      }
    }
    await timeout(longWait);
    await nextRound(lyingPlayer);
  }

  const submitBet = async (amount, fv) => {
    const isCall = (amount === -1 && fv === -1);
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;

    if (isCall) {
      startChallenge();
    } else {
      await nextTurn(amount, fv, nextPlayer);
    }
  }

  const handleClickDice = (fv) => {
    if (fv !== defaultFv) {
      playClickDiceSound();
      setDefaultFv(fv)
    }
  }

  const calcRemainingPlayers = () => {
    let amountOfPlayersLeft = 0;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (checkOutOfDice(player.hand) === false) {
        amountOfPlayersLeft++;
      }
    }

    return amountOfPlayersLeft;
  }

  const renderedPlayer = (playerNumber) => {
    const currentTurn = turns[turns.length - 1];
    let turnToShow = currentTurn;

    const player = players[playerNumber - 1];
    if (player === undefined) {
      return null;
    } else {
      let opacity = 1;
      const isActive = (player.id === currentTurn.nextPlayer.id);
      const remainingPlayers = calcRemainingPlayers();
      let isSecondary = false;
      let isTertiary = false;
      let isQuad = false;

      if (turns.length > 1) {
        const prevTurn = turns[turns.length - 2];
        isSecondary = (player.id === currentTurn.player.id);

        if (isSecondary) {
          turnToShow = currentTurn;
        }
        if (turns.length > 2 && !isChallenge && remainingPlayers > 2) {
          isTertiary = (player.id === prevTurn.player.id);
          if (isTertiary) {
            turnToShow = prevTurn;
          }
          if (turns.length > 3 && !isChallenge && remainingPlayers > 3) {
            const prevTurn = turns[turns.length - 3];

            isQuad = (player.id === prevTurn.player.id);
            if (isQuad) {
              turnToShow = prevTurn;
            }
          }
        }
      }

      const isShowingTurn = (isSecondary || isTertiary || isQuad);
      const isShowingChallenge = (isChallenge && (player.id === currentTurn.player.id | player.id === currentTurn.nextPlayer.id))

      return (
        <PlayerDisplay
          onClickDice={handleClickDice}
          isChallenge={isShowingChallenge}
          key={`playerDisplay${playerNumber}`}
          turn={turnToShow}
          turnOpacity={opacity}
          showTurn={isShowingTurn}
          isActive={isActive}
          player={player}>
        </PlayerDisplay>
      )
    };
  }

  const calcAmountFound = () => {
    let amountFound = 0;
    for (let i = 0; i < players.length; i++) {
      let hand = players[i].hand;

      for (let k = 0; k < hand.length; k++) {
        if (hand[k].found === true) {
          amountFound++;
        }
      }
    }

    return amountFound;
  }

  const renderCells = () => {
    const amountOfPlayers = players.length;
    const renderedCells = [];
    const currentTurn = turns[turns.length - 1];

    const emptyCell = (i) => {
      return <EmptyCell key={`emptyCell${i}`}></EmptyCell>
    }

    switch (amountOfPlayers) {
      case 1:
        break;
      default:
        break;
      case 2:
        renderedCells.push(emptyCell(1));
        renderedCells.push(emptyCell(2));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedPlayer(1));
        break;
      case 3:
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedPlayer(3));

        renderedCells.push(emptyCell(1));
        renderedCells.push(renderedPlayer(1));
        break;
      case 4:
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(renderedPlayer(4));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedPlayer(1));
        break;
      case 5:
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(renderedPlayer(4));

        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedPlayer(5));

        renderedCells.push(emptyCell(1));
        renderedCells.push(renderedPlayer(1));
        break;
      case 6:
        renderedCells.push(renderedPlayer(4));
        renderedCells.push(renderedPlayer(5));

        renderedCells.push(renderedPlayer(3));
        renderedCells.push(renderedPlayer(6));

        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedPlayer(1));
        break;
    }

    return renderedCells;
  }

  const renderUI = () => {
    if (turns.length < 1) {
      return;
    }
    return <UserInterface 
      defaultAmount={defaultAmount}
      defaultFv={defaultFv}
      currentTurn={turns[turns.length -1]}
      screenSize={screenSize}
      onClickDice={handleClickDice}
      log={log}
      isLeftHanded={isLeftHanded}
      isChallenge={isChallenge}
      onSubmit={handleClickSubmit}
      isShowingModalButton={isShowingModalButton}
      onShowModal={handleShowModal}
      globalVolume={globalVolume}
      onMute={handleMute}
      onSwitchView={handleSwitchView}
    ></UserInterface>
  }

  const handleSwitchView = () => {
    if (isLeftHanded) {
      setIsLeftHanded(false);
    } else {
      setIsLeftHanded(true);
    }
  }

  const handlePause = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }

  const renderLeftHandedGame = () => {
    const isSmall = (screenSize === "small")

    return (
      <Wrapper screenSize={screenSize} isLeftHanded={isLeftHanded}>
        {!isSmall && renderUI()}
        {!isSmall && <div></div>}
        <GameGrid screenSize={screenSize}>
          {renderCells()}
        </GameGrid>
        {isSmall && <div></div>}
        {isSmall && renderUI()}
      </Wrapper>
    )
  }

  const renderGame = () => {
    return (
      <Wrapper screenSize={screenSize}>
        {renderedModal(isWin)}
        <GameGrid screenSize={screenSize}>
          {renderCells()}
        </GameGrid>
        <div></div>
        {renderUI()}
      </Wrapper>
    )
  }

  const renderedModal = (win) => {
    let modalText = "You have been removed from the game. Try again next time."
    let modalTitle = 'You are out of dice...'
    let activeIcon = faSadCry;

    if (win) {
      modalTitle = "You Won!"
      modalText = "Great work. A gold coin has been added to your wallet."
      activeIcon = faSmileBeam;
    }

    return (
      <Modal 
        active={isShowingModal} 
        onClose={handleHideModal}   
        title={modalTitle}
        icon={activeIcon}
        text={modalText}>
          <Button label={"Rematch"} onClick={handleRestartGame}></Button>
          <Button label={"Leave Game"} primary onClick={handleClickSettings}></Button>
      </Modal>
    )
  }

  const handleHideModal = () => {
    setIsShowingModal(false);
    setIsShowingModalButton(true);
  }

  const handleShowModal = () => {
    setIsShowingModal(true);
    setIsShowingModalButton(false);
  }

  let renderedGame = <div></div>

  if (turns.length > 0) {
    renderedGame = isLeftHanded ? renderLeftHandedGame() : renderGame();
  }

  return (
    renderedGame
  );
}

export default GamePage;
