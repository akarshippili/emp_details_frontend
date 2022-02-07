import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { EmployeeService } from './employee.service';
import { EmployeeResponse } from '../EmployeeResponse';
import { Employee } from '../Employee';

// describe('EmployeeService', () => {
//   let service: EmployeeService;
//   let httpMock:HttpClientTestingModule;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//     });

//     service = TestBed.inject(EmployeeService);
//     httpMock = TestBed.inject(HttpClientTestingModule);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEmployees should return an Observable<EmployeeResponse[]>', () => {
    const dummyEmployees: EmployeeResponse[] = [
      {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        department: 'IT',
        created_at: '2020-01-01',
      },
      {
        id: 2,
        name: 'test2',
        email: 'test2@gmail.com',
        department: 'IT',
        created_at: '2020-01-01',
      }
    ];

    service.getEmployees().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(dummyEmployees);
    }
    );

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployees);

  });


  it('getEmployeeId should return an Observable<Employee>', () => {
    const dummyEmployee: EmployeeResponse = {
      id: 1,
      name: 'test',
      email: 'test@gmail.com',
      department: 'IT',
      created_at: '2020-01-01',
    };

    service.getEmployeeById(1).subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    })
    const req = httpMock.expectOne(service.apiUrl + '/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEmployee);
  });

  it('addEmployee should return an Observable<Employee>', () => {
    const dummyEmployee: Employee = {
      name: 'test',
      email: 'test@gmail.com',
      department: 'IT',
    };

    service.addEmployee(dummyEmployee).subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    }
    );

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyEmployee);
  })


  it('update should return an Observable<Employee>', () => {
    const dummyEmployee: Employee = {
      id: 1,
      name: 'test',
      email: 'test@gmail.com',
      department: 'IT',
      created_at: '2020-01-01',
    };

    const dummyEmployeeResponse: EmployeeResponse = {
      id: 1,
      name: 'test',
      email: 'test@gmail.com',
      department: 'IT',
      created_at: '2020-01-01',
    }

    service.updateEmployee(dummyEmployee).subscribe(employee => {
      expect(employee.department).toBeInstanceOf(String);
      expect(employee.name).toBeInstanceOf(String);
      expect(employee.email).toBeInstanceOf(String);
      expect(employee.created_at).toBeInstanceOf(String);
      expect(employee.id).toBeInstanceOf(Number);
    });

    const req = httpMock.expectOne(service.apiUrl + '/1');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyEmployeeResponse);
  })


  it('delete should return an Observable<Employee>', () => {
    const dummyEmployee: Employee = {
      id: 1,
      name: 'test',
      email: 'test@gmail.com',
      department: 'IT',
      created_at: '2020-01-01',
    };

    service.deleteEmployee(dummyEmployee).subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpMock.expectOne(service.apiUrl + '/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyEmployee);

  })



})