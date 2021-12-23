import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  Logout = 'Logout';
  isDropdown: boolean = false;
  DropDown: any[] = [{ value: 'Logout' }];
  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onProfile() {
    this.authService.logout();
  }

  onSubmenu() {
    // this.isDropDown=!this.isDropDown;
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
