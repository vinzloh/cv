import $ from 'cheerio'
import template from 'lodash/template'
import fetch from 'isomorphic-unfetch'
import { tryParseJSON, tryEval } from 'helpers'

export default async (req: any, res: any) => {
  res.status(200).json(await trolling(req))
}

const trolling = async (req: any) => {
  try {
    const { url, trolls = [] } = JSON.parse(req.body)
    const body = await fetch(url)
    const page = $.load((await body.text()) as any)
    return trolls.length === 0
      ? {
          status: false,
          error: 'Missing trolls',
        }
      : trolls
          .map(({ prop, selector, transform }: any) => [
            prop,
            tryParseJSON(
              tryEval(() =>
                template(`<%= ${transform} %>`, { imports: { $ } })({
                  o: page(selector),
                })
              )
            ),
          ])
          .reduce(
            (acc: any, [prop, value]: any) => ({ ...acc, [prop]: value }),
            {}
          )
  } catch (error) {
    return { status: false, error: error.toString() }
  }
}
