import { Component, OnInit } from '@angular/core';
import {Note} from '../_models/note';
import {Account} from '../_models/accounts';
import { User } from '../_models/user';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

  public notes: Note[];
  public user: User;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('notes')) {
      this.notes = JSON.parse(sessionStorage.notes);
    }

    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.currentUser);
    }
  }
}

