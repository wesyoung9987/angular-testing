import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {User} from "./github-api.model";
import {GithubApiService} from "./github-api.service";

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  githubForm: FormGroup;
  search: FormControl;
  users: Observable<User[]>;

  constructor(private service: GithubApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.githubForm = this.formBuilder.group({
      search: ['']
    });
    // this.users = this.service.getUsers();
    this.search = (this.githubForm.get('search') as FormControl);

    this.users = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(users => {
        const params = new HttpParams().set('q', users);
        return this.service.search('users', params)
          .map(result => result.items);
      });
  }

}
