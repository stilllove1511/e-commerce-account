import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { DatabaseModule } from 'src/database/database.module'
import { userProviders } from 'src/user/user.providers'

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [...userProviders, AccountService],
})
export class AccountModule {}
