import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Employee } from '../../Employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private employeeService:EmployeeService,private router:Router) { }
  id!:number;

  name:string = "";
  email:string = "";
  department:string = "";

  errorMessage:string = "";
  errorDesc:string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.name = data.name;
      this.email = data.email;
      this.department = data.department;


      // console.log({
      //   name:this.name,
      //   email:this.email,
      //   department:this.department
      // });
    })
  }

  isEmail(email:string):boolean{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  onSubmit(){
    if(this.isEmail(this.email)==false){
      this.errorMessage = "Invalid Email";
      this.errorDesc = "Please enter a valid email";
      return;
    }

    if(this.name==""){
      this.errorMessage = "Invalid Name";
      this.errorDesc = "Please enter a valid name";
      return;
    }

    const employee:Employee = {
      id:this.id,
      name:this.name,
      email:this.email,
      department:this.department
    }
    
    this.employeeService.updateEmployee(employee)
    .subscribe(data => {
      this.router.navigate(['/']);
    },
      httpErrorResponce => {
        console.log(httpErrorResponce.error) 
        this.errorMessage = httpErrorResponce.error.error;
        this.errorDesc = httpErrorResponce.error.exception;
      }
    )
  }

}
