import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmpListComponent } from './emp-list.component';
import { EmployeeResponse } from 'src/app/EmployeeResponse';


describe('EmpListComponent', () => {
  let component: EmpListComponent;
  let fixture: ComponentFixture<EmpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpListComponent ],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('viewed correctly',()=>{

    // created_at Mon Feb 07 2022 22:26:03 GMT+0530 (India Standard Time) format
    component.employees = <EmployeeResponse[]>[
      {
        id: 1,
        name: 'test',
        email: 'test@gmail.com',
        department: 'IT',
        created_at: 'Mon Feb 07 2022 22:26:03 GMT+0530 (India Standard Time)',
      },
      {
        id: 2,
        name: 'test2',
        email: 'test2@gmail.com',
        department: 'IT',
        created_at: 'Sun Feb 06 2022 22:26:03 GMT+0530 (India Standard Time)',
      },
      {
        id: 3,
        name: 'akshay',
        email: 'akshay@gmail.com',
        department: 'IT',
        created_at: 'Fri Feb 05 2022 22:26:03 GMT+0530 (India Standard Time)', 
      }
    ];

    component.sortBy = 'name';
    component.sort(component.sortBy);
    expect(component.employees[0].name).toBe('akshay');
    expect(component.employees[1].name).toBe('test');
    expect(component.employees[2].name).toBe('test2');

    component.sortBy = 'email';
    component.sort(component.sortBy);
    expect(component.employees[0].email).toBe('akshay@gmail.com')
  })



});
