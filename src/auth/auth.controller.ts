import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data) {
        return this.authService.login(data)
    }

    @Post('login_admin')
    async loginAdmin(@Body() data) {
        return this.authService.loginAdmin(data)
    }
}
