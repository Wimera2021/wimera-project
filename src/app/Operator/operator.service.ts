import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OperatorService {
  config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  roles: any = [];
  opId: any;
  sheets: any = [];
  currentcardvals = [];

  private recents: any = [];
  public currentUsername;
  private rolesUpdated = new Subject<any[]>();
  private sheetsUpdated = new Subject<any[]>();
  private recentUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) {}
  ngInit() {}

  getRoleUpdateListener() {
    return this.rolesUpdated.asObservable();
  }

  getSheetsUpdateListener() {
    return this.sheetsUpdated.asObservable();
  }

  getRecentsUpdateListener() {
    return this.recentUpdated.asObservable();
  }

  getRoles(username) {
    var val = 'Operator';
    //console.log('UName from service :', username);
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users/getoperatorvalues',
        { uname: username }
      )
      .subscribe((respData) => {
        console.log(respData);
        this.roles = respData;
        this.rolesUpdated.next(this.roles);
        console.log('Roles Fetched Successfully');
      });
  }

  getUserRecents(userid) {
    console.log(userid);
    this.http
      .post<{ message: string }>('http://localhost:3000/api/users/getrecents', {
        id: userid,
      })
      .pipe(
        map((data) => {
          console.log('Activity: ', data);
          console.log('Data: ', data);
          return data;
        })
      )
      .subscribe((respData) => {
        console.log('getUserRecents: ', respData);
        this.recents = respData;
        this.recentUpdated.next([...this.recents]);
        console.log('Recents fetched successfully');
      });
  }

  getSheets() {
    this.http
      .get<{ message: string }>('http://localhost:3000/api/operators/getsheets')
      .subscribe((data) => {
        console.log(data);
        this.sheets = data;

        this.sheetsUpdated.next([...this.sheets]);
        console.log('Sheets Fetched Successfully');
      });
  }

  putcardvalues(vals, id) {
    this.currentcardvals = vals;
    this.opId = id;
  }

  getcardvalues() {
    return this.currentcardvals;
  }

  UpdateActivity(opid, sheetid) {
    var date = new Date();
    console.log('Update Activity :', date, opid, sheetid);
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/operators/updateactivity/',
        { opId: opid, sheetId: sheetid, currdate: date }
      )
      .subscribe((respData) => {
        console.log(respData);
      });
  }

  UpdateSheet(id, val) {
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/operators/updatesheet/' + id,
        val
      )
      .subscribe((respData) => {
        console.log('Sheet Updated Successfully!');
      });
  }
}
