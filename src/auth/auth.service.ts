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
        if (user) {
            const payload = {
                id: user.id,
                username: user.username,
                roles: user.roles,
            }
            let access_token = this.jwtService.sign(payload)
            console.log(`access_token: ${access_token}`)
            return {
                code: 0,
                data: {
                    token: access_token,
                    userId: user.id,
                    roles: user.roles,
                },
            }
        } else {
            return {
                code: 1,
                message: 'Information is not correct',
            }
        }
    }
    async loginAdmin({
        username,
        password,
    }: {
        username: string
        password: string
    }) {
        const user = await this.validateUser(username, password)
        if (user) {
            for(let role of user.roles){
                if(role.code=='admin') {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        roles: user.roles,
                    }
                    let access_token = this.jwtService.sign(payload)
                    console.log(`access_token: ${access_token}`)
                    return {
                        code: 0,
                        data: {
                            token: access_token,
                            userId: user.id,
                            roles: user.roles,
                        },
                    }
                }
            }
        }
        return {
            code: 1,
            message: 'Information is not correct',
        }
    }
}
