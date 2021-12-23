import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private users: any = [];
  private sheets: any = [];
  public userID: string = '';
  public cellId: string = '';
  public getcellId = [];
  public cellsId = [];
  private cells: any = [];
  private roles: any = [];
  public popcellId: any = [];
  public isAvailable: boolean = false;

  private rolesUpdated = new Subject<any[]>();
  private editId;
  public cellValue: any;
  private usersUpdated = new Subject<any[]>();
  private sheetsUpdated = new Subject<any[]>();
  private cellsUpdated = new Subject<any[]>();
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  constructor(private http: HttpClient, public router: Router) {}

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getSheetsUpdatedListener() {
    return this.sheetsUpdated.asObservable();
  }
  getCellUpdateListener() {
    return this.cellsUpdated.asObservable();
  }
  getUsers() {
    this.http
      .get<{ message: string; users: any }>(
        'http://localhost:3000/api/users/getroles'
      )
      .pipe(
        map((userData) => {
          // console.log('User data admin: ', userData.users);
          // console.log(userData.message);
          console.log('Get users: ', userData.users);
          console.log('Get users cell: ', userData.users.cell);
          return userData.users;
        })
      )
      .subscribe((userData) => {
        this.users = userData;
        this.usersUpdated.next([...this.users]);
      });
  }

  getCells() {
    this.http
      .get<{ message: string; cells: any }>(
        'http://localhost:3000/api/users/getcells'
      )
      .pipe(
        map((cellData) => {
          // console.log('User data admin: ', userData.users);
          // console.log(userData.message);
          return cellData.cells;
        })
      )
      .subscribe((cellData) => {
        this.cells = cellData;
        this.cellsUpdated.next([...this.cells]);
      });
  }

  getUser(id: string) {
    return this.http.get<{
      RoleName: string;
      userName: string;
      Password: string;
      cell: [];
    }>('http://localhost:3000/api/users/' + id);
  }

  getCell(id: string) {
    return this.http.get<{
      cellName: string;
      checklistName: string;
      Bay: string;
      MacNo: string;
    }>('http://localhost:3000/api/users/getcell/' + id);
  }

  postUserId(user) {
    this.userID = user._id;
  }

  postCellId(cell) {
    console.log('Post Cell Id:', cell._id);
    this.cellId = cell._id;
  }

  getCellId() {
    console.log('GetCellID', this.cellId);
    return this.cellId;
  }

  getUserId() {
    return this.userID;
  }

  storeRole(data, cell) {
    this.isAvailable = false;
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/addrole',
        {
          data: data,
          cell: cell,
        },
        this.config
      )
      .subscribe((respData) => {
        if (!respData) {
          console.log('Already exists');
          return;
        }
        // console.log('store role: ', respData);
        // console.log('Role Added Successfully');
        this.isAvailable = true;
        this.usersUpdated.next([...this.users]);
        return;
      });
  }

  addSupervisor(data) {
    this.isAvailable = false;

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/addsuperuser',
        {
          data: data,
        },
        this.config
      )
      .subscribe((respData) => {
        // console.log(respData);
        // console.log('Supervisor Added Successfully');
        this.isAvailable = true;

        this.usersUpdated.next([...this.users]);
      });
  }

  getSheets() {
    this.http
      .get<{ message: string }>('http://localhost:3000/api/machines/getsheets')
      .pipe(
        map((Data) => {
          console.log('Data: ', Data);
          return Data;
        })
      )
      .subscribe((Data) => {
        this.sheets = Data;
        this.sheetsUpdated.next([...this.sheets]);
      });
  }

  getParticularCell(data) {
    console.log('getParticularCell', data);
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/getcell',
        data,
        this.config
      )
      .subscribe((respData) => {
        this.cellValue = respData;
        console.log(this.cellValue);
        console.log('Cell Fetched Successfully');
      });
  }

  getRoles() {
    this.http
      .get<{ message: string; roles: any }>(
        'http://localhost:3000/api/users/getroles'
      )
      .pipe(
        map((roleData) => {
          return roleData.roles;
        })
      )
      .subscribe((roleData) => {
        this.roles = roleData;
        this.rolesUpdated.next([...this.roles]);
      });
  }

  getRoleUpdateListener() {
    return this.rolesUpdated.asObservable();
  }

  addRole(data) {
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/addrole',
        data
      )
      .subscribe((respData) => {
        console.log(respData.message);
        this.rolesUpdated.next([...this.roles]);
      });
  }

  putImportValues(oprNo, csv) {
    console.log('putImportValues', this.cellValue, oprNo, csv);
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/machines/importCSV',
        { cell: this.cellValue, opNo: oprNo, csv: csv },
        this.config
      )
      .subscribe((respData) => {
        console.log('Sheet Added Successfully');
      });
  }

  public getIds(): Observable<any[]> {
    let response = [];
    // var cellval:any ;
    console.log('CellsId in observable', this.cellsId);
    for (var i = 0; i < this.cellsId.length; i++) {
      var cellval = {
        cellName: this.cellsId[i].cell,
        checklistName: this.cellsId[i].checklists,
        Bay: this.cellsId[i].Bay,
      };
      console.log('Cellval in observable', cellval);
      response[i] = this.http.post(
        'http://localhost:3000/api/users/getcellid',
        cellval
      );
    }
    // console.log(forkJoin(response));
    return forkJoin(response);
  }

  addUser(data, cells) {
    // var checklist = [];
    // checklist = cells;
    var Id = [];
    this.cellsId = cells;
    console.log('Add user called !');
    this.getIds().subscribe((responseList) => {
      for (var i = 0; i < this.cellsId.length; i++) {
        console.log('Obesrvable :', responseList[i]);
        Id.push(responseList[i]);
      }
      this.storeRole(data, Id);
    });
  }

  public populatecellId(): Observable<any[]> {
    let response = [];
    // var cellval:any ;
    console.log('CellsId in observable', this.cellsId);
    for (var i = 0; i < this.cellsId.length; i++) {
      var cellval = {
        cellName: this.cellsId[i].cell,
        checklistName: this.cellsId[i].checklists,
        Bay: this.cellsId[i].Bay,
      };
      console.log('Cellval in observable', cellval);
      response[i] = this.http.post(
        'http://localhost:3000/api/users/getcellid',
        cellval
      );
    }
    // console.log(forkJoin(response));
    return forkJoin(response);
  }

  getCellIds(val) {
    var Id = [];

    console.log('Add user called !');
    this.getIds().subscribe((responseList) => {
      for (var i = 0; i < this.cellsId.length; i++) {
        console.log('Obesrvable :', responseList[i]);
        Id.push(responseList[i]);
      }
    });
  }

  addCell(data) {
    const cell = data;
    console.log('ADD Cell: ', cell);
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/addcell',
        cell
      )
      .subscribe((respData) => {
        console.log(respData);
        // this.usersUpdated.next([...this.users]);
      });
  }

  updateUser(id: string, user, cells) {
    // console.log('Update service', 'id:' + id, 'user:' + user);
    const User = user + cells;
    console.log('update user', user);
    console.log('Update cell:', cells);
    this.http
      .put('http://localhost:3000/api/users/' + id, { data: user, cell: cells })
      .subscribe((res) => {
        const updatedUser = [...this.users];
        const oldUserIndex = updatedUser.findIndex((m) => m.id === user.id);
        this.usersUpdated.next([...this.users]);
      });
  }

  updateCell(id: string, cells) {
    // console.log('Update service', 'id:' + id, 'user:' + user);
    const cell = cells;
    this.http
      .put('http://localhost:3000/api/users/updatecell/' + id, cells)
      .subscribe((res) => {
        const updatedcells = [...this.cells];
        this.cellsUpdated.next([...this.cells]);
      });
  }

  deleteUser(id: string) {
    this.http.delete('http://localhost:3000/api/users/' + id).subscribe(() => {
      const updatedUser = this.users.filter((user) =>
        console.log('delete user: ', user)
      );
      this.usersUpdated.next([...this.users]);
    });
  }

  deleteCell(id: string) {
    this.http
      .delete('http://localhost:3000/api/users/deletecell/' + id)
      .subscribe(() => {
        const updatedUser = this.cells.filter((user) =>
          console.log('delete user: ', user)
        );
        this.cellsUpdated.next([...this.cells]);
      });
  }
}
