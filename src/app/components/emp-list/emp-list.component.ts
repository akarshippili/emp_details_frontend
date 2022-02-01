import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Employee';


@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  employees:Employee[] = [];
  perPage:number=5;
  perPageList:number[]=[5,10,15,25,50];
  curPageEmployees:Employee[]=[];
  curPageNumber:number=1;
  numberOfPages!:number;

  constructor(private employeeService:EmployeeService) { }


  prevPage(){
    if(this.curPageNumber>1){
      this.curPageNumber--;
      this.curPageEmployees = this.employees
        .slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
    }
  }

  nextPage(){
    if(this.curPageNumber<this.numberOfPages){
      this.curPageNumber++;
      this.curPageEmployees = this.employees
        .slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
    }
  }

  setPage(page:number){
    this.curPageNumber = page;
    this.curPageEmployees = this.employees
      .slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
  }

  setPerPage(form:any){ 
    this.perPage = form.target.elements.perPage.value;
    this.curPageNumber = 1;
    this.numberOfPages = Math.ceil(this.employees.length/this.perPage);
    this.curPageEmployees = this.employees
      .slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
  }

  deleteEmployee(employee:Employee){
    this.employeeService.deleteEmployee(employee).subscribe(data=>{
      this.employees = this.employees.filter(e=>e.id!==employee.id);
      this.numberOfPages = Math.ceil(this.employees.length/this.perPage);
      this.curPageNumber = this.curPageNumber>this.numberOfPages?this.numberOfPages:this.curPageNumber;
      this.curPageEmployees = this.employees.slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data=>{
      this.employees = data;
      this.curPageEmployees = this.employees.slice(0,this.perPage);
      this.numberOfPages = Math.ceil(this.employees.length/this.perPage);
    });
  }

}
