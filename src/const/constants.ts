export const MAX_NUMBERS = 30;
export const QUICK_SORT = "Quick Sort";
export const MERGE_SORT = "Merge Sort";
export const HEAP_SORT = "Heap Sort";
export const BUBBLE_SORT = "Bubble Sort";
export const IS_RENDERING = "isRendering";
export const SHOULD_RENDER_STOP = "shouldRenderStop";
export const SWAP = "swap";
export const COMPARISON = "comparison";
export const GAME_BAR = "game-bar";
export const EASY = "Easy";
export const HARD = "Hard";
export const ACTION = {
  DISPLAY_ANSWERS: "displayAnswers" as "displayAnswers",
  END_GAME: "endGame" as "endGame",
  NEW_ROUND: "renderNextRound" as "roundNextRound",
  UPDATE_RENDERING_STATES: "updateIsRendering" as "updateIsRendering",
  SET_DIFFICULTY: "setDifficulty" as "setDifficulty",
  RESET_GAME_PARAMS: "restartGame" as "restartGame",
};
export const SORTING_POOL = [QUICK_SORT, MERGE_SORT, BUBBLE_SORT, HEAP_SORT];
