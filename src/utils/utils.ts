import {
  COMPARISON,
  COOKIE_ALLOW_COOKIE,
  COOKIE_BEST_STREAK,
  MAX_NUMBERS,
  SWAP,
} from "const/constants";
import { nonActiveBar } from "const/styles";
import { GameBarTypes, MoveJournalType } from "PlayGround/types";
import CSS from "csstype";
type CookiesType = typeof COOKIE_ALLOW_COOKIE | typeof COOKIE_BEST_STREAK;
export const setCookie = (name: CookiesType, value: string) => {
  const d = new Date();
  const days = name === COOKIE_ALLOW_COOKIE ? 365 : 30;
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
export const getCookie = (name: CookiesType) => {
  let n = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(n) == 0) {
      return c.substring(n.length, c.length);
    }
  }
  return "";
};
export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const generateRandomNumbers = (): GameBarTypes[] => {
  let arr = [];
  while (arr.length < MAX_NUMBERS) {
    let r = randomNumber(10, 400);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  if (JSON.stringify(arr) === JSON.stringify(arr.slice().sort((a, b) => a - b)))
    return generateRandomNumbers();
  return arr.map((value, index) => ({
    value,
    key: index,
    id: value,
    color: nonActiveBar,
  }));
};
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const getRandomNumber = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getScore = (): number => {
  const min = 15;
  const max = 25;
  return Math.floor(Math.random() * (max - min)) + min;
};

export const shuffle = (array: any) => {
  return array
    .map((value: any) => ({ value, sort: Math.random() }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map(({ value }: { value: any }) => value);
};
export const addComparisonMove = (
  index1: number,
  index2: number,
  moveJournal: Array<MoveJournalType>,
  index3?: number
) => {
  moveJournal.push({
    rendered: false,
    step: moveJournal.length,
    indexOne: index1,
    indexTwo: index2,
    indexThree: index3,
    action: COMPARISON,
  });
};

export const addSwapMove = (
  index1: number,
  index2: number,
  moveJournal: Array<MoveJournalType>
) => {
  moveJournal.push({
    rendered: false,
    step: moveJournal.length,
    indexOne: index1,
    indexTwo: index2,
    action: SWAP,
  });
};
export const getColor = (index: number): CSS.Properties => {
  switch (index) {
    case 0:
      return {
        backgroundColor: "rgb(227, 117, 244)",
        boxShadow: "rgb(182, 97, 204) 5px 3px 0px 3px",
      };
    case 1:
      return {
        backgroundColor: "rgb(150, 218, 255)",
        boxShadow: "rgb(26, 156, 175) 5px 3px 0px 3px",
      };
    case 2:
      return {
        backgroundColor: "rgb(97, 206, 112)",
        boxShadow: "rgb(76, 163, 81) 5px 3px 0px 3px",
      };
    default:
      return {
        backgroundColor: "rgb(252, 198, 118)",
        boxShadow: "rgb(175, 132, 82) 5px 3px 0px 3px",
      };
  }
};
export const swapAndSaveJournal = (
  array: Array<any>,
  index1: number,
  index2: number,
  moveJournal: Array<MoveJournalType>
) => {
  const temp = array[index2];
  array[index2] = array[index1];
  array[index1] = temp;
  if (index1 !== index2) addSwapMove(index1, index2, moveJournal);
};
