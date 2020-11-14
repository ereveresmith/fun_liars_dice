import { Styles } from "./Styles";



export const tinyWait = 140;
export const shortWait = 300;
export const mediumWait = 440;
export const longWait = 1100;
export const massiveWait = 500000;
export const WIDESCREEN_SIZE = 620;
export const SUPER_WIDESCREEN_SIZE = 910;
export const DEFAULT_COLORS_ARRAY = [
  Styles.colors.purple,
  Styles.colors.orange,
  Styles.colors.blue,
  Styles.colors.pink,
  Styles.colors.lightBlue,
  Styles.colors.darkGreen,
]

export const defaultSettings = {
  handSize: 3,
  amountOfPlayers: 4,
  handicap: 0,
  randomMode: true,
  exact: true,
  randomVariance: 2,
  maxDice: 4,
};

export const defaultPlayerSettings = {
  name: localStorage['name'] || "You",
  color: localStorage['color'] || Styles.colors.purple,
  coins: localStorage['coins'] || 0,
  callMessage: "That's a lie",
  exactMessage: "That's spot on",
};



export const mockBots = [
  {
    name: "Big Steve",
    callMessage: "Fuck you, lil bitch!",
    exactMessage: "Exactamundo!",
    color: Styles.colors.pink,
    riskThreshold: 0.23,
    personality: "ballsy",
  },
  {
    name: "Jim",
    callMessage: "Hmm probably not",
    exactMessage: "Calza",
    color: Styles.colors.blue,
    riskThreshold: 0.17,
    personality: "normal",
  },
  {
    name: "Dillon",
    callMessage: "NO WAY",
    exactMessage: "Spot on",
    color: Styles.colors.orange,
    riskThreshold: 0.15,
    personality: "liar",
  },
  {
    name: "Julio",
    callMessage: "Liar liar!",
    exactMessage: "Exactly that!",
    color: Styles.colors.lightBlue,
    riskThreshold: 0.14,
    personality: "normal",
  },
  {
    name: "Daz",
    callMessage: "Gonna call you on that",
    exactMessage: "Exactamundo",
    color: Styles.colors.pink,
    riskThreshold: 0.21,
    personality: "normal",
  },
  {
    name: "Ace",
    callMessage: "Haha no way idiot",
    exactMessage: "Exactly!",
    color: Styles.colors.darkGreen,
    riskThreshold: 0.16,
    personality: "liar",
  },
  {
    name: "Chelsea",
    callMessage: "You are a fucking liar",
    exactMessage: "Exactly!",
    color: Styles.colors.darkGreen,
    riskThreshold: 0.17,
    personality: "ballsy",
  },
  {
    name: "Aidan",
    callMessage: "Nope!",
    exactMessage: "Spot on.",
    color: Styles.colors.lightBlue,
    riskThreshold: 0.3,
    personality: "liar",
  },
  {
    name: "Bumblo",
    callMessage: "That's a lie",
    exactMessage: "Exactamundo!",
    color: Styles.colors.prink,
    riskThreshold: 0.12,
    personality: "normal",
  },
  {
    name: "Mica",
    callMessage: "That's a lie",
    exactMessage: "Exactly!",
    color: Styles.colors.blue,
    riskThreshold: 0.16,
    personality: "normal",
  },
  {
    name: "Pruney",
    callMessage: "Nope!",
    exactMessage: "Spot on.",
    color: Styles.colors.lightBlue,
    riskThreshold: 0.21,
    personality: "liar",
  },
]

export const mockNames = [
  'Jeff',
  'John',
  'Joe',
  'Bob',
  'Torb',
  'Mort',
  'Ramm',
  'Jules',
  'Ace',
  'Barf',
  'Chungus',
  "Daz",
  'Grumble',
  'Dirt',
  'Rock',
  'Barry',
  'Larry',
  'Lorry',
  'Ross',
  'Rick',
  'Terry',
  'Barns',
  'Snarf',
  'Friend',
  'Tack',
  'Peter',
  'Haley',
  'Pringle',
  'Pruney',
  'Little Lick',
  'Snort',
  'Toss',
  'Rumble',
  'Knock',
  'Tear',
  'Mr. Cry',
  'Bumblo',
  'Stop Gap',
  'Mr MVP',
  'Luis',
  'Susan',
  'Shane',
  'Jesse',
  'Tim',
  'Sharon',
  'Emma',
  'Aidan',
  'Zach',
  'George',
  'Hans',
  'Dan',
  'James',
  'Ellen',
  'Ann',
  'Chelsea',
  'Donald',
  'Raul',
  'Lars',
  'Ludwig',
  'Rod',
  'Mick',
  'Stephen',
  'Alyssa',
  'Elmo',
  'Murtry',
  'Tumbleton',
  'Rusty',
  'Buck',
  'Clay',
  'Shai',
  'George',
  'Emma',
  'Max',
  'Richter',
  'Jan',
  'Joe',
  'Dillon',
  'Jose',
  'Rose',
  'Vinny',
  'David',
  'Megan',
  'Titan',
  'Alex',
  'Juan',
  'Tarzan',
  'Harry',
  'Samantha',
  'Mica',
  'Charles',
  'Dimitri',
  'Mariana',
  'Roger',
  'Alec',
]

