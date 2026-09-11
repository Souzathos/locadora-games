import { NextFunction, Request, Response } from "express"
import { ForbiddenError } from "../errors";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return next(new ForbiddenError('Admin access required'));
    }

    next();
};
