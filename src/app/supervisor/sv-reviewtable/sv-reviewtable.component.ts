import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sv-reviewtable',
  templateUrl: './sv-reviewtable.component.html',
  styleUrls: ['./sv-reviewtable.component.css'],
})
export class SvReviewtableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  dataSource: MatTableDataSource<any>;
  dynamicDisplayedColumns = [];
  table: any = [];
  ngOnInit(): void {
    // console.log('Data: ', this.data);
    // console.log('Data: ', this.data.dataKey);
    this.table = this.data.dataKey;
    if (this.table.length > 0) {
      this.dynamicDisplayedColumns = Object.keys(this.table[0]);
      console.log('Dynamic displayed cols: ', this.dynamicDisplayedColumns);
    }
    this.dataSource = new MatTableDataSource<any>(this.table);
    this.dataSource.paginator = this.paginator;
  }
}
