import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AccountModule } from './account/account.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [AuthModule, UserModule, AccountModule, ConfigModule.forRoot()],
})
export class AppModule {}
