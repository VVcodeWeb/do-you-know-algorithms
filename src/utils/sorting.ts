import { MoveJournalType } from "PlayGround/types";
import { addComparisonMove, swapAndSaveJournal } from "utils/utils";
type SortReturnType = {
  array: Array<any>;
  moveJournal: Array<MoveJournalType>;
};
/* ========= QUICK SORT ========= */
type QuickSortType = {
  array: Array<any>;
  low: number;
  high: number;
  moveJournal: Array<MoveJournalType>;
};
/* TODO: add a test */
export const quickSort = ({
  array,
  low,
  high,
  moveJournal,
}: QuickSortType): SortReturnType => {
  if (low < high) {
    const p = partion({ array, low, high, moveJournal });
    quickSort({ array, low, high: p - 1, moveJournal });
    quickSort({ array, low: p, high, moveJournal });
  }
  return { array, moveJournal };
};

const partion = ({ array, low, high, moveJournal }: QuickSortType) => {
  const pivot = array[high];
  let leftwall = low - 1;
  for (let i = low; i < high; i++) {
    addComparisonMove(i, high, moveJournal);
    if (array[i] < pivot) {
      leftwall = leftwall + 1;
      swapAndSaveJournal(array, i, leftwall, moveJournal);
    }
  }
  swapAndSaveJournal(array, high, leftwall + 1, moveJournal);
  return leftwall + 1;
};

/* ========= MERGE SORT ========= */
type MergeSortType = {
  array: Array<any>;
  left: number;
  right: number;
  moveJournal: Array<MoveJournalType>;
};
/* TODO: fix */
export const mergeSort = ({
  array,
  left,
  right,
  moveJournal,
}: MergeSortType): SortReturnType => {
  if (left < right) {
    const middle = Math.round((right - 1) / 2);
    mergeSort({ array, left, right: middle, moveJournal });
    mergeSort({ array, left: middle + 1, right, moveJournal });
    merge(array, left, middle, right, moveJournal);
  }

  return { array, moveJournal };
};

const merge = (
  array: any,
  left: any,
  middle: any,
  right: any,
  moveJournal: any
) => {
  const subArr1Length = middle - left + 1;
  const subArr2Length = right - middle;
  const arr1 = new Array(subArr1Length);
  const arr2 = new Array(subArr2Length);

  for (let i = 0; i < subArr1Length; i++) {
    arr1.push(array[left + i]);
  }
  for (let i = 0; i < subArr2Length; i++) {
    arr2.push(array[middle + 1 + i]);
  }

  let i = 0;
  let j = 0;
  let k = left;
  while (i < subArr1Length && j < subArr2Length) {
    //addComparisonMove(i + left, j + middle, moveJournal);
    if (arr1[i] <= arr2[j]) {
      // addSwapMove(k, i + left, moveJournal);
      array[k] = arr1[i];
      i++;
    } else {
      //addSwapMove(k, j + middle, moveJournal);
      array[k] = arr2[j];
      j++;
    }
    k++;
  }

  while (i < subArr1Length) {
    array[k] = arr1[i];
    i++;
    k++;
  }
  while (j < subArr2Length) {
    array[k] = arr2[j];
    j++;
    k++;
  }
};
