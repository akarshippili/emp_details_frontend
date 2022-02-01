import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmpListComponent,
    ListItemComponent,
    AddEmployeeComponent,
    UpdateDetailsComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: EmpListComponent},
      {path: 'add', component: AddEmployeeComponent},
      {path: 'update/:id', component: UpdateDetailsComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
