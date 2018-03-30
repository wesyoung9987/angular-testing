// Reference: https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {getTestBed} from "@angular/core/testing";

import { GithubComponent } from './github.component';
import {GithubApiService} from "./github-api.service";

const dummyUsers = [
  { login: 'cironunes' }
];

class FakeGithubApiService {
  getUsers() {
    return Observable.of(dummyUsers);
  }
}

describe('GithubComponent', () => {
  let component: GithubComponent;
  let fixture: ComponentFixture<GithubComponent>;

  beforeEach(async(() => {
    let injector;
    let service: GithubApiService;

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ GithubComponent ],
      providers: [
        { provide: GithubApiService, useClass: FakeGithubApiService }
      ]
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(GithubApiService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should load the first users of Github', () => {
      component.ngOnInit();
      component.users.subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });
    });
  });
});
