import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/admin.service';
import { StepperImportComponent } from '../../sheet/stepper-import/stepper-import.component';
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
})
export class SheetComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Bay', 'CellName', 'ChecklistName', 'OpNo'];
  cells = [];
  isLoading: boolean = false;
  isVisible: boolean = false;
  sheet = [];
  sheetSub;
  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.adminService.getSheets();
    this.sheetSub = this.adminService
      .getSheetsUpdatedListener()
      .subscribe((sheets) => {
        this.sheet = sheets;
        console.log('In sheet component', this.sheet);
        console.log('Cell Value:', this.sheet[0].OperationNo);
        this.sheet.map((x) => {
          console.log('Inside Map Function :', x);
          this.cells.push({
            Bay: x.cell[0].Bay,
            CellName: x.cell[0].cellName,
            ChecklistName: x.cell[0].checklistName,
            OpNo: x.OperationNo,
          });
        });
        console.log('Table data :', this.cells);
        this.dataSource = new MatTableDataSource<any>(this.cells);
      });
  }

  onEdit(e: Event) {
    console.log(e);
  }

  onDelete(e: Event) {
    console.log(e);
  }

  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    this.isVisible = true;
    this.dialog.open(StepperImportComponent, dialogConfig);
  }
  ngOnDestroy() {
    this.sheetSub.unsubscribe();
  }
}
