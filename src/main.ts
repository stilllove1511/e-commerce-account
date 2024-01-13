import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const port = process.env.PORT || 8083
    // create http server
    const app = await NestFactory.create(AppModule)
    await app.listen(port)
    console.log('app is running on the port ' + port)
}
bootstrap()
