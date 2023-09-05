import type { APIRoute } from 'astro';
import $ from 'cheerio';
import template from 'lodash/template';

import { tryEval, tryParseJSON } from '@/helpers';

export const POST: APIRoute = async (props) => {
  const requestJson = await props.request.json();
  const responseJson = await trolling(requestJson);
  return new Response(JSON.stringify(responseJson));
};

const trolling = async (props: {
  url: string;
  trolls: Array<{
    prop: string;
    selector: string;
    transform: string;
  }>;
}) => {
  try {
    const { url, trolls = [] } = props;
    const body = await (await fetch(url)).text();
    const page = $.load(body, { xmlMode: body.includes('<?xml') });
    return trolls.length === 0
      ? {
          status: false,
          error: 'Missing trolls',
        }
      : trolls
          .filter(({ prop }) => !prop.includes('!'))
          .map(({ prop, selector, transform }) => [
            prop,
            tryParseJSON(
              tryEval(() =>
                template(`<%= ${transform} %>`)({
                  o: page(selector),
                }),
              ),
            ),
          ])
          .reduce((acc, [prop, value]) => ({ ...acc, [prop]: value }), {});
  } catch (error) {
    return { status: false, error: (error as Error).toString() };
  }
};
