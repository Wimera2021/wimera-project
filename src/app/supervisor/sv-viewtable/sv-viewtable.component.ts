import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SupervisorService } from '../supervisor.service';
import { SvReviewtableComponent } from '../sv-reviewtable/sv-reviewtable.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sv-viewtable',
  templateUrl: './sv-viewtable.component.html',
  styleUrls: ['./sv-viewtable.component.css'],
})
export class SvViewtableComponent implements OnInit {
  data: any = [];
  activities: any = [];
  viewTable: any = [];
  approvalStatus: string;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'SNo',
    'username',
    'Bay',
    'CellName',
    'ChecklistName',
    'UpdatedTime',
    'action',
    'status',
  ];

  username;

  constructor(
    private supervisorservice: SupervisorService,
    private dialog: MatDialog,
    private date: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('uname');
    console.log('SV-viewtable:', this.username);
    this.supervisorservice.currentUser = this.username;
    console.log('SV-viewtable ser:', this.supervisorservice.currentUser);

    this.supervisorservice.getactivities();
    this.supervisorservice.getActivitiesUpdatedListener().subscribe((data) => {
      this.activities = [];
      this.data = data;
      console.log('Activity in ts :', this.data);
      var updateddate;
      console.log('Before Actvity push :', this.activities);
      this.data.forEach((x) => {
        updateddate = this.date.transform(x.lastUpdated, 'MMM d, y, h:mm a');
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

  onTable(e) {
    console.log('Table :', e);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.viewTable = e.value;
    this.dialog.open(SvReviewtableComponent, {
      width: '1300px',
      data: {
        dataKey: this.viewTable,
      },
    });
  }

  onStatusUpdate(e, val) {
    console.log('Status Update :', e.id, val);
    this.supervisorservice.updateStatus(e.id, val);
  }
}
