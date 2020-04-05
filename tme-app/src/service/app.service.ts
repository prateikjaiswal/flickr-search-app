import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Photo } from '../../../library/photo.dto';
import { Filter } from '../../../library/filter.dto';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http: HttpClient
  ) { }

  searchPhoto(searchStr: string): Observable<any> {
    const search = searchStr.split(' ');
    const filter: Filter = {
      filter: search
    };
    return this.http.post('http://18.208.109.236:3000', filter).pipe(
      map((x: Photo) => x)
    );
  }
}
