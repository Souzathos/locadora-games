import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { ZodError } from 'zod';

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    if(error instanceof ZodError) {
        return res.status(400).json({
            message: error.issues
        })
    }

    console.error(error);

    return res.status(500).json({
        message: 'Internal server error'
    });
}