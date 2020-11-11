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
  Styles.colors.brown,
  Styles.colors.lightBlue,
]

export const defaultSettings = {
  handSize: localStorage['hand_size'] || 3,
  name: localStorage['name'] || "You",
  amountOfPlayers: localStorage['amount_of_players'] || 4,
  handicap: localStorage['handicap'] || 0,
  randomMode: localStorage['random_mode'] || false,
  randomVariance: localStorage['random_variance'] || 3,
  coins: localStorage['coins'] || 0,
  myColor: Styles.colors.pink,
};

export const mockLieMessages = [
  "That's a lie!",
  "No way...", 
  "Not in 100 years!",
  "I have to call that one",
  "Yeah, right!",
  "LOL, not a chance",
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

