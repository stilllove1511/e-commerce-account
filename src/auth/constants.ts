import * as dotenv from 'dotenv'
dotenv.config()

export const jwtConstants = {
    secret: process.env.JWTSECRET,
    expiresIn: process.env.JWT_EXPIRY_TIME,
}
