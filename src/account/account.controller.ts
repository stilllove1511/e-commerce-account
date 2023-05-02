import { Controller } from '@nestjs/common'
import { AccountService } from './account.service'
import { MessagePattern } from '@nestjs/microservices'
import { UserService } from 'src/user/user.service'
import * as jwt from 'jsonwebtoken'

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly userService: UserService,
    ) {}

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

    @MessagePattern('detailAdmin')
    async detailAdmin(payload) {
        const user = jwt.decode(payload.token) as any
        const userId = user.id
        try {
            const data = await this.userService.findOneById(userId)
            return {
                code: 0,
                data,
            }
        } catch (error) {
            console.log(error)
            return {
                EC: 1,
                EM: 'error from server',
            }
        }
    }
}
