import Markdown from '../markdown'
import BaseFilter from './base_filter'

/**
 * 仕様は php markdown extra に寄せてるけど微妙に変えてます。
 * php の方だと maker と footnote は１：１だけど、＊：１にしてます。
 *
 * footnote は marker と　footnote で構成されています
 *
 * marker の書式
 *  - /\[^[^\]]+]
 *
 * footnote の書式
 *  - /\[^[^]+]: ...
 *        ...
 *        ...
 *
 " marker のアウトプット
 *  - <sup><a href="#fn-...">...</a></sup>
 *
 " footnote のアウトプット
 *  - <div class="footnote">
 *      <hr />
 *      <ol>
 *        <li id="fn-..."><p>...</p></li>
 *      </ol>
 *    </div>
 *
 *
 *
 * @see https://michelf.ca/projects/php-markdown/extra/#footnotes
 */

class FootnoteFilter extends BaseFilter {
  constructor() {
    super()

    this.regex = {
      marker: /\[(\^[^\]}]+)\]/g,
      footnote: /^\[(\^[^\]}]+)\]:\s?(.*)$/,
      others: /^[^\s]+/,

      escaped_marker: /{{{(\^[^}]+)}}}/g,
      escaped_footnote: /{{{fn-(\^[^}]+)}}}/g,
    }

    this.footnotes = {}
  }

  preprocess(src) {
    this.footnotes = {}

    // footnote の処理
    let lines = src.split("\n")
    let filtered = []
    let in_fn = false // is it inside of footnote? true || false
    let fn_id = ""  // footnote id
    let fn_body = [] // footnote body

    for (const idx in lines) {
      let line = lines[idx].replace(/\s*$/, "")
      let m = line.match(this.regex.footnote)

      if (m) {
        if (in_fn == true) {
          this.footnotes[fn_id] = fn_body.join("\n")
        }
        in_fn = true

        fn_id = m[1]
        fn_body = []
        if (m[2]) fn_body.push(m[2])

        line = line.replace(
          this.regex.footnote,
          "")

      } else if (line.match(this.regex.others)) {
        if (in_fn === true) {
          in_fn = false

          this.footnotes[fn_id] = fn_body.join("\n")
        }
      } else if (in_fn) {
        fn_body.push(line.trim())
        continue
      }

      filtered.push(line)
    }

    if (in_fn) {
      this.footnotes[fn_id] = fn_body.join("\n")
    }

    // marker の処理
    let ret = filtered.join("\n")
    ret = ret.replace(this.regex.marker, '{{{$1}}}')

    return ret
  }

  postprocess(src) {
    let ret = src

    // marker の処理
    ret = ret.replace(this.regex.escaped_marker, (all, g1) => {
      const id = encodeURI(g1)
      // let ret = `<sup><a href="#fn-${id}">${g1}</a></sup>`
      let ret = `<sup>${g1}</sup>`

      return ret
    })

    // footnote の処理
    let fns = []
    const markdown = new Markdown()
    for (const key in this.footnotes) {
      const id = encodeURI(key)
      console.log(key, this.footnotes[key])
      let content = markdown.do(this.footnotes[key]).replace(/\s*$/, "")
      content = `<li id="fn-${id}"><sup><span class="marker">${key}</span></sup>${content}</li>`

      fns.push(content)
    }

    if (fns.length) {
      ret += `<div class="footnote">
<hr />
<ol>
  ${fns.join("\n")}
</ol>
</div>`
    }

    return ret
  }
}

export default FootnoteFilter

