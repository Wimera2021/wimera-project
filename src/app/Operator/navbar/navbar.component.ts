import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  Logout = 'Logout';
  isDropdown: boolean = false;
  DropDown: any[] = [{ value: 'Logout' }];
  public username;
  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService,
    private opService: OperatorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username = this.route.snapshot.paramMap.get('uname');

    this.opService.currentUsername = this.username;
    console.log('Username from route navbar: ', this.opService.currentUsername);
    // this.username = this.supervisorService.currentUser;
    // console.log(this.username);
  }

  onProfile() {
    this.authService.logout();
  }

  onSubmenu() {
    this.isDropdown = !this.isDropdown;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }
}
