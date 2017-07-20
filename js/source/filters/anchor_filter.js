import BaseFilter from './base_filter'

class AnchorFilter extends BaseFilter {
  constructor() {
    super()
  }

  postprocess(src) {
    let filtered = src

    filtered = filtered.replace(/(<a href="(https?:)?\/\/(?!(aircamp|bbt757))[^"]*")/gi, '$1 target="_blank"')

    return filtered
  }
}

export default AnchorFilter

