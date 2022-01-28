import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Employee';

const httpOtions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5000/employee';
  constructor(private http:HttpClient) { }
  
  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.apiUrl) as Observable<Employee[]>;
  }

  deleteEmployee(employee:Employee): Observable<Employee> {
    const url = this.apiUrl + '/' + employee.id;
    return this.http.delete(url) as Observable<Employee>;
  }

  addEmployee(employee:Employee): Observable<Employee> {
    return this.http.post(this.apiUrl,employee,httpOtions) as Observable<Employee>;
  }

  updateEmployee(employee:Employee): Observable<Employee> {
    const url = this.apiUrl + '/' + employee.id;
    return this.http.put(url,employee,httpOtions) as Observable<Employee>;
  }

}
