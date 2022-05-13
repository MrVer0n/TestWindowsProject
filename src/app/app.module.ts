import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeePanelComponent } from './pages/employee/employee-panel.component'
import { ToastComponent } from './pages/employee/components/toast/toast.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeePanelComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
