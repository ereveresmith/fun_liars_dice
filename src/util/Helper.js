import { Styles } from './Styles';

export const mockPlayers = [
    {name: 'Jenkins', id: 2, hand: [5], color: Styles.colors.blue},
    {name: 'Rich', id: 3, hand: [6, 6], color: Styles.colors.red},
    {name: 'Sucks', id: 4, hand: [1], color: Styles.colors.green},
    {name: 'Mr. Macho', id: 5, hand: [1, 2, 6, 6], color: Styles.colors.orange},
    {name: 'Jorgenbro', id: 6, hand: [2], color: Styles.colors.pink},
  ]

export const YOU = {
    name: 'YOU', id: 1, hand: [1, 2, 3, 4, 5], color: Styles.colors.purple
}

export const mockBot = {
  name: 'mock bot', id: 2, hand: [1, 2, 3, 4, 5], color: Styles.colors.blue
}



export const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const mockNames = [
  'Jeff',
  'John',
  'Joe',
  'Bob',
  'Torb',
  'Mort',
  'Short',
  'Dink',
  'Ramm',
  'Jules',
  'Ace',
  'Barf',
  'Chungus',
  "Daz",
  'E Dog', 
  'Rippit',
  'Q.',
  'Mr.',
  'Grumble',
  'Dirt',
  'Jock',
  'Rock',
  'Borry',
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
  'Tutu',
  'Lil Duck', 
  'Stop Gap',
  'Mr MVP',
  'Luis',
  'Susan',
  'Shane',
  'Jesse',
  'Vinny',
  'David',
  'Megan',
  'Titan',
  'Alex',
  'Alec',
]

export const defaultSettings = {
  players: [YOU, mockBot],
};