import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { TypeModals } from '../../enums/type-modals.enum';
import { Person } from '../../models/person.model';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit, OnDestroy {
  @Input() typeModals!: TypeModals;
  @Input() editablePerson!: Person;
  @Output() cancellationModals = new EventEmitter();
  @Output() actionWithPerson = new EventEmitter();
  @Output() deletePerson = new EventEmitter();

  info = '';
  scrollY: any;
  person: Person = {
    id: undefined,
    firstName: '',
    lastName: '',
  };
  constructor() {}

  ngOnInit(): void {
    this.scrollY = window.scrollY;
    window.scrollTo(0,0);
    document.body.style.position = 'static';
    document.body.style.overflow = 'hidden';
    this.person.id = this.editablePerson.id;
    this.person.firstName = this.editablePerson.firstName;
    this.person.lastName = this.editablePerson.lastName;
  }

  ngOnDestroy(): void {
    document.body.style.position = '';
    document.body.style.overflow = '';
    window.scrollTo(0,this.scrollY);
  }

  savePerson() {
    if (this.person.firstName.length && this.person.lastName.length) {
      this.actionWithPerson.emit(this.person);
    } else {
      this.info = 'Заполните все поля';
    }
  }
}
