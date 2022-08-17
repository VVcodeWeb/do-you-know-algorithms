export const MAX_NUMBERS = 12;
export const TIMER_KEY_ONE = "Tiemrits";
export const TIMER_KEY_TWO = "dasdas";
export const QUICK_SORT = "Quick Sort";
export const MERGE_SORT = "Merge Sort";
export const HEAP_SORT = "Heap Sort";
export const BUBBLE_SORT = "Bubble Sort";
export const IS_RENDERING = "isRendering";
export const SHOULD_RENDER_STOP = "shouldRenderStop";
export const SWAP = "swap";
export const COMPARISON = "comparison";
export const ACTION = {
  START_GAME: "startGame" as "startGame",
  STOP_RENDERING: "correctAnswer" as "correctAnswer",
  DISPLAY_ANSWERS: "displayAnswers" as "displayAnswers",
  STOP_GAME: "stopGame" as "stopGame",
  NEW_ROUND: "renderNextRound" as "roundNextRound",
  UPDATE_RENDERING_STATES: "updateIsRendering" as "updateIsRendering",
  RENDER_SHOULD_STOP: "renderShouldStop" as "renderShouldStop",
};
export const SORTING_POOL = [QUICK_SORT, MERGE_SORT, HEAP_SORT, BUBBLE_SORT];
