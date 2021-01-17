import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];

  showExtended: boolean = true;

  loadUsers: boolean = false;

  enableAdd: boolean = true;

  currentClasses = {};

  currentStyles = {};

  constructor() {}

  ngOnInit(): void {
    this.users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 70,
        address: {
          street: '50 Main st',
          city: 'Boston',
          state: 'MA',
        },
        image: 'http://lorempixel.com/400/400/people/3',
        isActive: true,
        balance: 200,
        registered: new Date('01/22/2020'),
      },
      {
        firstName: 'Keven',
        lastName: 'Smith',
        age: 32,
        address: {
          street: '730 alabama st',
          city: 'Rosemead',
          state: 'FL',
        },
        image: 'http://lorempixel.com/400/400/people/2',
        isActive: false,
        balance: 100,
        registered: new Date('03/21/2019'),
      },
      {
        firstName: 'Ketty',
        lastName: 'Pi',
        age: 22,
        address: {
          street: '23 rooter st',
          city: 'El Moto',
          state: 'AZ',
        },
        image: 'http://lorempixel.com/400/400/people/1',
        isActive: true,
        balance: 50,
        registered: new Date('11/2/2017'),
      },
    ];

    this.loadUsers = true;

    // this.showExtended = false;

    this.addUser({
      firstName: 'Lance',
      lastName: 'Dang',
    });

    this.setCurrentClasses();

    this.setCurrentStyles();
  }

  addUser(user: User): User[] {
    let temp: any;
    temp = this.users.push(user);
    return temp;
  }

  setCurrentClasses(): void {
    this.currentClasses = {
      'bg-success': this.enableAdd,
      'big-text': this.showExtended,
    };
  }

  setCurrentStyles(): void {
    this.currentStyles = {
      'padding-top': this.showExtended ? '0' : '40px',
      'font-size': this.showExtended ? '' : '40px',
    };
  }
}
