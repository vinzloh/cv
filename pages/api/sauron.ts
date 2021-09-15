import $ from 'cheerio'
import template from 'lodash/template'
import { tryParseJSON, tryEval } from 'helpers'

export default async (req: any, res: any) => {
  res.status(200).json(await trolling(req))
}

const trolling = async (req: any) => {
  try {
    const { url, trolls = [] } = JSON.parse(req.body)
    const body = await (await fetch(url)).text()
    const page = $.load(body as any, { xmlMode: body.includes('<?xml') })

    return trolls.length === 0
      ? {
          status: false,
          error: 'Missing trolls',
        }
      : trolls
          .filter(({ prop }: any) => !prop.includes('!'))
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
  } catch (error: any) {
    return { status: false, error: error.toString() }
  }
}
