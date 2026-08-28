import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError } from "../errors";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedError('Token não fornecido'));
    }

    const token = authHeader.split(' ')[1];

    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
        return next(new UnauthorizedError('Token inválido'));
    }

    req.user = decoded;
    next();
};
