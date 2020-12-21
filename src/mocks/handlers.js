import { rest } from "msw";

import { url1, url2, data1, data2 } from "../useFetch.test";

export const handlers = [
  rest.get(url1, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data1));
  }),
  rest.get(url2, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data2));
  }),
];
