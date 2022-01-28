import { Component, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../Employee';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() employee!:Employee;
  @Output() deleteClick = new EventEmitter<Employee>();
  @Output() updateClick = new EventEmitter<Employee>(); 

  constructor(private router:Router) { }
  
  onDeleteClick(employee:Employee){
    this.deleteClick.emit(employee);
  }
  onUpdateClick(employee:Employee){
    this.router.navigate(['/update',employee.id]);
  }



  ngOnInit(): void {
  }

}
