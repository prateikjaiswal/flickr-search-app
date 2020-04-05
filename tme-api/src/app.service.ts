import { Injectable } from '@nestjs/common';
import * as Flickr from 'flickr-sdk';

import { Photo } from '../../library/photo.dto';
import { Filter } from '../../library/filter.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private appKey = '';
  private flickr = new Flickr(this.appKey);

  constructor(private configService: ConfigService) {
    this.appKey = this.configService.get<string>('APP_KEY');
  }

  async searchPhotos(searchText: Filter): Promise<Photo[] | any> {
    try {
      const res = await this.flickr.photos.search({
        text: searchText.filter,
      });
      return res.body.photos.photo as Photo[];
    } catch (error) {
      return error;
    }
  }
}
