import BaseFilter from './base_filter'

class BlockquoteFilter extends BaseFilter {

  constructor() {
    super()

    this.regex = {
      empty_bq: /^(\s*>)+$/,
      bq: /^(\s*>)+.+$/,
      newline: /^$/,
    }
  }

  preprocess(src) {
    const lines   = src.split('\n')
    let in_bq     = false
    let filtered  = new Array()
    let curr_line = ""
    let curr_type = ""
    let prev_type = ""
    let event     = "" // into | outof | ""

    for (const idx in lines) {
      curr_line = lines[idx].trim();
      curr_type = this.identify(curr_line)
      event = ""

      if (in_bq === false) {

        // blockquote の始めの blockquote の空行を削除
        if (curr_type === 'empty_bq') continue

        // それ以外の時
        // blockquote が開始する
        if (curr_type === 'bq') {
          in_bq = true
          event = 'into'
        }

      } else if (in_bq === true) {

        // blockquote内の多重の空行は1行にまとめる
        if (prev_type == 'empty_bq' && curr_type == 'empty_bq')
          continue

        // blockquote内の空行がparagraphに誤認されるのを防ぐ
        else if (curr_type == 'empty_bq')
          curr_line += '&nbsp;'

        // blockquote が終わる
        if (curr_type === 'others' || curr_type === 'newline') {
          in_bq = false
          event = 'outof'
        }
      }

      if (event === 'outof' && curr_type == 'others') {
        let last_line = ""
        let last_type = ""
        do {
          last_line = filtered.pop().replace(/&nbsp;$/, '')
          last_type = this.identify(last_line)
        } while(last_type != 'bq')
        filtered.push(last_line)

        filtered.push('')
        prev_type = 'newline'
        event === ''
      }

      if (event === 'outof' && curr_type == 'newline') {
        in_bq = false

        // blockquote の最後の blockquote の空行を削除
        let last_line = ""
        let last_type = ""
        do {
          last_line = filtered.pop().replace(/&nbsp;$/, '')
          last_type = this.identify(last_line)
        } while(last_type != 'bq')

        filtered.push(last_line)
      }

      prev_type = curr_type
      filtered.push(curr_line)
    }
    return filtered.join("\n")
  }

  identify(line) {
    let type = 'others'

    for (const i in this.regex)
      if (line.match(this.regex[i])) return i

    return type
  }
}

export default BlockquoteFilter
