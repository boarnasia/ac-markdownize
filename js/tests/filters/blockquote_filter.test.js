'use strict'

import BlockquoteFilter
  from '../../source/filters/blockquote_filter'

let text = ""
let filtered = ""
let filter = null

beforeEach(() => {
  text = ""
  filtered = ""
  filter = new BlockquoteFilter()
})

describe('BlockquoteFilter', () => {
  test('normal test', () => {
    text = `
# test

> test

test
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
# test

> test

test
`)
  })

  test('rid unnecessary empty blockquote', () => {

    text = `
>
> test
>
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
> test
`)


    text = `
>
> >
> > test
> >
>
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
> > test
`)

  })

  test('fold multi-empty-lines in blockquote into 1 line', () => {

    text = `
>
> test
>
>
> test
>
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
> test
>&nbsp;
> test
`)

    text = `
>
> >
> > test
> >
> >
> > test
> >
>
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
> > test
> >&nbsp;
> > test
`)

  })

  test('insert newline when following line isnt newline after bq', () => {
    text = `
# test

> test
test
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
# test

> test

test
`)

    text = `
# test

> test
>
>
test
`
    filtered = filter.do(text, 'pre')

    expect(filtered).toBe(`
# test

> test

test
`)

  })

})
