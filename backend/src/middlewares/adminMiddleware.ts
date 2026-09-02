import { NextFunction, Request, Response } from "express"

export const adminMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.user?.isAdmin) {
                return res.status(403).json({message: 'Admin access required'})
            }
        } catch {
            return null
        }
        next()
    }
}