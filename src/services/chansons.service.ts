import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChansonsService {
  url = 'http://localhost:3000/chansons'
  constructor(private http: HttpClient) { }

  listofchansons(): Observable<any> {
    return this.http.get(this.url)
  }
  oneChanson(id: number): Observable<any> {
    return this.http.get(this.url + "/one/" + id)
  }
}
