import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-sv-report',
  templateUrl: './sv-report.component.html',
  styleUrls: ['./sv-report.component.css'],
})
export class SvReportComponent implements OnInit {
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
    'status',
  ];

  todayDate: Date = new Date();
  range = new FormGroup({
    start: new FormControl(new Date().getDate),
    end: new FormControl(new Date().getDate),
  });

  constructor(
    private supervisorservice: SupervisorService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.supervisorservice.getactivities();
    this.supervisorservice.getActivitiesUpdatedListener().subscribe((data) => {
      this.activities = [];
      this.data = data;
      console.log('Activity in ts :', this.data);
      var updateddate;
      console.log('Before Actvity push :', this.activities);
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

  dateTransform(date) {
    return this.datePipe.transform(date, 'MMM d, y');
  }

  dateChange() {
    console.log(this.range);

    this.supervisorservice.getactivities();
    this.supervisorservice.getActivitiesUpdatedListener().subscribe((data) => {
      this.activities = [];
      this.data = data;
      var updateddate;

      let start = this.dateTransform(this.range.value.start);
      let end = this.dateTransform(this.range.value.end);

      this.data.forEach((x) => {
        updateddate = this.dateTransform(x.lastUpdated);
        let intDate = new Date(x.lastUpdated).setHours(0, 0, 0, 0);
        let endDate = new Date(this.range.value.end).setHours(0, 0, 0, 0);
        let startDate = new Date(this.range.value.start).setHours(0, 0, 0, 0);

        console.log('ParseInt int: ', intDate);
        console.log('ParseInt end: ', endDate);

        if (intDate >= startDate && intDate <= endDate) {
          console.log('Inside if');
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
        }
      });
      //console.log('Before Actvity push :', this.activities);

      console.log('Activities :', this.activities);
      this.dataSource = new MatTableDataSource<any>(this.activities);
    });
  }
}
