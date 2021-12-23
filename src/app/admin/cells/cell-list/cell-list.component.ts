import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddCellsComponent } from '../add-cells/add-cells.component';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { EditCellsComponent } from '../edit-cells/edit-cells.component';

@Component({
  selector: 'app-cell-list',
  templateUrl: './cell-list.component.html',
  styleUrls: ['./cell-list.component.css'],
})
export class CellListComponent implements OnInit {
  cells = [];
  private cellSub: Subscription;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Bay',
    'cellName',
    'checklistName',
    'MacNo',
    'action',
  ];
  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.displayedColumns);
    this.adminService.getCells();
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cells = users;
        this.dataSource = new MatTableDataSource<any>(users);
        console.log('Users ngOnInit: ', this.cells);
      });
  }

  onAddCell() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddCellsComponent, dialogConfig);
  }

  onEdit(value) {
    const dialogConfig = new MatDialogConfig();
    // console.log('Edit: ', value._id);
    console.log('Cell List Edit value', value);
    this.adminService.postCellId(value);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(EditCellsComponent, dialogConfig);
  }

  onDelete(value) {
    this.adminService.deleteCell(value._id);
    setTimeout(() => {
      this.adminService.getCells();
    });
  }
}
