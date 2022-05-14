import { Injectable } from '@angular/core';

import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private personList:Person[] = [
    {
      id:1,
      firstName: 'Bob',
      lastName: 'Bobs',
    },
    {
      id:2,
      firstName: 'Mak',
      lastName: 'Maks',
    },
    {
      id:3,
      firstName: 'Mil',
      lastName: 'Mils',
    },
  ]

  constructor() { }

  getPersonList() { 
    return this.personList;
  }

  getPersonForId(id: number) {
    return this.personList.filter(x => x.id === id).map(x => x);
  }

  updatePerson(body: Person) {
    this.personList.filter(x => x.id === body.id).map(x => {
      x.firstName = body.firstName;
      x.lastName = body.lastName;
    });
  }

  addNewPerson(body:Person) {
    body.id = Math.floor(Math.random() * 10000);
    this.personList.push(body);
  }

  deletePerson(id: number | undefined) {
    console.log(id);
    
    if(id) {this.personList = this.personList.filter(function(elem) { return elem.id != id; });}
  }
}
