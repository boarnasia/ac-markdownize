'use strict'

import Marked from 'marked'
import AnchorFilter
  from '../../source/filters/anchor_filter'

let text = ""
let filtered = ""
let filter = null

beforeEach(() => {
  text = ""
  filtered = ""
  filter = new AnchorFilter()
})

describe('AnchorFilter', () => {
  test('outer link pattern', () => {
    text = `<a href="https://example.com">https://example.com</a>`
    filtered = filter.do(text, 'post')

    expect(filtered).toBe(`<a href="https://example.com" target="_blank">https://example.com</a>`)

    text = `
<a href="http://example.com/1">https://example.com</a>
<a href="https://example.com/2">https://example.com</a>
<a href="//example.com/2">//example.com</a>
`
    filtered = filter.do(text, 'post')

    expect(filtered).toBe(`
<a href="http://example.com/1" target="_blank">https://example.com</a>
<a href="https://example.com/2" target="_blank">https://example.com</a>
<a href="//example.com/2" target="_blank">//example.com</a>
`)
  })

  test('inner link pattern', () => {
    text = `<a href="https://aircamp.us">https://aircamp.us</a>`
    filtered = filter.do(text, 'post')

    expect(filtered).toBe(`<a href="https://aircamp.us">https://aircamp.us</a>`)

    text = `
<a href="https://aircamp.us/1">https://aircamp.us</a>
<a href="https://bbt757.com/2">https://bbt775.com</a>
`
    filtered = filter.do(text, 'post')

    expect(filtered).toBe(`
<a href="https://aircamp.us/1">https://aircamp.us</a>
<a href="https://bbt757.com/2">https://bbt775.com</a>
`)
  })
})
