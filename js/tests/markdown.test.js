'use strict'

import Markdown from '../source/markdown'

let text = ""
let filtered = ""
let markdown = null

beforeEach(() => {
  text = ""
  filtered = ""
  markdown = new Markdown()
})

describe('exception case', () => {
  test('code block with no-langauge type', () => {
    text = `Normal text

    var test
    console.log(test)
`
    filtered = markdown.do(text)

    expect(filtered).toBe(`<p>Normal text</p>
<pre><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">test</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">test</span>)
</code></pre>`)
  })

  test('code block with natural language', () => {
    text = `Normal text

    おはようございます。
`
    filtered = markdown.do(text)

    expect(filtered).toBe(`<p>Normal text</p>
<pre><code>おはようございます。
</code></pre>`)
  })
})

