import BaseFilter from './base_filter'

class BlockquoteFilter extends BaseFilter {

  preprocess(src) {
    let ret = []

    const lines = src.split('\n')

    let line = ""
    let prev = {
        level: 0,
        hasText: false,
        inEmptyLine: false,
        isNewline: false,
    }
    let curr_level = 0
    let hasText = false
    let isNewline = false
    let inEmptyLine = false

    for (const idx in lines) {
      line = lines[idx].replace(/\s*$/, '')

      hasText = this._blockquote_has_text(line)
      isNewline = this._is_newline(line)
      curr_level = this._blockquote_level(line)

      if (curr_level > 0) {

        if (hasText) {
          inEmptyLine = false

          if (curr_level < prev.level && prev.hasText == true) {
            ret.push("> ".repeat(curr_level).replace(/\s*$/, ''))
          }
        }
        else {
          if (prev.level === 0) {
            continue
          } else if (inEmptyLine === false) {
            inEmptyLine = true
          } else { continue }
        }

      } else if (curr_level == 0 && prev.level > 0) {

        if (prev.inEmptyLine) {
          ret.pop()
        }

        if (isNewline === false) {
          inEmptyLine = false
          ret.push("")
        }
      }

      ret.push(line)
      prev = {
        level: curr_level,
        hasText: hasText,
        inEmptyLine: inEmptyLine,
        isNewline: isNewline,
      }
    }

    ret = ret
      .join('\n')

    return ret
  }

  _is_newline(line) {
    let m = line.match(/^$/)

    return (m ? true : false)
  }

  _blockquote_has_text(line) {
    let m = line.match(/^(\s*>)+\s*([^\s>]+)/)

    return (m ? true : false)
  }

  _blockquote_level(line) {
    let ret = 0
    let m = line.match(/^(\s*>)+/)

    if (m) {
      while(m) {
        ret++

        line = line.replace(/^\s*>/, '')
        m = line.match(/^(\s*>)+/)
      }
    }

    return ret
  }
}

export default BlockquoteFilter
