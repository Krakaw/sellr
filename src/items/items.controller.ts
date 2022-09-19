import {
  Controller,
  Get,
  Injectable,
  Logger,
  Param,
  Render,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Injectable()
@Controller('/home/:homeSlug')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private itemsServer: ItemsService) {}

  @Get('items')
  @Render('layouts/items/index.hbs')
  async getItems(@Param('homeSlug') homeSlug: string) {
    this.logger.log(homeSlug);
    return {
      items: [{ value: 1 }, { value: 2 }],
    };
  }
}
