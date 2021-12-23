import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OperatorService } from '../operator.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChecklistsComponent } from '../checklists/checklists.component';

@Component({
  selector: 'app-op-sheet',
  templateUrl: './op-sheet.component.html',
  styleUrls: ['./op-sheet.component.css'],
})
export class OpSheetComponent implements OnInit {
  sheetVals = [];
  cellVals = [];
  cardvals = [];
  bay;
  isDate: boolean = false;
  cell;
  row: any = [];
  checklist;
  tablevals = [];
  dynamicDisplayedColumns = [];
  currentDate = new Date();
  today: any;
  objid: any;
  opId: any;
  userName: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private opService: OperatorService,
    private date: DatePipe,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private opChecklists: ChecklistsComponent
  ) {}

  ngOnInit(): void {
    this.opId = this.opService.opId;
    this.bay = this.opService.currentcardvals[0].Bay;
    this.cell = this.opService.currentcardvals[0].cellName;
    this.checklist = this.opService.currentcardvals[0].checklistName;
    // console.log(this.bay);
    this.route.parent.params.subscribe((params) => {
      this.userName = params.uname;
      //console.log('Params :', params.uname);
    });

    console.log('Username from route Opsheet: ', this.userName);
    this.opService.getSheets();
    this.opService.getSheetsUpdateListener().subscribe((sheets) => {
      this.sheetVals = sheets;
      console.log('Sheet values in op-sheet :', this.sheetVals);
      this.sheetVals.map((x) =>
        this.cellVals.push({ id: x._id, cell: x.cell, sheet: x.value })
      );
      console.log('Cell values :', this.cellVals);
      console.log(this.opService.currentcardvals[0]);
      console.log(this.bay, this.cell, this.checklist);
      this.cellVals.forEach((x) => {
        if (
          this.bay == x.cell[0].Bay &&
          this.cell == x.cell[0].cellName &&
          this.checklist == x.cell[0].checklistName
        ) {
          this.objid = x.id;
          this.tablevals = x.sheet;
          console.log('Filtered val :', this.tablevals);
          console.log('Objid :', this.objid);
        }
      });
      let dte = new Date();
      dte.setDate(dte.getDate() - 1);
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.today = this.date.transform(this.currentDate, 'MMM d');
      let yesterday = this.date.transform(dte, 'MMM d');
      let nextday = this.date.transform(tomorrow, 'MMM d');

      //let nextday = this.date.transform(dte, 'MMM d');
      // console.log(this.today, yesterday, nextday);
      const datearr = [this.today];
      var curdate =
        new Date().getDate().toString() +
        (new Date().getMonth() + 1).toString();

      // console.log('Current data :', curdate);
      //var objkeys = Object.keys(this.tablevals[0]);
      //console.log('Object Keys :', objkeys);

      if (this.tablevals.length > 0) {
        this.dynamicDisplayedColumns = Object.keys(this.tablevals[0]);
        this.dynamicDisplayedColumns.map((x) => {
          if (x == this.today) {
            this.isDate = true;
          }
          // if (x != this.today) {
          //   console.log('Inside x != this.today');
          // }
        });

        if (!this.isDate) {
          this.tablevals.forEach((x) => {
            datearr.forEach((y) => {
              x[y] = '';
            });
          });
        }

        console.log('Isdate: ', this.isDate);
        this.dynamicDisplayedColumns = Object.keys(this.tablevals[0]);
        console.log('Dynamic displayed cols: ', this.dynamicDisplayedColumns);
      }
      this.dataSource = new MatTableDataSource<any>(this.tablevals);
      this.dataSource.paginator = this.paginator;
    });
  }

  onUpdate() {
    console.log('Row Val :', this.row, this.tablevals[0][this.today]);

    this.row.forEach((x, index) => {
      this.tablevals[index][this.today] = x;
    });
    this.opService.UpdateSheet(this.objid, this.tablevals);
    this.opService.UpdateActivity(this.opId, this.objid);
    this.opChecklists.isNavigate = false;
    this.router.navigate(['../'], { relativeTo: this.route });
    //console.log('After Update :',this.objid ,this.tablevals);
  }
  onBack() {
    this.opChecklists.isNavigate = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
