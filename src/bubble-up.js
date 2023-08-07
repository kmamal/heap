const { kIndex, getParent } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __bubbleUp = (arr, start, _index, fnCmp) => {
	let index = _index
	for (;;) {
		const parentIndex = start + getParent(index - start)
		if (parentIndex < start) { break }

		const parent = arr[parentIndex]
		const value = arr[index]
		if (fnCmp(parent, value) < 0) { break }

		arr[parentIndex] = value; value[kIndex] = parentIndex
		arr[index] = parent; parent[kIndex] = index

		index = parentIndex
	}
}


const bubbleUpWith = (arr, index, fnCmp) => {
	__bubbleUp(arr, 0, index, fnCmp)
}

const bubbleUpBy = (arr, index, fnMap) => bubbleUpWith(arr, index, compareBy(fnMap))

const bubbleUp = (arr, index) => bubbleUpWith(arr, index, compare)


module.exports = {
	__bubbleUp,
	bubbleUpWith,
	bubbleUpBy,
	bubbleUp,
}
