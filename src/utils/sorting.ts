import { MoveJournalType } from "PlayGround/types";
import {
  addComparisonMove,
  addSwapMove,
  swapAndSaveJournal,
} from "utils/utils";
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
    let middle = left + Math.floor((right - left) / 2);
    mergeSort({ array, left, right: middle, moveJournal });
    mergeSort({ array, left: middle + 1, right, moveJournal });
    merge(array, left, middle, right, moveJournal);
  }

  return { array, moveJournal };
};

const merge = (arr: any, l: any, m: any, r: any, moveJournal?: any) => {
  let lengthOne = m - l + 1;
  let lengthTwo = r - m;

  // Create temp arrays
  let L = new Array(lengthOne);
  let R = new Array(lengthTwo);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < lengthOne; i++) L[i] = arr[l + i];
  for (let j = 0; j < lengthTwo; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < lengthOne && j < lengthTwo) {
    addComparisonMove(l + i, m + 1 + j, moveJournal);
    if (L[i] <= R[j]) {
      addSwapMove(k, l + i, moveJournal);
      arr[k] = L[i];
      i++;
    } else {
      addSwapMove(k, m + 1 + j, moveJournal);
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < lengthOne) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < lengthTwo) {
    arr[k] = R[j];
    j++;
    k++;
  }
};

/* ========= BUBLE SORT ========= */
export const bubbleSort = (array: Array<any>): SortReturnType => {
  const moveJournal: Array<MoveJournalType> = [];
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      addComparisonMove(i, i + 1, moveJournal);
      if (array[i] > array[i + 1]) {
        swapped = true;
        swapAndSaveJournal(array, i, i + 1, moveJournal);
      }
    }
  }
  return { array, moveJournal };
};

/* ========= HEAP SORT ========= */
export const heapSort = (array: Array<any>) => {
  const moveJournal: Array<MoveJournalType> = [];
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--)
    heapify(array, array.length, i, moveJournal);

  for (let i = array.length - 1; i >= 0; i--) {
    swapAndSaveJournal(array, 0, i, moveJournal);
    heapify(array, i, 0, moveJournal);
  }
  return { array, moveJournal };
};

const heapify = (
  array: Array<any>,
  N: number,
  i: number,
  moveJournal: Array<MoveJournalType>
) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < N && array[left] > array[largest]) largest = left;
  if (right < N && array[right] > array[largest]) largest = right;
  if (left < N) {
    addComparisonMove(
      largest,
      left,
      moveJournal,
      right < N ? right : undefined
    );
  } else if (right < N) addComparisonMove(largest, right, moveJournal);

  if (largest !== i) {
    swapAndSaveJournal(array, i, largest, moveJournal);
    heapify(array, N, largest, moveJournal);
  }
};
