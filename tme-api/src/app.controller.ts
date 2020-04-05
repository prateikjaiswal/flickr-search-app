import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Photo } from '../../library/photo.dto';
import { Filter } from '../../library/filter.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async searchPhotos(@Body() searchText: Filter): Promise<Photo[]> {
    return await this.appService.searchPhotos(searchText);
  }
}
