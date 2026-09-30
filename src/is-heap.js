const { getParent } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __isHeap = (arr, start, end, fnCmp) => {
	for (let i = start + 1; i < end; i++) {
		const parentIndex = start + getParent(i - start)
		if (fnCmp(arr[parentIndex], arr[i]) > 0) { return false }
	}
	return true
}


const isHeapWith = (arr, fnCmp) => __isHeap(arr, 0, arr.length, fnCmp)

const isHeapBy = (arr, fnMap) => isHeapWith(arr, compareBy(fnMap))

const isHeap = (arr) => isHeapWith(arr, compare)


module.exports = {
	__isHeap,
	isHeapWith,
	isHeapBy,
	isHeap,
}
