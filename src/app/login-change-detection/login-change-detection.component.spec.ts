// Reference: https://codecraft.tv/courses/angular/unit-testing/change-detection/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from "@angular/core";
import {By} from '@angular/platform-browser';

import { LoginChangeDetectionComponent } from './login-change-detection.component';
import {AuthService} from "../auth.service";

describe('LoginChangeDetectionComponent', () => {
  let component: LoginChangeDetectionComponent;
  let fixture: ComponentFixture<LoginChangeDetectionComponent>;
  let authService: AuthService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginChangeDetectionComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(LoginChangeDetectionComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided by the TestBed
    authService = TestBed.get(AuthService);

    // get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a'));

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('log in button to be shown if user is not authenticated', () => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
  });

  it('log out button to be shown if user is authenticated', () => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});
