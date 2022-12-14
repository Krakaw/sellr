import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import config from './utils/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ItemsService } from './items/items.service';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.pg.host,
      port: config.pg.port,
      username: config.pg.user,
      password: config.pg.password,
      database: config.pg.db,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
