import { GameNumberTypes } from "components/GameNumber";
import { MAX_NUMBERS } from "const/constants";
import { MoveJournalType } from "PlayGround/PlayGroundBody";

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

export const shuffle = (array: any) => {
  return array
    .map((value: any) => ({ value, sort: Math.random() }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map(({ value }: { value: any }) => value);
};


export const swap = (
  array: Array<any>,
  index1: number,
  index2: number,
  moveJournal: Array<MoveJournalType>
) => {
  const temp = array[index2];
  array[index2] = array[index1];
  array[index1] = temp;
  if (index1 !== index2)
    moveJournal.push({
      swapIndexOne: index1,
      swapIndexTwo: index2,
      step: moveJournal.length,
      rendered: false,
    });
};