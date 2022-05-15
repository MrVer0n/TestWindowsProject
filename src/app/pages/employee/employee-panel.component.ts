import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs';

import { EmployeeService } from './services/employee-api.service';
import { TypeModals } from './enums/type-modals.enum';
import { ColorToasts } from './enums/color-toasts.enum';
import { Person } from './models/person.model';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.scss'],
})
export class EmployeePanelComponent implements OnInit {
  modalsIsActive = false;
  toastsIsActive = false;
  textMessage = '';
  typeModals = TypeModals.Create;
  colorToasts = ColorToasts.Default;
  newPerson: Person = {
    id: undefined,
    firstName: '',
    lastName: '',
  };
  editablePerson = this.newPerson;
  personList: Person[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getPersonLost();
  }

  getPersonLost() {
    this.employeeService
      .getPersonList(undefined, {})
      .pipe(first())
      .subscribe((response: Person[]) => {
        this.personList = response;
      });
  }

  modalsCreate() {
    this.modalsIsActive = true;
    this.typeModals = TypeModals.Create;
  }

  modalsUpdate(person: Person) {
    this.editablePerson = person;
    this.modalsIsActive = true;
    this.typeModals = TypeModals.Update;
  }

  onActionWithPerson(person: Person) {
    if (person) {
      if(person.id) {
        this.employeeService.updatePerson(undefined, person).pipe(first())
        .subscribe(() => {
          this.getPersonLost();
        });
      } else {
        this.employeeService.addNewPerson(undefined, person).pipe(first())
        .subscribe(() => {
          this.getPersonLost();
        });
      }
      this.textMessage = 'Пользователь сохранён';
      this.colorToasts = ColorToasts.Success;
    }
    this.toastsIsActive = true;
    this.editablePerson = this.newPerson;
    this.onCancellation();
  }

  modalsDelete(person: Person) {
    this.editablePerson = person;
    this.modalsIsActive = true;
    this.typeModals = TypeModals.Delete;
  }

  onDeletePerson(person: Person) {
    if (person) {
      this.employeeService
        .deletePerson(undefined, person)
        .pipe(first())
        .subscribe(() => {
          this.getPersonLost();
        });
      this.textMessage = 'Пользователь удалён';
      this.colorToasts = ColorToasts.Success;
    }
    this.toastsIsActive = true;
    this.editablePerson = this.newPerson;
    this.onCancellation();
  }

  onCancellation() {
    this.editablePerson = this.newPerson;
    this.modalsIsActive = false;
  }

  closeToasts() {
    this.toastsIsActive = false;
  }
}
