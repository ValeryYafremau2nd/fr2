import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@host.docker.internal:5672`],
      queue: 'test',
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
