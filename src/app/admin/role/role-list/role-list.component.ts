import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AddRoleComponent } from '../add-role/add-role.component';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit, OnDestroy {
  users = [];
  userdata = [];

  userFinal = [];
  userId: string = '';
  cells = [];
  access = [];
  id = [];
  private usersSub: Subscription;

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['role', 'user', 'cell', 'action'];

  dataSource: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers();
    this.usersSub = this.adminService
      .getUserUpdateListener()
      .subscribe((users) => {
        this.users = [];
        this.access = [];
        this.cells = [];
        this.userdata = [...users];
        this.userdata.map((x) => {
          if (x.RoleName != 'Admin') {
            this.users.push(x);
          }
        });
        console.log('Users', this.users);
        this.users.map((x) => {
          this.cells.push(x.cell);
        });
        console.log('Cells', this.cells);
        this.dataSource = new MatTableDataSource<any>(this.users);
      });
  }

  onAddRole() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(AddRoleComponent, dialogConfig);
  }

  onEdit(value) {
    const dialogConfig = new MatDialogConfig();
    // console.log('Edit: ', value._id);
    this.adminService.postUserId(value);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(EditRoleComponent, dialogConfig);
  }

  onDelete(value) {
    this.adminService.deleteUser(value._id);
    setTimeout(() => {
      this.ngOnInit();
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
