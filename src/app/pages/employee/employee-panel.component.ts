import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './services/employee-api.service'
import { TypeModals } from './enums/type-modals.enum';
import { ColorToasts } from './enums/color-toasts.enum';
import { Person } from './models/person.model';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.scss']
})
export class EmployeePanelComponent implements OnInit {

  modalsIsActive = false;
  toastsIsActive = false;
  textMessage = ''
  typeModals = TypeModals.Create;
  colorToasts = ColorToasts.Default;
  newPerson:Person = {
    id: undefined,
    firstName: '',
    lastName: '',
  }
  editablePerson = this.newPerson;
  personList = this.employeeService.getPersonList();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
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

  modalsDelete(person: Person) {
    this.editablePerson = person;
    this.modalsIsActive = true;
    this.typeModals = TypeModals.Delete;
  }

  onActionWithPerson(person: Person) {
    if(person) {
      person.id ? this.employeeService.updatePerson(person) : this.employeeService.addNewPerson(person);
      this.textMessage='Пользователь сохранён';
      this.colorToasts = ColorToasts.Success;
    }
    this.toastsIsActive = true;
    this.editablePerson = this.newPerson;
    this.onCancellation();
  }
  onDeletePerson(person: Person) {
    console.log(person);
    
    if(person) {
      this.employeeService.deletePerson(person.id)
      this.textMessage='Пользователь удалён';
      this.colorToasts = ColorToasts.Success;
    }
    this.toastsIsActive = true;
    this.editablePerson = this.newPerson;
    this.onCancellation();
    this.personList = this.employeeService.getPersonList();
  }
  

  onCancellation() {
    this.editablePerson = this.newPerson;
    this.modalsIsActive = false;
  }

  closeToasts() {
    this.toastsIsActive = false;
  }

}
