const { test } = require('@kmamal/testing')
const {
	heapify,
	pop,
	heapifyBy,
	popBy,
	heapifyWith,
	popWith,
	add,
	remove,
	removeBy,
	bubbleDown,
	isHeap,
	isHeapBy,
	__isHeap,
} = require('.')

const { map } = require('@kmamal/util/array/map')
const { sort } = require('@kmamal/util/array/sort')

const N = 1000

test("structs.heap", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const sorted = new Array(N)
	heapify(arr)
	for (let i = 0; i < N; i++) {
		sorted[i] = pop(arr)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})

test("structs.heap By", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const fn = (x) => 2 * x

	const sorted = new Array(N)
	heapifyBy(arr, fn)
	for (let i = 0; i < N; i++) {
		sorted[i] = popBy(arr, fn)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})

test("structs.heap With", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const fn = (a, b) => a - b

	const sorted = new Array(N)
	heapifyWith(arr, fn)
	for (let i = 0; i < N; i++) {
		sorted[i] = popWith(arr, fn)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})

test("structs.heap isHeap", (t) => {
	t.ok(isHeap([]))
	t.ok(isHeap([ 1 ]))
	t.ok(isHeap([ 0, 10, 1, 11, 12, 2, 3 ]))
	t.ok(!isHeap([ 0, 1, 10, 11, 12, 2, 3 ]))
	t.ok(isHeapBy([ 3, 2, 1 ], (x) => -x))
	t.ok(__isHeap([ 9, 9, 1, 2, 3, 0 ], 2, 5, (a, b) => a - b))
	t.ok(!__isHeap([ 9, 9, 3, 2, 1, 0 ], 2, 5, (a, b) => a - b))
})

test("structs.heap remove", (t) => {
	const arr = [ 0, 10, 1, 11, 12, 2, 3 ]
	t.ok(isHeap(arr))
	remove(arr, 3)
	t.equal(arr, [ 0, 3, 1, 10, 12, 2 ])

	const items = []
	for (let i = 0; i < 50; i++) { add(items, Math.random()) }
	for (let i = 0; i < 25; i++) {
		remove(items, Math.floor(Math.random() * items.length))
		t.ok(isHeap(items))
	}
	t.equal(items.length, 25)
})

test("structs.heap remove with indexKey", (t) => {
	const arr = [ 0, 10, 1, 11, 12, 2, 3 ].map((value) => ({ value }))
	const fn = (x) => x.value
	heapifyBy(arr, fn, 'index')
	const target = arr[3]
	removeBy(arr, target.index, fn, 'index')
	t.equal(target.index, undefined)
	t.ok(isHeapBy(arr, fn))
	arr.forEach((x, i) => { t.equal(x.index, i) })
})

test("structs.heap bubbleDown", (t) => {
	const arr = [ 5, 1, 3 ]
	bubbleDown(arr, 0)
	t.equal(arr, [ 1, 5, 3 ])
})

test("structs.heap pop empty", (t) => {
	const arr = []
	t.equal(pop(arr), undefined)
	t.equal(arr.length, 0)
	t.equal(Object.keys(arr), [])

	const arr2 = []
	t.equal(pop(arr2, 'index'), undefined)
	remove(arr2, 0)
	t.equal(arr2.length, 0)
})
