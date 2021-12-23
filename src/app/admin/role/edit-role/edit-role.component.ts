import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent implements OnInit {
  cells = [
    { value: 'cell 1', isSelected: false },
    { value: 'cell 2', isSelected: false },
    { value: 'cell 3', isSelected: false },
    { value: 'cell 4', isSelected: false },
  ];
  selectedCells = [];
  user: any;
  userId: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditRoleComponent>,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userId = this.adminService.getUserId();
    console.log('this.userId :', this.userId);
    this.adminService.getUser(this.userId).subscribe((userData) => {
      // console.log('edit Role: ', userData);
      this.user = {
        RoleName: userData.RoleName,
        userName: userData.userName,
        Password: userData.Password,
      };
      this.selectedCells = userData.cell;
      this.cells = this.cells.map((e) => {
        e.isSelected = this.selectedCells.indexOf(e.value) != -1 ? true : false;
        return e;
      });
      console.log('edit Role cell: ', this.cells);
    });
  }

  onCheckEvent(value, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedCells.push(value);
    } else {
      let index = this.selectedCells.indexOf(value);
      this.selectedCells.splice(index, 1);
    }
    console.log(this.selectedCells);
  }

  onCancel(form: NgForm) {
    form.resetForm();
    this.dialogRef.close();
  }

  onUpdate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.adminService.updateUser(this.userId, form.value, this.selectedCells);
    setTimeout(() => {
      this.adminService.getUsers();
    });
    this.onCancel(form);
  }
}
