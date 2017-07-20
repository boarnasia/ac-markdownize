class BaseFilter {
  constructor () {
    this.state = {}
  }

  do(src, mode) {
    let ret = ""
    switch (mode) {
    case "pre":
      return this.preprocess(src)

    case "post":
      return this.preprocess(src)
    }
  }

  preprocess(src) {
    return src
  }

  postprocess(src) {
    return src
  }

}

export default BaseFilter
