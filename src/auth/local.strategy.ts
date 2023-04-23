import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        console.log('>>>here is local strategy')

        const user = await this.authService.validateUser(username, password)
        if (!user) {
            return {
                code: 1,
            }
        }
        return {
            code: 1,
            data: user,
        }
    }
}
