import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageNumber!:number;
  @Input() curPageNumber!:number;
  @Output() pageClick = new EventEmitter<number>();


  onClick(){
    this.pageClick.emit(this.pageNumber);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
