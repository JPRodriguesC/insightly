import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Insightly API')
    .setDescription('Documentacão da API do Insightly')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(
    parseInt(process.env.PORT || '3001'),
    process.env.HOST || '0.0.0.0',
  );
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
