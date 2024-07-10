// @types/express/index.d.ts
import * as express from 'express';
import type { JwtPayload } from '../utils.types';

declare global {
  namespace Express {
    interface Request {
      jwtDecodedPayload?: JwtPayload;
    }
  }
}