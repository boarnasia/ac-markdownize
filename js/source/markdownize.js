import Marked from 'marked'
import Store from './store'
import BlockquoteFilter from './filters/blockquote_filter'

const store = new Store()

const filters = [
  new BlockquoteFilter(),
]

/* markdown の変換オプション
   詳しくはこちら
   @see https://github.com/chjj/marked#options-1 */
Marked.setOptions({
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
function markdownize(src, css = '') {
  let ret = src

  for (let idx in filters) src = filters[i].do(ret, 'pre')

  ret = Marked(ret)

  for (let idx in filters) src = filters[i].do(ret, 'post')

  return ret
}


/*
 * マークダウン処理を掛けた後のフィルター処理
 *
 *  1. リンクを別窓で開くようする
 */
function post_filter(src) {
  let ret = src

  //  1. リンクを別窓で開くようする
  {
    // const src_eles = $(src)
    // const eles = $("a", src_eles)
    // for (let idx=0; idx<eles.length; idx++) {
    //   const ele = eles[idx]

    //   if ($(ele).attr("href") !== undefined) {
    //     let target = "_blank"
    //     if (ele.hostname.match(/(aircamp\.us|bbt757.com)$/)) {
    //       // 特定のURLが含まれるケースでは同じページで開くようにする
    //       target = "_self"
    //     }
    //     $(ele).attr("target", target)
    //   }
    // }

    // src = src_eles.html()
  }

  return ret
}

export default markdownize
