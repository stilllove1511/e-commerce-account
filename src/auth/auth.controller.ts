import { Controller, Request, UseGuards } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { MessagePattern } from '@nestjs/microservices'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern('login')
    async login(data) {
        return this.authService.login(data)
    }
}
