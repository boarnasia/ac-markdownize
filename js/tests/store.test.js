'use strict'

import Store from '../source/store.js'

console.log(Store)

let store = undefined

beforeEach( () => {
  store = new Store()
})

test('load default', () => {
  expect(true).toBe(true)
})
