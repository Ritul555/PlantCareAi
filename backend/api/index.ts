import app from '../src/app';

// Vercel Serverless Function Handler
export default function handler(req: any, res: any) {
  return app(req, res);
}

// CommonJS compatibility
module.exports = app;
module.exports.default = handler;
