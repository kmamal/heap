const { __bubbleDown } = require('./bubble-down')
const { __bubbleUp } = require('./bubble-up')
const { getParent } = require('./tree-helpers')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __remove = (arr, start, end, index, fnCmp, indexKey) => {
	if (end <= start) { return }

	const item = arr[index]

	const lastIndex = end - 1
	if (index !== lastIndex) {
		const last = arr[lastIndex]
		arr[index] = last
		const parentIndex = start + getParent(index - start)
		if (parentIndex >= start && fnCmp(last, arr[parentIndex]) < 0) {
			__bubbleUp(arr, start, index, fnCmp, indexKey)
		} else {
			__bubbleDown(arr, start, lastIndex, index, fnCmp, indexKey)
		}
		arr[lastIndex] = item
	}

	if (indexKey) { delete item[indexKey] }
}


const removeWith = (arr, index, fnCmp, indexKey) => {
	if (arr.length === 0) { return }
	__remove(arr, 0, arr.length, index, fnCmp, indexKey)
	arr.length--
}

const removeBy = (arr, index, fnMap, indexKey) => {
	removeWith(arr, index, compareBy(fnMap), indexKey)
}

const remove = (arr, index, indexKey) => {
	removeWith(arr, index, compare, indexKey)
}


module.exports = {
	__remove,
	removeWith,
	removeBy,
	remove,
}
