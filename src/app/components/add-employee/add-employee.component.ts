import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  name: string = "";
  email: string = "";
  department: string = "";

  errorMessage: string = "";
  errDesc: string = "";
  
  constructor(private employeeService:EmployeeService,private router:Router) { }


  isEmail(email:string):boolean{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onSubmit(){
    if(this.isEmail(this.email)==false){
      this.errorMessage = "Invalid Email";
      this.errDesc = "Please enter a valid email";
      return;
    }

    if(this.name==""){
      this.errorMessage = "Invalid Name";
      this.errDesc = "Please enter a valid name";
      return;
    }

    const newEmployee: Employee = {
      name: this.name,
      email: this.email,
      department: this.department
    }
    this.employeeService.addEmployee(newEmployee)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/'])
        },
        httpErrorResponce => {
          console.log(httpErrorResponce.error) 
          this.errorMessage = httpErrorResponce.error.error;
          this.errDesc = httpErrorResponce.error.exception;
        }
      )
  }

  ngOnInit(): void {
  }

}
