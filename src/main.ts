import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable class-validator
  app.useGlobalPipes(new ValidationPipe())

  // Enable swagger
  const config = new DocumentBuilder()
    .setTitle('Floorplan API')
    .setDescription('IAW - Trabajo Integrador. Manuel Silenzi')
    .setVersion('0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
