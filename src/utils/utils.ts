import { MAX_NUMBERS } from "const/constants";
import { nonActiveBar } from "const/styles";
import { GameBarTypes, MoveJournalType } from "PlayGround/PlayGroundBody";

export const generateRandomNumbers = (): GameBarTypes[] => {
  let arr = [];
  while (arr.length < MAX_NUMBERS) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr.map((value, index) => ({
    value,
    key: index,
    id: value,
    color: nonActiveBar,
  }));
};
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
  moveJournal: Array<MoveJournalType>
) => {
  moveJournal.push({
    rendered: false,
    step: moveJournal.length,
    indexOne: index1,
    indexTwo: index2,
    action: "comparison",
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
    action: "swap",
  });
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
