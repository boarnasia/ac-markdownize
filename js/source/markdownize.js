import BlockquoteFilter from './filters/blockquote_filter'
import AnchorFilter from './filters/anchor_filter'

const filters = [
  new BlockquoteFilter(),
  new AnchorFilter(),
]

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

// コードハイライトのコールバック関数
function highlight_callback(code, lang, callback) {
  const html = `<h6>In ${lang}</h6>`
    + hljs.highlight(lang, code, true).value

  return html
}

/*
 * マークダウン化処理
 */
function markdownize(src) {
  let ret = src

  for (let idx in filters) src = filters[i].do(ret, 'pre')

  ret = marked(ret)

  for (let idx in filters) src = filters[i].do(ret, 'post')

  return ret
}

export default markdownize
