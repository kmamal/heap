const { kIndex, getLeft, getRight } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __bubbleDown = (arr, start, end, _index, fnCmp) => {
	let index = _index
	for (;;) {
		const adjustedIndex = index - start
		const leftChildIndex = start + getLeft(adjustedIndex)
		if (leftChildIndex >= end) { break }
		const leftChild = arr[leftChildIndex]

		const rightChildIndex = start + getRight(adjustedIndex)
		const rightChild = arr[rightChildIndex]

		const isLeft = rightChildIndex >= end || fnCmp(leftChild, rightChild) <= 0
		let minChildIndex
		let minChild
		if (isLeft) {
			minChildIndex = leftChildIndex
			minChild = leftChild
		} else {
			minChildIndex = rightChildIndex
			minChild = rightChild
		}

		const value = arr[index]
		if (fnCmp(value, minChild) < 0) { break }

		arr[minChildIndex] = value; value[kIndex] = minChildIndex
		arr[index] = minChild; minChild[kIndex] = index

		index = minChildIndex
	}
}


const bubbleDownWith = (arr, fnCmp) => {
	__bubbleDown(arr, 0, arr.length, fnCmp)
}

const bubbleDownBy = (arr, fnMap) => bubbleDownWith(arr, compareBy(fnMap))

const bubbleDown = (arr) => bubbleDownWith(arr, compare)


module.exports = {
	__bubbleDown,
	bubbleDownWith,
	bubbleDownBy,
	bubbleDown,
}
