'use strict'

import Marked from 'marked'
import FootnoteFIlter
  from '../../source/filters/footnote_filter'

let text = ""
let filtered = ""
let filter = null

beforeEach(() => {
  text = ""
  filtered = ""
  filter = new FootnoteFIlter()
})

describe('preprocess', () => {
  test('maker', () => {
    text = `[^1]`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`{{{^1}}}`)

    text = `[^999]`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`{{{^999}}}`)

    text = `[^あああ]`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`{{{^あああ}}}`)

    text = `
今日は天気が良い。[^1] それもすごく良い。[^999]

とんでもなく天気が良いのだ。[^あ]

`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`
今日は天気が良い。{{{^1}}} それもすごく良い。{{{^999}}}

とんでもなく天気が良いのだ。{{{^あ}}}

`)
  })

  test('footnote', () => {
    text = `[^1]: test`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`{{{ref-^1}}}`)
    expect(filter.footnotes['^1']).toBe(`test`)

    text = `[^1]: test
[^2]: test
[^3]: test`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`{{{ref-^1}}}
{{{ref-^2}}}
{{{ref-^3}}}`)
    expect(filter.footnotes['^1']).toBe(`test`)
    expect(filter.footnotes['^2']).toBe(`test`)
    expect(filter.footnotes['^3']).toBe(`test`)

    text = `
[^1]: test
      test
      test
`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`
{{{ref-^1}}}`)
    expect(filter.footnotes['^1']).toBe(`test
test
test
`)

    text = `
[^1]: test
      test
      test
[^2]: test
      test
      test
[^3]: test
      test
      test
`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`
{{{ref-^1}}}
{{{ref-^2}}}
{{{ref-^3}}}`)
    expect(filter.footnotes['^1']).toBe(`test
test
test`)
    expect(filter.footnotes['^2']).toBe(`test
test
test`)
    expect(filter.footnotes['^3']).toBe(`test
test
test
`)

  })

  test('mixed', () => {
    text = `
今日は天気が良い。[^1] それもすごく良い。[^999]

とんでもなく天気が良いのだ。[^あ]

[^1]: test
[^999]:
  test
  test

[^あ]: test
  test
  test

  > test

  test
`
    filtered = filter.do(text, 'pre')
    expect(filtered).toBe(`
今日は天気が良い。{{{^1}}} それもすごく良い。{{{^999}}}

とんでもなく天気が良いのだ。{{{^あ}}}

{{{ref-^1}}}
{{{ref-^999}}}
{{{ref-^あ}}}`)
    expect(filter.footnotes['^1']).toBe(`test`)
    expect(filter.footnotes['^999']).toBe(`test
test
`)
    expect(filter.footnotes['^あ']).toBe(`test
test
test

> test

test
`)
  })
})
