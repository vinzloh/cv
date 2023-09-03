import type { APIRoute } from 'astro';
import $ from 'cheerio';
import template from 'lodash/template';

import { tryEval, tryParseJSON } from '@/helpers';

export const POST: APIRoute = async (props) => {
  const requestJson = await props.request.json();
  const responseJson = await trolling(requestJson);
  return new Response(JSON.stringify(responseJson));
};

const trolling = async (props: any) => {
  try {
    const { url, trolls = [] } = props;
    const body = await (await fetch(url)).text();
    const page = $.load(body as any, { xmlMode: body.includes('<?xml') });

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
                template(`<%= ${transform} %>`)({
                  o: page(selector),
                }),
              ),
            ),
          ])
          .reduce(
            (acc: any, [prop, value]: any) => ({ ...acc, [prop]: value }),
            {},
          );
  } catch (error: any) {
    return { status: false, error: error.toString() };
  }
};
