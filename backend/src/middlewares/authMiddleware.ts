import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError } from "../errors";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedError('Authentication token was not provided'));
    }

    const token = authHeader.split(' ')[1];

    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
        return next(new UnauthorizedError('Invalid or expired authentication token'));
    }

    req.user = decoded;
    next();
};
