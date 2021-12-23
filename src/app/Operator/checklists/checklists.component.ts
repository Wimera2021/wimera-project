import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.component.html',
  styleUrls: ['./checklists.component.css'],
})
export class ChecklistsComponent implements OnInit {
  getroles: any = [];
  roles: any = [];
  cells: any = [];
  currentBay;
  currentCell;
  bays = [];
  ischecklist: boolean = false;
  checkLists = [];
  cellvals = [];
  cardvals = [];
  roleSub;
  opId: any;
  userName: any;
  isNavigate: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private opservice: OperatorService
  ) {}
  gridvals: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'symbol2',
    'symbol3',
    'symbol4',
    'symbol5',
  ];
  id;
  filter$: Observable<string>;

  ngOnInit(): void {
    this.isNavigate = false;
    console.log('Navigate :', this.isNavigate);
    this.userName = this.opservice.currentUsername;
    console.log('Username from route: ', this.userName);
    this.opservice.getRoles(this.userName);
    this.roleSub = this.opservice.getRoleUpdateListener().subscribe((roles) => {
      this.getroles = roles;
      console.log('Roles :', this.getroles);
      // this.getroles.map((x) => {
      //   this.roles.push(x.cell);
      // });
      this.opId = this.getroles._id;
      this.roles = this.getroles.cell;
      console.log('Cells :', this.roles);
      this.roles.forEach((x) => {
        this.cells.push({
          id: x._id,
          Bay: x.Bay,
          cellName: x.cellName,
          checklistName: x.checklistName,
        });
      });
      this.cells.forEach((x) => {
        this.bays.push(x.Bay);
      });
      this.bays = [...new Set(this.bays)];
      console.log('Bay :', this.bays);
    });
  }

  onclickDiv(val) {
    console.log(val);
    this.cardvals.push({
      id: val.id,
      Bay: this.currentBay,
      cellName: this.currentCell,
      checklistName: val.checklist,
    });
    console.log('Card Values :', this.cardvals);
    this.opservice.putcardvalues(this.cardvals, this.opId);
    this.isNavigate = true;
    this.checkLists = [];
    this.ischecklist = false;
    this.router.navigate(['./', val.checklist], { relativeTo: this.route });
  }

  onSelectBay(event) {
    this.cellvals = [];
    var bay = event.value;
    this.currentBay = bay;
    this.cells.forEach((x) => {
      if (bay == x.Bay) {
        this.cellvals.push(x.cellName);
      }
    });
    this.cellvals = [...new Set(this.cellvals)];
    console.log('CellName :', this.cellvals);
  }

  onSelectCell(event) {
    //this.checkLists = [];
    var cell = event.value;
    this.currentCell = cell;
  }

  onChoose() {
    this.checkLists = [];
    this.ischecklist = true;
    this.cells.forEach((x) => {
      if (this.currentBay == x.Bay && this.currentCell == x.cellName) {
        this.checkLists.push({ id: x.id, checklist: x.checklistName });
      }
    });
    console.log('Checklists :', this.checkLists);
  }

  ngOnDestroy() {
    console.log('Ng ondestroy!');
    this.roleSub.unsubscribe();
  }
}
