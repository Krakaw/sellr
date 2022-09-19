import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));

  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      // defaultLayout: 'index',
      partialsDir: join(__dirname, '..', '..', 'views', 'partials'),
    }),
  );

  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
