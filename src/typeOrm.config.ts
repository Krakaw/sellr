import { DataSource } from 'typeorm';
import config from './utils/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Item from './models/items/item.entity';
import Photo from './models/items/photo.entity';
import Home from './models/items/home.entity';
import Tag from './models/items/tag.entity';
import Category from './models/items/category.entity';
import Bundle from './models/items/bundle.entity';

export default new DataSource({
  type: 'postgres',
  host: config.pg.host,
  port: config.pg.port,
  username: config.pg.user,
  password: config.pg.password,
  database: config.pg.db,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [Item, Photo, Home, Tag, Category, Bundle],
});
