import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './shared/services/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors config
  app.enableCors();

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Live Chat App')
    .setDescription('Live Chat App some api')
    .setVersion('0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // prisma config
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(2000);
}
bootstrap();
