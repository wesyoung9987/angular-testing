// Reference: https://medium.com/spektrakel-blog/angular-testing-snippets-httpclient-d1dc2f035eb8

import { TestBed, inject } from '@angular/core/testing';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import { AuthAsyncService } from './auth-async.service';
import {async} from "@angular/core/testing";
import {HttpRequest} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";

describe('AuthAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [AuthAsyncService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([AuthAsyncService], (service: AuthAsyncService) => {
    expect(service).toBeTruthy();
  }));

  it('should send an expected login request', async(inject([AuthAsyncService, HttpTestingController], (service: AuthAsyncService, backend: HttpTestingController) => {
    service.login('foo', 'bar').subscribe();

    backend.expectOne((req: HttpRequest<any>) => {
      const body  = new HttpParams({ fromString: req.body });

      return req.url === 'auth/login'
        && req.method === 'POST'
        && req.headers.get('Content-Type') === 'application/x-www-form-urlencoded'
        && body.get('user') === 'foo'
        && body.get('password') === 'bar';
    }, `POST to 'auth/login' with form-encoded user and password`);
  })));

  it(`should emit 'false' for 401 Unauthorized`, async(inject([AuthAsyncService, HttpTestingController], (service: AuthAsyncService, backend: HttpTestingController) => {
    service.login('foo', 'bar').subscribe((next) => {
      expect(next).toBeFalsy();
    });

    backend.expectOne('auth/login').flush(null, { status: 401, statusText: 'Unauthorized'});
  })));

  it(`should emit 'true' for 200 Ok`, async(inject([AuthAsyncService, HttpTestingController], (service: AuthAsyncService, backend: HttpTestingController) => {
    service.login('foo', 'bar').subscribe((next) => {
      expect(next).toBeTruthy();
    });

    backend.expectOne('auth/login').flush(null, { status: 200, statusText: 'Ok' });
  })));

  // Testing example
  // 1. declare as async test since the HttpClient works with Observables
  // 2. inject HttpClient and HttpTestingController into the test
  // it('should issue a request', async(inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
  //   // 3. send a simple request
  //   http.get('/foo/bar').subscribe();
  //
  //   backend.expectOne({
  //     url: '/foo/bar',
  //     method: 'GET'
  //   })
  // })));
});
