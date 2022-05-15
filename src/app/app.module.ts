import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeePanelComponent } from './pages/employee/employee-panel.component'
import { ModalsComponent } from './pages/employee/components/modals/modals.component'
import { ToastsComponent } from './pages/employee/components/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeePanelComponent,
    ModalsComponent,
    ToastsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
