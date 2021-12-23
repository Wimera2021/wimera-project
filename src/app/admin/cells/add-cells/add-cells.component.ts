import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-cells',
  templateUrl: './add-cells.component.html',
  styleUrls: ['./add-cells.component.css'],
})
export class AddCellsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddCellsComponent>,
    public adminService: AdminService
  ) {}

  public isLoading: boolean = false;
  ngOnInit(): void {}

  oncreateCell(form: NgForm) {
    console.log('Form Submitted', form.value);
    if (form.invalid) {
      return;
    }
    this.adminService.addCell(form.value);
    setTimeout(() => {
      this.adminService.getCells();
    });
    this.isLoading = true;
    this.onCancel(form);
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }
}
