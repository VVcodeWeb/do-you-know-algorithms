import { MoveJournalType } from "PlayGround/PlayGroundBody";

/* ========= QUICK SORT ========= */
export const quickSort = (
  array: Array<any>,
  low: number,
  high: number,
  moveJournal: Array<MoveJournalType>
) => {
  if (low < high) {
    const p = partion(array, low, high, moveJournal);
    quickSort(array, low, p - 1, moveJournal);
    quickSort(array, p, high, moveJournal);
  }
  return { array, moveJournal };
};

const partion = (
  array: Array<any>,
  low: number,
  high: number,
  moveJournal: Array<MoveJournalType>
) => {
  const pivot = array[high];
  let leftwall = low - 1;
  for (let i = low; i < high; i++) {
    if (array[i] < pivot) {
      leftwall = leftwall + 1;
      swap(array, i, leftwall, moveJournal);
    }
  }
  swap(array, high, leftwall + 1, moveJournal);
  return leftwall + 1;
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
