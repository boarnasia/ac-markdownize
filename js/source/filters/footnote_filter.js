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

class AnchorFilter extends BaseFilter {
  constructor() {
    super()

    this.regex = {
      marker: /\[(\^[^\]}]+)\]/g,
      footnote: /^\[(\^[^\]}]+)\]:\s?(.*)$/,
      others: /^[^\s]+/,

      escaped_marker: /{{{(\^([^}]+))}}}/,
      escaped_footnote: /{{{ref-\^[^}]+}}}/g,
    }

    this.footnotes = {}
  }

  preprocess(src) {
    // footnote の処理
    let lines = src.split("\n")
    let filtered = []
    let in_fn = false // is it inside of footnote? true || false
    let event = ""  // into || outof
    let fn_id = ""  // footnote id
    let fn_body = [] // footnote body
    let fn_first_indent = 0

    for (const idx in lines) {
      let line = lines[idx].replace(/\s*$/, "")
      let m = line.match(this.regex.footnote)
      event = ""

      if (m) {
        if (in_fn == true) {
          this.footnotes[fn_id] = fn_body.join("\n")
        }
        event = "into"
        in_fn = true
        fn_first_indent = 0

        fn_id = m[1]
        fn_body = []
        if (m[2]) fn_body.push(m[2])

        line = line.replace(
          this.regex.footnote,
          "{{{ref-" + m[1] + "}}}")

      } else if (line.match(this.regex.others)) {
        if (in_fn === true) {
          event = "outof"
          in_fn = false

          this.footnotes[fn_id] = fn_body.join("\n")
        }
      }

      if (event=="" && in_fn) {
        if (fn_first_indent == 0) {
          let m2 = line.match(/^(\s+)/)
          fn_first_indent = m2[1].length
        }

        const regex = new RegExp("^" + " ".repeat(fn_first_indent))
        fn_body.push(line.replace(regex, ""))
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

    console.log('test')

    // marker の処理
    // let ret = filtered.join("\n")
    ret = ret.replace(this.regex.marker, (all, g1, g2) => {
      console.log(all, g1, g2)
      const id = encodeURI(g2)
      let ret = `<sup><a href="#${id}">${g1}</a></sup>`

      return ret
    })

    return ret
  }
}

export default AnchorFilter

