import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cells',
  templateUrl: './edit-cells.component.html',
  styleUrls: ['./edit-cells.component.css'],
})
export class EditCellsComponent implements OnInit {
  cellId: string;
  cell: any;
  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<EditCellsComponent>
  ) {}

  ngOnInit(): void {
    this.cellId = this.adminService.getCellId();
    console.log('this.cell :', this.cellId);
    this.adminService.getCell(this.cellId).subscribe((userData) => {
      // console.log('edit Role: ', userData);
      this.cell = {
        cellName: userData.cellName,
        checklistName: userData.checklistName,
        Bay: userData.Bay,
        MacNo: userData.MacNo,
      };
    });
  }

  onUpdate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.adminService.updateCell(this.cellId, form.value);
    setTimeout(() => {
      this.adminService.getCells();
    });
    this.onCancel(form);
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }
}
