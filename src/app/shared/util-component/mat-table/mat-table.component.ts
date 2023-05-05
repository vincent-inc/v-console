import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableT } from '../../model/Mat.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {

  @Input()
  filterDisplay: number = 0;

  @Input()
  matTableT: MatTableT[] = [];

  displayedColumns: string[] = [];
  
  dataSource = new MatTableDataSource(this.matTableT);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.displayedColumns = [];
    this.init();
  }

  init() {
    if(this.matTableT.length > 0) {
      for (const [key, value] of Object.entries(this.matTableT[0])) {
        this.displayedColumns.push(key.toString())
      }
      this.dataSource.data = this.matTableT;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  getValue(element: any, key: any): any {
    for (const [keyT, value] of Object.entries(element)) {
      if(keyT === key)
        return value;
    }

    return "";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.dataSource.filter = '';

    if (this.dataSource.paginator) 
    {
      this.dataSource.paginator.firstPage();
    }
  }

  editFn(): void {

  }

  editRow(row: MatTableT) {

  }

}
