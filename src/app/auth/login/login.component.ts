import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  durationInSeconds = 3;
  ngOnInit(): void {}

  onLogin(form: NgForm) {
    console.log('Login form: ', form.value);
    var f = form.value;
    console.log('Login f: ', f);
    // if (f.userName == 'admin' && f.role == 'admin' && f.password == 'admin') {
    //   this._snackbar.open('Login Successful!', '', {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     duration: this.durationInSeconds * 1000,
    //   });
    //   this.router.navigate(['/home']);
    // } else {
    //   this._snackbar.open('Enter the correct values!', '', {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     duration: this.durationInSeconds * 1000,
    //   });
    // }
    if (form.valid) {
      this.authService.login(f);
    }
  }
}
