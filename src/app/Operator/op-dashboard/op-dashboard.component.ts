import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OperatorService } from '../operator.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-op-dashboard',
  templateUrl: './op-dashboard.component.html',
  styleUrls: ['./op-dashboard.component.css'],
})
export class OpDashboardComponent implements OnInit, OnDestroy {
  public bays = [];
  public cells = [];
  public cellValues = [];
  public checklists = [];
  public activities = [];

  public userName;
  public getroles;
  private userId;
  sample = new Array();

  roleSub;
  opId: any;
  roles: any;
  data: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [
    'SNo',
    'username',
    'Bay',
    'CellName',
    'ChecklistName',
    'UpdatedTime',
    'status',
  ];

  constructor(private opService: OperatorService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.userName = this.opService.currentUsername;

    this.opService.getRoles(this.userName);
    this.roleSub = this.opService.getRoleUpdateListener().subscribe((roles) => {
      this.getroles = roles;
      this.roles = this.getroles.cell;
      this.userId = this.getroles._id;
      console.log('Cells :', this.roles);
      this.roles.forEach((x) => {
        this.cells.push({
          id: x._id,
          Bay: x.Bay,
          cellName: x.cellName,
          checklistName: x.checklistName,
        });
      });

      this.cells.forEach((x, index) => {
        this.bays.push(x.Bay);
      });

      this.bays = [...new Set(this.bays)];

      var arr = [];
      this.bays.forEach((y, index) => {
        arr = [];
        this.cells.forEach((x, index) => {
          if (y == x.Bay && !arr.includes(x.cellName)) {
            arr.push(x.cellName);
          }
        });
        this.sample[y] = arr;
      });
      console.log('User id:', this.userId);
      this.opService.getUserRecents(this.userId);
    });

    this.opService.getRecentsUpdateListener().subscribe((data) => {
      this.activities = [];
      this.data = data;
      var updateddate;
      this.data.forEach((x) => {
        updateddate = this.datePipe.transform(
          x.lastUpdated,
          'MMM d, y, h:mm a'
        );
        console.log('Updated data :', updateddate);
        this.activities.push({
          id: x._id,
          username: x.User[0].userName,
          Bay: x.Sheet[0].cell[0].Bay,
          CellName: x.Sheet[0].cell[0].cellName,
          ChecklistName: x.Sheet[0].cell[0].checklistName,
          UpdatedTime: updateddate,
          value: x.Sheet[0].value,
          status: x.status,
        });
      });
      //console.log('Before Actvity push :', this.activities);

      console.log('Activities :', this.activities);
      this.dataSource = new MatTableDataSource<any>(this.activities);
    });
  }

  openExpansion(cell, bay) {
    console.log('openExpansion: ', cell, bay);
    this.checklists = [];
    this.cells.forEach((element) => {
      if (element.cellName == cell && element.Bay == bay) {
        this.checklists.push(element.checklistName);
      }
    });
  }

  panelOpenState = false;

  ngOnDestroy(): void {}
}
