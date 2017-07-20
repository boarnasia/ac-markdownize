'use strict'

import markdownize from '../source/markdownize'
import BlockquoteFilter
  from '../source/filters/blockquote_filter'

let text = ""
let html = ""

describe.skip('header tag', () => {
  test('with alphabet text', () => {
    text = `# test`
    html = markdownize(text).trim()
    expect(html).toBe(`<h1 id="test">test</h1>`)
  })

  test('with japanese text', () => {
    text = `# テスト`
    html = markdownize(text).trim()
    expect(html).toBe(`<h1 id="-">テスト</h1>`)
  })

  // omit h2 ~ h6
})

// describe('BlockquoteFilter', () => {
  //   test('pre_filter / rid continuing over 2 lines of empty blockquote', () => {
  //       text = `> test
  // >
  // >
  // >
  // > test`
  //       html = pre_filter(text).trim()
  //     expect(html).toBe(`> test
  // >
  // > test`)
  //   })
  //   return
  //   test('simple', () => {
  //     text = `> test`
  //     html = pre_filter(text).trim()
  //     expect(html).toBe(`> test`)
  //   })
  //
  //   test('pre_filter / rid preceding empty blockquote / 1', () => {
  //       text = `>
  // > test`
  //       html = pre_filter(text).trim()
  //     expect(html).toBe(`> test`)
  //   })
  //
  //   test('pre_filter / rid preceding empty blockquote / 2', () => {
  //       text = `>
  // >
  // >
  // >
  // > test`
  //       html = pre_filter(text).trim()
  //     expect(html).toBe(`> test`)
  //   })
  //
  //
  //   //
  //   //  test('pre_filter / continure blockquote when there are empty line middle of / 1', () => {
  //   //    text = `> test
  //   //>
  //   //> test`
  //   //    html = markdownize(text).trim()
  //   //    expect(html).toBe(`<blockquote>
  //   //<p>test</p>
  //   //<p>&nbsp;<br>test</p>
  //   //</blockquote>`)
  //   //  })
  //   //
  //   //  test('pre_filter / continure blockquote when there are empty line middle of / 2', () => {
  //   //
  //   //    text = `> test
  //   //>
  //   //> test
  //   //> >
  //   //> > test`
  //   //    html = markdownize(text).trim()
  //   //    expect(html).toBe(`<blockquote>
  //   //<p>test</p>
  //   //<p>&nbsp;<br>test</p>
  //   //<blockquote>
  //   //<p>&nbsp;</p>
  //   //<p>test</p>
  //   //</blockquote>
  //   //</blockquote>`)
  //   //  })
  //   //
  //   //  test('pre_filter / rid following empty blockquote', () => {
  //   //
  //   //    text = `> test
  //   //>
  //   //>`
  //   //    html = markdownize(text).trim()
  //   //    expect(html).toBe(`<blockquote>
  //   //<p>test</p>
  //   //</blockquote>`)
  //   //  })
// })
