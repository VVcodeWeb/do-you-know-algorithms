import { SWAP } from "const/constants";
import { bubbleSort, heapSort, mergeSort, quickSort } from "utils/sorting";
import { randomNumber } from "utils/utils";

const generateRandomNumbers = () => {
    let arr = [];
    while (arr.length < 400) {
        let r = randomNumber(10, 1000);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    if (JSON.stringify(arr) === JSON.stringify(getCopySortedArray(arr)))
        return generateRandomNumbers()
    return arr;
}

const getCopySortedArray = (array) => array.slice().sort((a, b) => a - b)

describe("Sorting algorithms", () => {
    const arraysToTest = []
    for (let i = 0; i < 100; i++)
        arraysToTest.push(generateRandomNumbers())
    it("Quick sort algorithm", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array } = quickSort({
                array: copyArrayToTest,
                low: 0,
                high: copyArrayToTest.length - 1,
                moveJournal: []
            })

            const correctSortedArray = arraysToTest[i].slice().sort((a, b) => a - b)
            expect(array).toEqual(correctSortedArray)
        }
    })
    it("Merge sort algorithm", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array } = mergeSort({
                array: copyArrayToTest,
                left: 0,
                right: copyArrayToTest.length - 1,
                moveJournal: []
            })
            if (JSON.stringify(array) === JSON.stringify(arraysToTest[i]))
                console.log("Arrays are equal before sorting")
            const correctSortedArray = arraysToTest[i].slice().sort((a, b) => a - b)
            expect(array).toEqual(correctSortedArray)
        }
    })
    it("Bubble sort algorithm", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array } = bubbleSort(copyArrayToTest)
            if (JSON.stringify(array) === JSON.stringify(arraysToTest[i]))
                console.log("Arrays are equal before sorting")
            const correctSortedArray = arraysToTest[i].slice().sort((a, b) => a - b)
            expect(array).toEqual(correctSortedArray)
        }
    })
    it("Heap sort algorithm", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array } = heapSort(copyArrayToTest)
            if (JSON.stringify(array) === JSON.stringify(arraysToTest[i]))
                console.log("Arrays are equal before sorting")
            const correctSortedArray = arraysToTest[i].slice().sort((a, b) => a - b)
            expect(array).toEqual(correctSortedArray)
        }
    })
})
const swap = (array, idx1, idx2) => {
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp
}
describe("Move journals", () => {
    const arraysToTest = []
    for (let i = 0; i < 100; i++)
        arraysToTest.push(generateRandomNumbers())
    it("Quick sort move journal", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array, moveJournal } = quickSort({
                array: copyArrayToTest,
                low: 0,
                high: copyArrayToTest.length - 1,
                moveJournal: []
            })
            const arrayToSort = arraysToTest[i].slice()
            for (let move of moveJournal) {
                if (move.action === SWAP)
                    swap(arrayToSort, move.indexOne, move.indexTwo)
            }
            expect(arrayToSort).toEqual(array);
        }
    })

    it("Merge sort move journal", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array, moveJournal } = mergeSort({
                array: copyArrayToTest,
                left: 0,
                right: copyArrayToTest.length - 1,
                moveJournal: []
            })
            const arrayToSort = arraysToTest[i].slice()
            for (let move of moveJournal) {
                if (move.action === SWAP)
                    swap(arrayToSort, move.indexOne, move.indexTwo)
            }
            expect(arrayToSort).toEqual(array);
        }
    })

    it("Bubble sort move journal", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array, moveJournal } = bubbleSort(copyArrayToTest)
            const arrayToSort = arraysToTest[i].slice()
            for (let move of moveJournal) {
                if (move.action === SWAP)
                    swap(arrayToSort, move.indexOne, move.indexTwo)
            }
            expect(arrayToSort).toEqual(array);
        }
    })
    it("Heap sort move journal", () => {
        for (let i = 0; i < arraysToTest.length; i++) {
            const copyArrayToTest = arraysToTest[i].slice();
            expect(copyArrayToTest).not.toBe(getCopySortedArray(copyArrayToTest))
            const { array, moveJournal } = heapSort(copyArrayToTest)
            const arrayToSort = arraysToTest[i].slice()
            for (let move of moveJournal) {
                if (move.action === SWAP)
                    swap(arrayToSort, move.indexOne, move.indexTwo)
            }
            expect(arrayToSort).toEqual(array);
        }
    })
})