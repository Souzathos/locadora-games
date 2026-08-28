import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN)

export interface TokenPayload {
    id: number
    name: string
    email: string
    cpf: string
}

export const generateToken = (payload: TokenPayload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload
    } catch {
        return null
    }
}
