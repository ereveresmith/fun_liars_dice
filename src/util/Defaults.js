import { Styles } from "./Styles";



export const tinyWait = 130;
export const shortWait = 280;
export const mediumWait = 450;
export const longWait = 900;
export const massiveWait = 500000;
export const WIDESCREEN_SIZE = 620;
export const SUPER_WIDESCREEN_SIZE = 910;
export const DEFAULT_COLORS_ARRAY = [
  Styles.colors.purple,
  Styles.colors.orange,
  Styles.colors.blue,
  Styles.colors.maroon,
  Styles.colors.darkGreen,
  Styles.colors.coolBlue,
]

export const defaultGameSettings = {
  minDice: 2,
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
    riskThreshold: 0.18,
    personality: "ballsy",
  },
  {
    name: "Lil Steve",
    callMessage: "Fuck you, lil bitch!",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.14,
    personality: "ballsy",
  },
  {
    name: "Jim",
    callMessage: "Hmm probably not",
    exactMessage: "Calza",
    riskThreshold: 0.17,
    personality: "normal",
  },
  {
    name: "Dillon",
    callMessage: "NO WAY",
    exactMessage: "Spot on",
    riskThreshold: 0.15,
    personality: "liar",
  },
  {
    name: "Julio",
    callMessage: "Liar liar!",
    exactMessage: "Exactly that!",
    riskThreshold: 0.14,
    personality: "normal",
  },
  {
    name: "Daz",
    callMessage: "Gonna call you on that",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.2,
    personality: "normal",
  },
  {
    name: "Ace",
    callMessage: "No way, idiot!",
    exactMessage: "Exactly!",
    riskThreshold: 0.17,
    personality: "liar",
  },
  {
    name: "Chelsea",
    callMessage: "You are a liar!",
    exactMessage: "Exactly!",
    riskThreshold: 0.17,
    personality: "ballsy",
  },
  {
    name: "Aidan",
    callMessage: "Nope!",
    exactMessage: "Spot on.",
    riskThreshold: 0.19,
    personality: "liar",
  },
  {
    name: "Bumblo",
    callMessage: "That's a lie",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.14,
    personality: "normal",
  },
  {
    name: "Mica",
    callMessage: "That's a lie",
    exactMessage: "Exactly!",
    riskThreshold: 0.16,
    personality: "normal",
  },
  {
    name: "Pruney",
    callMessage: "Nope! No way",
    exactMessage: "Spot on.",
    riskThreshold: 0.17,
    personality: "liar",
  },
  {
    name: "Alec",
    callMessage: "You are a liar",
    exactMessage: "Exactly!",
    riskThreshold: 0.17,
    personality: "ballsy",
  },
  {
    name: "Dimitri",
    callMessage: "That's a lie",
    exactMessage: "Spot on!",
    riskThreshold: 0.16,
    personality: "normal",
  },
  {
    name: "Titan",
    callMessage: "That's a lie",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.17,
    personality: "normal",
  },
  {
    name: "Tack",
    callMessage: "No way!",
    exactMessage: "Spot on!",
    riskThreshold: 0.19,
    personality: "normal",
  },
  {
    name: "Mariana",
    callMessage: "That's a lie",
    exactMessage: "Spot on!",
    riskThreshold: 0.14,
    personality: "normal",
  },
  {
    name: "Barf",
    callMessage: "That's a lie!!!",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.14,
    personality: "ballsy",
  },
  {
    name: "Ellen",
    callMessage: "No way!",
    exactMessage: "Spot on!",
    riskThreshold: 0.19,
    personality: "normal",
  },
  {
    name: "Shane",
    callMessage: "NO WAY!!!",
    exactMessage: "Spot on!",
    riskThreshold: 0.16,
    personality: "normal",
  },
  {
    name: "Zach",
    callMessage: "That's a lie",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.15,
    personality: "normal",
  },
  {
    name: "Jesse",
    callMessage: "No way!",
    exactMessage: "Exactamundo!",
    riskThreshold: 0.19,
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

