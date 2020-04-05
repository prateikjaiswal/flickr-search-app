import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/service/app.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';

import { Photo } from '../../../library/photo.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faSearch = faSearch;
  faCheck = faCheck;
  public $searchResult: Observable<Photo[]>;
  public searchbox = 'pepapig';
  constructor(private appService: AppService) {

  }
  ngOnInit(): void {
    this.searchPhotos();
  }


  searchPhotos() {
    this.$searchResult = this.appService.searchPhoto(this.searchbox)
      .pipe(map((y: Photo[]) => {
        y.map(x => {
          x.photo = `https://farm${x.farm}.staticflickr.com/${x.server}/${x.id}_${x.secret}.jpg`;
        });
        return y;
      }));
  }
}
