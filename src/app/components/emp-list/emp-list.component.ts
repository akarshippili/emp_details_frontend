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
  constructor(private employeeService:EmployeeService) { }

  deleteEmployee(employee:Employee){
    this.employeeService.deleteEmployee(employee).subscribe(data=>{
      this.employees = this.employees.filter(e=>e.id!==employee.id);
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data=>{
      this.employees=data;
    });
  }

}
