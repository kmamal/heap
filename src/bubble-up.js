const { kIndex, getParent } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __bubbleUp = (arr, start, _index, fnCmp, useIndex) => {
	let index = _index
	const item = arr[index]
	for (;;) {
		const parentIndex = start + getParent(index - start)
		if (parentIndex < start) { break }

		const parent = arr[parentIndex]
		if (fnCmp(parent, item) < 0) { break }

		arr[index] = parent
		if (useIndex) { parent[kIndex] = index }

		index = parentIndex
	}
	arr[index] = item
	if (useIndex) { item[kIndex] = index }
}


const bubbleUpWith = (arr, index, fnCmp) => {
	__bubbleUp(arr, 0, index, fnCmp, false)
}

const bubbleUpBy = (arr, index, fnMap) => {
	bubbleUpWith(arr, index, compareBy(fnMap))
}

const bubbleUp = (arr, index) => {
	bubbleUpWith(arr, index, compare)
}


module.exports = {
	__bubbleUp,
	bubbleUpWith,
	bubbleUpBy,
	bubbleUp,
}
