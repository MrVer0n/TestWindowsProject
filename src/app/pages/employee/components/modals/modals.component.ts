import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TypeModals } from '../../enums/type-modals.enum';
import { Person } from '../../models/person.model';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit {
  @Input() typeModals!: TypeModals;
  @Input() editablePerson!: Person;
  @Output() cancellationModals = new EventEmitter();
  @Output() actionWithPerson = new EventEmitter();
  @Output() deletePerson = new EventEmitter();

  info = '';
  person: Person = {
    id: undefined,
    firstName: '',
    lastName: '',
  };
  constructor() {}

  ngOnInit(): void {
    this.person.id = this.editablePerson.id;
    this.person.firstName = this.editablePerson.firstName;
    this.person.lastName = this.editablePerson.lastName;
  }

  savePerson() {
    if (this.person.firstName.length && this.person.lastName.length) {
      this.actionWithPerson.emit(this.person);
    } else {
      this.info = 'Заполните все поля';
    }
  }
}
