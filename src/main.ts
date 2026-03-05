import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Config } from './common/config/config';
import { IEnvConfig } from './common/config/ienv.config';

async function bootstrap() {
  const config: IEnvConfig = Config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearer',
    )
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: '/auth/api/v1/login',
            scopes: {},
          },
        },
      },
      'oauth2',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.rabbitMQ.url],
      queue: config.rabbitMQ.queue,
      queueOptions: { durable: true },
      exchange: config.rabbitMQ.exchange,
      exchangeType: 'fanout',
      noAck: false,
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
