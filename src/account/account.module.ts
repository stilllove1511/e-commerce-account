import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { DatabaseModule } from 'src/database/database.module'
import { userProviders } from 'src/user/user.providers'
import { UserService } from 'src/user/user.service'

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [...userProviders, AccountService, UserService],
})
export class AccountModule {}
