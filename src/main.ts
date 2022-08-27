import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
 

  const configs = new DocumentBuilder()
    .setTitle('BEC')
    .setDescription('Breakthrough Engineering Crew')
    .setVersion('1.0')
    .addTag('Becs')
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
  
  // await app.listen(process.env.PORT || 3500);
}
bootstrap();
