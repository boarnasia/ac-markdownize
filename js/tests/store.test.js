'use strict'

import Store from '../source/store'

let store = undefined

beforeEach( () => {
  store = new Store()
  localStorage.clear()
})

test('load default', () => {
  expect(store.state.version).toBe('0.4.5')
  expect(store.state.markdown).toBe(true)
  expect(store.state.popup.size.width).toBe(800)
  expect(store.state.popup.size.height).toBe(600)
})

test('save and load', () => {
  const markdown = false
  store.state.markdown = markdown

  store.save()

  store.load()

  expect(store.state.markdown).toBe(markdown)
})
