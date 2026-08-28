import { Request, Response, NextFunction } from 'express';
import z from 'zod';

export function validateBody(schema: z.ZodType) {
    return ( req: Request, res: Response, next: NextFunction ) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch(error) {
            next(error)
        }
    };
}