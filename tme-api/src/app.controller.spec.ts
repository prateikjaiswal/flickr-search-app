import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { Filter } from '../../library/filter.dto';
import { Photo } from '../../library/photo.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('search', () => {
    it('it should return an array of Photo', async () => {
      const result = [new Photo()];
      const filter: Filter = { filter: ['icecream'] };
      jest.spyOn(appService, 'searchPhotos').mockImplementation(filter => {
        return new Promise(resolve => {
          resolve(result);
        });
      });

      expect(await appController.searchPhotos(filter)).toBe(result);
    });
  });
});
