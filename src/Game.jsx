import React, {useState, useEffect} from 'react';
import IconButton from './components/IconButton';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import PlayerDisplay from './components/PlayerDisplay';
import BetSubmitter from './components/BetSubmitter';
import { calcBotMove } from './util/Bot';
import { randomInt, tinyWait, shortWait, mediumWait, longWait, massiveWait, WIDESCREEN_SIZE } from './util/Defaults';
import useSound from 'use-sound';
import { Sounds, Notes } from './util/Sounds'
import LogContainer from './components/LogContainer';
import Switch from './components/Switch';
import { Modal } from './components/Modal'

const UIGrid = Styled.div`
  display: grid;
  height: 100%;
  width: 100%;

  grid-template-columns: auto auto;
  grid-template-rows: auto auto;

  ${props => props.isWidescreen && `
    grid-template-rows: auto auto;
    grid-template-columns: auto;
  `}

  align-content: center;
  justify-content: center;
`

const UILongSection = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  background-color: ${Styles.colors.white};
  opacity: 0.83;
  padding: 4px 8px;

  ${props => !props.isWidescreen && `
    border-radius: 8px 8px 0 0;
  `}
  justify-items: end;
  justify-content: end;

  ${props => props.isLeftHanded && `
    justify-items: start;
    justify-content: start;
  `}
  display: grid;
  align-items: center;
  display: grid;
  grid-template-columns: auto auto;
`

const EmptyCell = Styled.div`
  display: grid;
  width: 100%;
  opacity: 0;
  height: 100%;
`

const Wrapper = Styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: auto;
  grid-template-rows: auto 24px auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  margin: 8px 0;

  ${props => props.isWidescreen &&`
    grid-template-columns: 63% 1% auto;
    grid-template-rows: auto;
    justify-content: end;
    margin: 0;
  `}

  ${props => props.isWidescreen && props.isLeftHanded && `
    grid-template-columns: auto 1% 63%;
    grid-template-rows: auto;
    margin: 0;
    justify-content: start;
  `}
  `

const GameGrid = Styled.div`
  grid-gap: 4px;
  width: 90%;
  display: grid;
  justify-items: center;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
`

const GamePage = ({ settings, onEnd}) => {
  const [players, setPlayers] = useState(settings.players);

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  const initialTurn = {
    number: 0,
    amount: 0,
    fv: 0,
    player: {id: 0},
    nextPlayer: players[0],
  }
  
  const [turns, setTurns] = useState([initialTurn]);
  const [log, setLog] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [isChallenge, setIsChallenge] = useState(false);
  const [isWidescreen, setIsWidescreen] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLeftHanded, setIsLeftHanded] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [globalVolume, setGlobalVolume] = useState(1.0);
  const [turnPitch, setTurnPitch] = useState(1);

  const [playRerollSound] = useSound(Sounds.reroll, { volume: globalVolume});
  const [playChallengeSound] = useSound(Sounds.challenge, { volume: globalVolume});
  const [playNextRoundSound] = useSound(Sounds.nextRound, { volume: globalVolume});
  const [playNextTurnSound] = useSound(Sounds.nextTurn, { volume: globalVolume, playbackRate: turnPitch});
  const [playLoseDiceSound] = useSound(Sounds.loseDice, { volume: globalVolume});
  const [playErrorSound] = useSound(Sounds.errorSound, { volume: globalVolume});

  const [playNote0] = useSound(Notes[0], { volume: globalVolume});
  const [playNote1] = useSound(Notes[1], { volume: globalVolume});
  const [playNote2] = useSound(Notes[2], { volume: globalVolume});
  const [playNote3] = useSound(Notes[3], { volume: globalVolume});
  const [playNote4] = useSound(Notes[4], { volume: globalVolume});
  const [playNote5] = useSound(Notes[5], { volume: globalVolume});
  const [playNote6] = useSound(Notes[6], { volume: globalVolume});
  const [playNote7] = useSound(Notes[7], { volume: globalVolume});
  const [playNote8] = useSound(Notes[8], { volume: globalVolume});
  const [playNote9] = useSound(Notes[9], { volume: globalVolume});
  const [playNote10] = useSound(Notes[10], { volume: globalVolume});
  const [playNote11] = useSound(Notes[11], { volume: globalVolume});
  const [playNote12] = useSound(Notes[12], { volume: globalVolume});
  const [playNote13] = useSound(Notes[13], { volume: globalVolume});
  const [playNote14] = useSound(Notes[14], { volume: globalVolume});

  useEffect(() => {
    console.log("Turns")
    const nextPlayer = turns[turns.length-1].nextPlayer;

    if (nextPlayer.id !== 1) {
      calcBotTurn();
    }
  }, [turns]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    let initialIsWidescreen = false;
    if (getWidth() > WIDESCREEN_SIZE) {
      initialIsWidescreen = true;
    }
    setIsWidescreen(initialIsWidescreen);
  }, [])

  const handleResize = (e) => {
    let width = e.currentTarget.innerWidth;
    if (width > WIDESCREEN_SIZE) {
      setIsWidescreen(true)
    } else {
      setIsWidescreen(false)
    }
  }

  useEffect(() => {
    const restartGame = async (settings) => {
      playRerollSound();
      setPlayers(settings.players);
      setTurns([initialTurn]);
      rerollDice();
      await printLog('Starting a new game');
      setIsChallenge(false);
    }

    restartGame(settings);
  }, [settings])

  const printLog = async (value, fv, amount, value2) => {
    setLog(log => [...log, {value: value, fv: fv, amount: amount, value2: value2}]);
    timeout(shortWait);
  }

  const nextRound = async (currentPlayer) => {
    let nextPlayer = currentPlayer;
    if (checkOutOfDice(currentPlayer.hand)) {
      nextPlayer = calcNextPlayer(currentPlayer);
    }
    setIsChallenge(false);

    const winner = checkWinner();
    if (winner !== undefined) {
      await printLog(`${winner.name} has won the game!`);
    } else {
      const newTurn = {
        number: 0,
        amount: 0,
        fv: 0,
        player: {id: 0},
        nextPlayer: nextPlayer,
      }
      rerollDice();
      setTurns([newTurn]);
      // setLog([]);
      await printLog("Starting new round");
      await timeout(longWait);
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
    //Yo
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
    return new Promise( res => setTimeout(res, delay) );
  }

  const calcBotTurn = async () => {
    const nextPlayer = turns[turns.length -1].nextPlayer;
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
    await timeout(longWait)

    if (amntFound >= amount) {
      await printLog(`It was the truth!`);
      return false;
    } else {
      await printLog(`It was a lie!`);
      return true;
    }
  }

  const playNextNote = (num, isChord) => {
    switch(num) {
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

  const rerollDice = () => {
    const playersArray = [...players];
    const newPlayers = [];

    playersArray.forEach((player) => {
      const newHand = player.hand.map((dice) => {
        const newFv = randomInt(5) + 1;
        let visible = false;

        return {
          fv: newFv,
          visible: visible,
          disabled: dice.disabled,
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

    playRerollSound();
    setPlayers(newPlayers);
  }

  const nextTurn = async (amount, fv, currentPlayer) => {
    const currentTurn = turns[turns.length - 1];
    playNextTurnSound();
    const nextPlayer = calcNextPlayer(currentPlayer);
    const newTurnNumber = currentTurn.number + 1;
    timeout(mediumWait);

    const newTurn = {
      number: newTurnNumber,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    await printLog(`${newTurn.player.name}: `, newTurn.fv, newTurn.amount);
    setTurns(turns => [...turns, newTurn]);
    timeout(mediumWait);
  }

  const handleClickSettings = async () => {
    onEnd();
  }

  const handleShowModal = () => {
    if (isShowingModal === true) {
      setIsShowingModal(false);
    } else {
      setIsShowingModal(true);
    }
  }

  const handleMute = () => {
    if (globalVolume < 1) {
      setGlobalVolume(1);
    } else {
      setGlobalVolume(0);
    }
  }

  const handlePauseGame = async () => {
    setGameSpeed(0);
  }

  const handleClickSubmit = async (amount, fv) => {
    if (isValidBet(amount, fv)) {
      submitBet(amount, fv, players[0]);
    }
  }

  const checkOutOfDice = (hand) => {
    for(let i = 0; i < hand.length; i++) {
      if (hand[i].disabled === false) {
        return false;
      }
    }

    return true;
  }

  const amountOfActiveDice = () => {
    let amount = 0;
    for(let i = 0; i < players.length; i++) {
      let hand = players[i].hand;

      for(let k = 0; k < hand.length; k++) {
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
            hand[y-1].hasArrow = false;
          } else {
            if (i > 0) {
              const handToUpdate =  playersArray[i - 1].hand;
              handToUpdate.forEach((dice) => {
                dice.hasArrow = false;
              })
            }
          }

          foundInvisible = true;
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
            playNextNote(amountFound-1, isEnough);
          }


          const isBotChallenge = (currentTurn.player.id !== 1 && currentTurn.nextPlayer.id !==1)
          let loopBackTime = tinyWait;

          if(isLyingFv){
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

  const startChallenge = async () => {
    playChallengeSound();
    setIsChallenge(true);
    const currentTurn = turns[turns.length - 1];
    const nextPlayer = currentTurn.nextPlayer;
    await printLog(`${nextPlayer.name}: That's bullshit!`); 
    await timeout(longWait);
    await revealNextDice();
  }

  const endChallenge = async () => {
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    const playersArray = [...players];
    let lyingPlayer = playersArray[nextPlayer.id-1];

    const isLying = await checkIsLying();
    if (isLying === true) {
      lyingPlayer = playersArray[player.id-1];
    } 
    
    if (lyingPlayer.id === nextPlayer.id) { 
      playNextRoundSound();
    } else {
      playErrorSound();
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
      await timeout(longWait);
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

  const renderedPlayer = (playerNumber) => {
    const currentTurn = turns[turns.length - 1];
    let turnToShow = currentTurn;

    const player = players[playerNumber - 1];
    if (player === undefined) {
      return null;
    } else {
      let opacity = 1;
      const isActive = (player.id === currentTurn.nextPlayer.id);
      let isSecondary = false;
      let isTertiary = false;
      let isQuad = false;

      if (turns.length > 1) {
        const prevTurn = turns[turns.length - 2];
        isSecondary = (player.id === currentTurn.player.id);

        if (isSecondary) {
          turnToShow = currentTurn;
        }
        if (turns.length > 2 && !isChallenge) {
          isTertiary = (player.id === prevTurn.player.id);
          if (isTertiary) {
            turnToShow =  prevTurn;
          }
          if (turns.length > 3 && !isChallenge) {
            const prevTurn = turns[turns.length - 3];

            isQuad = (player.id === prevTurn.player.id);
            if (isQuad) {
              turnToShow =  prevTurn;
            }
          }
        }
      }

      const isShowingTurn = (isSecondary || isTertiary || isQuad);
      const isShowingChallenge = (isChallenge && (player.id === currentTurn.player.id | player.id === currentTurn.nextPlayer.id))
      
      return (
        <PlayerDisplay
          isChallenge={isShowingChallenge}
          key={`playerDisplay${playerNumber}`}
          turn={turnToShow}
          turnOpacity={opacity}
          showTurn={isShowingTurn}
          isActive={isActive}
          player={player}>
        </PlayerDisplay>
    )};
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

    switch(amountOfPlayers) {
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

  const currentTurn = turns[turns.length - 1];
  const nextPlayer = currentTurn.nextPlayer;
  const myTurn = (nextPlayer.id === 1);


  let defaultAmount = currentTurn.amount;
  if (defaultAmount < 1) {
    defaultAmount++;
  }

  let defaultFv = currentTurn.fv + 1;
  if (defaultFv  < 1) {
    defaultFv++;
  } else if (defaultFv > 6) {
    defaultFv = 1;
    defaultAmount++;
  }

  const renderUIControls = () => {
    return (
      <UILongSection isWidescreen={isWidescreen} isLeftHanded={isLeftHanded}>
        <IconButton isDefaultActive={isShowingModal} icon={'volume'} onClick={handleShowModal}></IconButton>
        <IconButton isDefaultActive={globalVolume > 0} icon={'volume'} onClick={handleMute}></IconButton>
        <Switch isDefaultChecked={!isLeftHanded} onChange={handleSwitchView}></Switch>
      </UILongSection>
    )
  }

  const renderUI = () => {
    return (
      <div>
        {!isWidescreen && renderUIControls()}
        <UIGrid isWidescreen={isWidescreen}>
        {(!isLeftHanded || isWidescreen) && <LogContainer 
          log={log}
          isTall={isWidescreen}>
        </LogContainer>}
        {isWidescreen && renderUIControls()}
        <BetSubmitter 
          canCall={currentTurn.fv > 0} 
          disabled={!myTurn || isChallenge} 
          defaultFv={defaultFv} 
          defaultAmount={defaultAmount} 
          onSubmit={handleClickSubmit}>
        </BetSubmitter>
        {isLeftHanded && !isWidescreen && <LogContainer 
          log={log}
          isTall={isWidescreen}>
        </LogContainer>}
      </UIGrid>
      </div>
    )
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
    return (
      <Wrapper isWidescreen={isWidescreen} isLeftHanded={isLeftHanded}>
      {!isWidescreen && (<GameGrid>
        {renderCells()}
      </GameGrid>)}
      {!isWidescreen && (<div></div>)}
      {renderUI()}
      {isWidescreen && (<div></div>)}
      {isWidescreen && (<GameGrid>
        {renderCells()}
      </GameGrid>)}
    </Wrapper>
    )
  }

  const showLoseModal = () => {
    isShowingModal(true);
  }

  const modalTitle = 'You Lost!'

  const renderGame = () => {
    return (
      <Wrapper isWidescreen={isWidescreen}>
        {isShowingModal && <Modal title={modalTitle} active={isShowingModal}></Modal>}
      <GameGrid>
        {renderCells()}
      </GameGrid>
      <div></div>
      {renderUI()}
    </Wrapper>
    )
  }

  return (
    isLeftHanded ? renderLeftHandedGame() : renderGame()
  );
}

export default GamePage;
