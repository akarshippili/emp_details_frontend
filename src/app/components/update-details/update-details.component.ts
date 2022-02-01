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

  onSubmit(){
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
        console.log(httpErrorResponce.error.error) 
        this.errorMessage = httpErrorResponce.error.error;
      }
    )
  }

}
