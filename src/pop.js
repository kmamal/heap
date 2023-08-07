const { kIndex } = require('./tree-helpers')
const { __bubbleDown } = require('./bubble-down')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __pop = (arr, start, end, fnCmp) => {
	const lastIndex = end - 1
	const top = arr[start]
	const last = arr[lastIndex]
	arr[start] = last; last[kIndex] = 0
	arr[lastIndex] = top; delete top[kIndex]
	__bubbleDown(arr, start, lastIndex, start, fnCmp)
}


const popWith = (arr, fnCmp) => {
	__pop(arr, 0, arr.length, fnCmp)
	return arr.pop()
}

const popBy = (arr, fnMap) => popWith(arr, compareBy(fnMap))

const pop = (arr) => popWith(arr, compare)


module.exports = {
	__pop,
	popWith,
	popBy,
	pop,
}
