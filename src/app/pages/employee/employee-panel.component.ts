import { Component, OnInit } from '@angular/core';

import { EmployeeService } from './services/employee-api.service'
import { TypeToast } from './enums/type-toast.enum';

@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.scss']
})
export class EmployeePanelComponent implements OnInit {

  toastIsActive = false;
  toastType: TypeToast = TypeToast.Create;
  constructor(private employeeService: EmployeeService) { }

  personList = this.employeeService.getPersonList();

  ngOnInit() {
  }

  toastCreate() {
    this.toastIsActive = true;
    this.toastType = TypeToast.Create;
  }

  toastUpdate() {
    this.toastIsActive = true;
    this.toastType = TypeToast.Update;
  }

  toastDelete() {
    this.toastIsActive = true;
    this.toastType = TypeToast.Delete;
  }

  onCancellation(status: boolean) {
    console.log('dfsd');
    
    this.toastIsActive = status;
  }

}
