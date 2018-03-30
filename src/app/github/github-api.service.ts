import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {User, SearchResults} from "./github-api.model";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class GithubApiService {
  readonly API_URL = 'https://api.github.com';
  readonly WHAT = ['repositories', 'commits', 'code', 'issues', 'users'];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Object> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  search<T>(what: string, params: HttpParams): Observable<SearchResults<T>> {
    if (this.WHAT.indexOf(what) === -1) {
      return Observable.throw(`Searching for ${what} is not supported. The available tyepes are: ${this.WHAT.join(', ')}.`);
    }
    return this.http.get<SearchResults<T>>(`${this.API_URL}/search/${what}`, { params });
  }

}
