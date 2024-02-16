const { __remove } = require('./remove')
const { compare, compareBy } = require('@kmamal/util/function/compare')


const __pop = (arr, start, end, fnCmp, useIndex) => {
	__remove(arr, start, end, 0, fnCmp, useIndex)
}


const popWith = (arr, fnCmp) => {
	__pop(arr, 0, arr.length, fnCmp, false)
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
