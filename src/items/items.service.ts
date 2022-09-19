import { Injectable } from '@nestjs/common';
import Item from '../models/items/item.entity';
import { Pagination } from '../utils/pagination';

@Injectable()
export class ItemsService {
  async getItems(): Promise<Pagination<Item>> {
    return {
      data: [],
      total: 0,
      page: 0,
      limit: 50,
    } as Pagination<Item>;
  }
}
