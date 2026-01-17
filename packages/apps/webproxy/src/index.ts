import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api/',
  createProxyMiddleware({
    logger: console,
    target: `http://127.0.0.1:3001/api`,
  }),
);

app.use(
  '/',
  createProxyMiddleware({
    logger: console,
    target: `http://127.0.0.1:4200`,
  }),
);

console.log();

app.listen(3000, () => {
  console.log(`HTTP WebProxy listening on port 3000`);
});
