import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login({
        username,
        password,
    }: {
        username: string
        password: string
    }) {
        const user = await this.validateUser(username, password)
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        }
        let access_token = this.jwtService.sign(payload)
        console.log(`access_token: ${access_token}`)
        return {
            code: 0,
            access_token,
        }
    }
}
