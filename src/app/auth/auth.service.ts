import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  durationInSeconds = 3;
  Userid;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackbar: MatSnackBar
  ) {}

  login(user) {
    console.log('User in Login', user);
    if (user.role == 'Admin') {
      this.http
        .post('http://localhost:3000/api/users/adminLogin', user)
        .subscribe((resp) => {
          this.loggedIn.next(true);
          this.router.navigate(['/admin/dashboard']);
        });
    } else {
      this.http.post('http://localhost:3000/api/users/login', user).subscribe(
        (resp) => {
          console.log('Auth service: ', resp);
          this.Userid = resp;
          // console.log('User Id :', this.Userid);

          console.log(this.Userid);
          var role = this.Userid.RoleName;
          var username = this.Userid.userName;

          if (role == 'Operator') {
            this.loggedIn.next(true);
            this.router.navigate(['/operator/', username, 'dashboard']);
          } else if (role == 'Supervisor') {
            this.loggedIn.next(true);
            this.router.navigate(['/supervisor/', username, 'manage']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
