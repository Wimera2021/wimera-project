import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddRoleComponent } from './admin/role/add-role/add-role.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { EditRoleComponent } from './admin/role/edit-role/edit-role.component';
import { CellListComponent } from './admin/cells/cell-list/cell-list.component';
import { AddCellsComponent } from './admin/cells/add-cells/add-cells.component';
import { EditCellsComponent } from './admin/cells/edit-cells/edit-cells.component';
import { SheetComponent } from './sheet/sheet/sheet.component';
import { StepperImportComponent } from './sheet/stepper-import/stepper-import.component';
import { OpDashboardComponent } from './Operator/op-dashboard/op-dashboard.component';
import { NavbarComponent } from './Operator/navbar/navbar.component';
import { OperatorLayoutComponent } from './layout/operator-layout.component';
import { OpSheetComponent } from './Operator/op-sheet/op-sheet.component';
import { SvHeaderComponent } from './supervisor/sv-header/sv-header.component';
import { SvViewtableComponent } from './supervisor/sv-viewtable/sv-viewtable.component';
import { SupervisorLayoutComponent } from './layout/supervisor-layout.component';
import { SvReviewtableComponent } from './supervisor/sv-reviewtable/sv-reviewtable.component';
import { SvReportComponent } from './supervisor/sv-report/sv-report.component';

import { ChecklistsComponent } from './Operator/checklists/checklists.component';
import { AngularMaterialModule } from './angular-material.module';
import { ErrorInterceptor } from './helpers/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    OpDashboardComponent,
    AddRoleComponent,
    RoleListComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    EditRoleComponent,
    CellListComponent,
    AddCellsComponent,
    EditCellsComponent,
    SheetComponent,
    StepperImportComponent,
    NavbarComponent,
    OperatorLayoutComponent,
    OpSheetComponent,
    SvHeaderComponent,
    SvViewtableComponent,
    SupervisorLayoutComponent,
    SvReviewtableComponent,
    SvReportComponent,
    ChecklistsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    AuthGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
