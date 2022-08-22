export const MAX_NUMBERS = 30;
export const QUICK_SORT = "Quick Sort";
export const MERGE_SORT = "Merge Sort";
export const HEAP_SORT = "Heap Sort";
export const BUBBLE_SORT = "Bubble Sort";
export const SELECTION_SORT = "Selection Sort";
export const IS_RENDERING = "isRendering";
export const SHOULD_RENDER_STOP = "shouldRenderStop";
export const SWAP = "swap";
export const COMPARISON = "comparison";
export const GAME_BAR = "game-bar";
export const EASY = "Easy";
export const HARD = "Hard";
export const TRUE = "true";
export const FALSE = "false";
export const COOKIE_BEST_STREAK = "bestStreak";
export const COOKIE_ALLOW_COOKIE = "allowCoockie";
export const SESSION_DISPLAYED_COOKIE = "displayedCookieNotification";
export const BIG_O_N_2 = "O(n^{2})";
export const BIG_O_N_LOG_N = "O(n(log n))";
export const BIG_O_N = "O(n)";
export const ACTION = {
  DISPLAY_ANSWERS: "displayAnswers" as "displayAnswers",
  END_GAME: "endGame" as "endGame",
  NEW_ROUND: "renderNextRound" as "roundNextRound",
  UPDATE_RENDERING_STATES: "updateIsRendering" as "updateIsRendering",
  SET_DIFFICULTY: "setDifficulty" as "setDifficulty",
  RESET_GAME_PARAMS: "restartGame" as "restartGame",
};
type SortingType = {
  name: string;
  worstCase: string;
  bestCase: string;
  averageCase: string;
  worstCaseSpace: string;
};
const quickSort: SortingType = {
  name: QUICK_SORT,
  bestCase: BIG_O_N_LOG_N,
  worstCase: BIG_O_N_2,
  averageCase: BIG_O_N_LOG_N,
  worstCaseSpace: BIG_O_N,
};

const mergeSort: SortingType = {
  name: MERGE_SORT,
  bestCase: BIG_O_N_LOG_N,
  worstCase: BIG_O_N_LOG_N,
  averageCase: BIG_O_N_LOG_N,
  worstCaseSpace: BIG_O_N,
};

export const SORTING_POOL = [
  QUICK_SORT,
  MERGE_SORT,
  BUBBLE_SORT,
  HEAP_SORT,
  SELECTION_SORT,
];
