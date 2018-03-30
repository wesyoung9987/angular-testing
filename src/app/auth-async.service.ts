import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthAsyncService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<boolean> {
    const body = new HttpParams()
      .set('user', user)
      .set('password', password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post('auth/login', body.toString(), { headers, observe: 'response' })
      .map((res: HttpResponse<Object>) => res.ok)
      .catch((err: any) => Observable.of(false));
  }

}
