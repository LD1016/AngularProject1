import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-user',
  //   template: '<h2>John Doe</h2>',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  //   styles: [
  //     `
  //       h2 {
  //         color: blue;
  //       }
  //     `,
  //   ],
})
export class UserComponent implements OnInit {
  // Properties
  user: User;
  //   user: {
  //     firstName: string;
  //     lastName: string;
  //     age: number;
  //     address: {
  //       street: string;
  //       city: string;
  //       state: string;
  //     };
  //   };

  // Methods
  constructor() {
    // this.user = {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   age: 30,
    //   address: {
    //     street: '50 Main st',
    //     city: 'Boston',
    //     state: 'MA',
    //   },
    // };
  }

  ngOnInit() {
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      address: {
        street: '50 Main st',
        city: 'Boston',
        state: 'MA',
      },
    };
  }
}

// interface User {
//   firstName: string;
//   lastName: string;
//   age: number;
//   address: {
//     street: string;
//     city: string;
//     state: string;
//   };
// }
