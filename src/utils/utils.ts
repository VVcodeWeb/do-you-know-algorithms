import { GameNumberTypes } from "components/GameNumber";
import { MAX_NUMBERS } from "const/constants";

export const generateRandomNumbers = (): GameNumberTypes[] => {
  let arr = [];
  while (arr.length < MAX_NUMBERS) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr.map((value, index) => ({
    value,
    key: index,
    id: value,
  }));
};
export const getRandomNumber = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getScore = (): number => {
  const min = 15;
  const max = 25;
  return Math.floor(Math.random() * (max - min)) + min;
};
