import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AccountModule } from './account/account.module'
import { ConfigModule } from '@nestjs/config'
import { EurekaModule } from 'nestjs-eureka'

@Module({
    imports: [
        AuthModule,
        UserModule,
        AccountModule,
        ConfigModule.forRoot(),
        EurekaModule.forRoot({
            eureka: {
                host: process.env.EUREKA_HOST,
                port: process.env.EUREKA_PORT,
                registryFetchInterval: 1000,
                servicePath: '/eureka/apps/',
                maxRetries: 3,
            },
            service: {
                name: 'account',
                port: +process.env.PORT,
            },
            clientLogger: {
                debug: () => false,
                error: console.log,
                info: () => false,
                warn: console.log,
            },
        }),
    ],
})
export class AppModule {}
