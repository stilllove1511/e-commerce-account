import { Controller } from '@nestjs/common'
import { AccountService } from './account.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @MessagePattern('register')
    async register(payload) {
        try {
            return await this.accountService.register(payload)
        } catch (error) {
            console.log(error)
            return {
                EC: 1,
                EM: 'error from server',
            }
        }
    }

    @MessagePattern('updatePassword')
    async changePassword(payload) {
        try {
            return await this.accountService.changePassword(payload)
        } catch (error) {
            console.log(error)
            return {
                EC: 1,
                EM: 'error from server',
            }
        }
    }
}
