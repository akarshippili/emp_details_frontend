import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Employee';
import { EmployeeResponse } from '../../EmployeeResponse';


@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  employees:EmployeeResponse[] = [];
  perPage:number=12;
  perPageList:number[]=[5,10,15,25,50];
  curPageEmployees:EmployeeResponse[]=[];
  curPageNumber:number=1;
  numberOfPages!:number;
  sortBy:any="id";
  sortByArr:string[]=["created_at","name","email","department"];

  sort(sortBy:string){
    if(sortBy=="name"){
      this.employees.sort((a:EmployeeResponse,b:EmployeeResponse)=>{
        return a.name.localeCompare(b.name);
      });
    }
    else if(sortBy=="email"){
      this.employees.sort((a:Employee,b:Employee)=>{
        return a.email.localeCompare(b.email);
      });
    }
    else if(sortBy=="department"){
      this.employees.sort((a:Employee,b:Employee)=>{
        return a.department.localeCompare(b.department);
      });
    }
    else if(sortBy=="created_at"){
      this.employees.sort((a:EmployeeResponse,b:EmployeeResponse)=>{
        let created_at_a = new Date(a.created_at.trim());
        let created_at_b = new Date(b.created_at.trim());
        return created_at_b.getTime()-created_at_a.getTime();
      });
    }
  }
  

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

  setSortBy(form:any){
    this.sortBy = form.target.elements.sortBy.value;
    this.sort(this.sortBy);
    this.curPageEmployees = this.employees.slice((this.curPageNumber-1)*(this.perPage),this.perPage*this.curPageNumber);
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
      console.log(data);
      this.employees = data;
      this.sort("created_at");
      this.curPageEmployees = this.employees.slice(0,this.perPage);
      this.numberOfPages = Math.ceil(this.employees.length/this.perPage);
    });
  }

}
