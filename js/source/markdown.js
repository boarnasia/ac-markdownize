import marked from 'marked'
import hljs from 'highlightjs'
import BlockquoteFilter from './filters/blockquote_filter'
import AnchorFilter from './filters/anchor_filter'
import FootnoteFilter from './filters/footnote_filter'

// コードハイライトのコールバック関数
function highlight_callback(code, lang, callback) {
  const html = `<h6>In ${lang}</h6>`
    + hljs.highlight(lang, code, true).value

  return html
}

/* markdown の変換オプション
   詳しくはこちら
   @see https://github.com/chjj/marked#options-1 */
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: false,
  smartypants: true,
  highlight: highlight_callback
})

class Markdown {
  do(src) {
    const filters = [
      new FootnoteFilter(),
      new BlockquoteFilter(),
      new AnchorFilter(),
    ]

    let ret = src

    for (let idx in filters) ret = filters[idx].do(ret, 'pre')

    ret = marked(ret)

    for (let idx in filters) ret = filters[idx].do(ret, 'post')

    return ret
  }
}

export default Markdown
