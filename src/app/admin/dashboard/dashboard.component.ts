import { IfStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatButtonToggle,
  MatButtonToggleChange,
} from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dynamicDisplayedColumns = [];
  isSheet: boolean = false;
  NoVal: boolean = true;
  dataSource: MatTableDataSource<any>;
  cells = [];
  checkLists = [];
  cellData: any;
  currentBay;
  currentCell;
  cellSub: Subscription;
  selectedindex;
  checkListVal = [];
  bays = [];
  data = [];
  lists = [];
  isTable = false;
  sheet = [];
  sheetvalSub;
  sheetvals = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.selectedindex = 0;

    this.adminService.getSheets();
    this.sheetvalSub = this.adminService
      .getSheetsUpdatedListener()
      .subscribe((sheets) => {
        this.sheet = sheets;
        console.log('In sheet component', this.sheet);
        this.sheet.map((x) => {
          this.sheetvals.push({
            Bay: x.cell[0].Bay,
            CellName: x.cell[0].cellName,
            ChecklistName: x.cell[0].checklistName,
            value: x.value,
            OpNo: x.OperationNo,
          });
        });
        console.log('Table data :', this.sheetvals);
      });
    this.adminService.getCells();
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cellData = users;
        console.log('Dashboard ngOnInit: ', this.cellData);
        this.cellData.map((x) => {
          this.data.push({
            Bay: x.Bay,
            cell: x.cellName,
            checklist: x.checklistName,
          });
        });
        console.log('Data:', this.data);
        this.bays = this.cellData.map((bay) => {
          return bay.Bay;
        });
        this.bays = [...new Set(this.bays)];

        this.checkLists = this.cellData.map((list) => {
          return { cell: list.cellName, checklist: list.checklistName };
        });
        var baycellval = this.cellData[0];
        console.log(
          'baycellval',
          baycellval.Bay,
          baycellval.cellName,
          baycellval.checklistName
        );
        console.log('List :', this.lists);

        console.log('Lists: ', this.lists);
        console.log('checkLists: ', this.checkLists);

        console.log('Add Role CellNaem ngOnInit: ', this.cells);
      });
  }

  onBayChange(event: MatTabChangeEvent) {
    //console.log('Bay: ', event.index);
    this.isTable = false;
    this.isSheet = false;
    this.NoVal = true;
    var bayId = event.index;
    var bayVal = this.bays[bayId];
    //console.log('onBayChange', bayVal);
    this.cells = [];
    this.lists = [];
    for (var i = 0; i < this.cellData.length; i++) {
      if (this.cellData[i].Bay == bayVal) {
        //console.log('Bay data:', this.cellData[i].Bay);
        this.cells.push(this.cellData[i].cellName);
      }
    }
    this.cells = [...new Set(this.cells)];
    // for (var i = 0; i < this.cellData.length; i++) {
    //   if (this.cells[0] == this.cellData[i].cellName) {
    //     this.lists.push(this.cellData[i].checklistName);
    //   }
    // }
  }

  onCellChange(event: MatButtonToggleChange, bay) {
    var str = event.value;
    this.currentBay = bay;
    this.currentCell = event.value;
    this.lists = [];
    for (var i = 0; i < this.cellData.length; i++) {
      if (str == this.cellData[i].cellName && bay == this.cellData[i].Bay) {
        this.lists.push(this.cellData[i].checklistName);
      }
    }
    console.log('Event :', event.value, bay);
  }

  onTableValues(sheet) {
    if (sheet.length > 0) {
      this.dynamicDisplayedColumns = Object.keys(sheet[0]);
    }
    this.dataSource = new MatTableDataSource<any>(sheet);
    this.dataSource.paginator = this.paginator;
  }

  SheetValues(Bay, Cell, name) {
    console.log('SheetValues called', Bay, Cell, name, this.sheetvals.length);

    var value = [];
    for (var i = 0; i < this.sheetvals.length; i++) {
      console.log(
        'For loop valuess',
        this.sheetvals[i].Bay,
        this.sheetvals[i].CellName,
        this.sheetvals[i].ChecklistName
      );
      if (
        Bay == this.sheetvals[i].Bay &&
        Cell == this.sheetvals[i].CellName &&
        name == this.sheetvals[i].ChecklistName
      ) {
        value = this.sheet[i].value;
      }
    }
    if (value.length > 0) {
      console.log('Inside if loop');
      //this.isSheet = true;
      this.isSheet = false;
      this.isTable = true;
      this.onTableValues(value);
      console.log('Sheet value :', value);
    } else if (value.length <= 0) {
      console.log('Inside else if loop');
      this.isTable = false;
      this.isSheet = true;
    }
  }

  onClick(name) {
    this.NoVal = false;
    console.log('onClick: ', this.currentBay, this.currentCell, name);
    this.SheetValues(this.currentBay, this.currentCell, name);
  }

  ngOnDestroy() {
    this.sheetvalSub.unsubscribe();
  }
}
