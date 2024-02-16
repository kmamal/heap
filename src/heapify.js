const { kIndex, getParent } = require('./tree-helpers')
const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')

const __heapify = (arr, start, end, fnCmp, useIndex) => {
	const first = start + getParent((end - start) - 1)
	for (let i = first; i >= start; i--) {
		__bubbleDown(arr, start, end, i, fnCmp, false)
	}
	if (useIndex) {
		for (let i = start; i < end; i++) {
			arr[i][kIndex] = i
		}
	}
}


const heapifyWith = (arr, fnCmp) => {
	__heapify(arr, 0, arr.length, fnCmp, false)
}

const heapifyBy = (arr, fnMap) => {
	heapifyWith(arr, compareBy(fnMap))
}

const heapify = (arr) => {
	heapifyWith(arr, compare)
}


module.exports = {
	__heapify,
	heapifyWith,
	heapifyBy,
	heapify,
}
