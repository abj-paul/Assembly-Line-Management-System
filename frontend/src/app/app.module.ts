import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InvalidCredentialComponent } from './home/invalid-credential/invalid-credential.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PmDashboardComponent } from './pm-dashboard/pm-dashboard.component';
import { LcDashboardComponent } from './lc-dashboard/lc-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { DownloadDataComponent } from './admin-dashboard/download-data/download-data.component';
import { UsersInfoComponent } from './admin-dashboard/users-info/users-info.component';
import { RegisterUserComponent } from './admin-dashboard/register-user/register-user.component';
import { ViewerComponent } from './viewer/viewer.component';
import { HeaderComponent } from './header/header.component';
import { ProductionComponent } from './pm-dashboard/production/production.component';
import { ResourceComponent } from './pm-dashboard/resource/resource.component';
import { ReportsComponent } from './pm-dashboard/reports/reports.component';
import { AssemblyLineComponent } from './pm-dashboard/assembly-line/assembly-line.component';
import { RegisterAssemblyLineComponent } from './pm-dashboard/resource/register-assembly-line/register-assembly-line.component';
import { SubmitReportComponent } from './supervisor-dashboard/submit-report/submit-report.component';
import { TestComponent } from './test/test.component';
import { SetLineLayoutComponent } from './pm-dashboard/production/set-line-layout/set-line-layout.component';
import { ViewAssemblyLinesComponent } from './pm-dashboard/resource/view-assembly-lines/view-assembly-lines.component';
import { RegisterMachineComponent } from './pm-dashboard/resource/register-machine/register-machine.component';
import { ViewMachineListComponent } from './pm-dashboard/resource/view-machine-list/view-machine-list.component';
import { ViewLineComponent } from './lc-dashboard/view-line/view-line.component';
import { CongestionComponent } from './lc-dashboard/congestion/congestion.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InvalidCredentialComponent,
    NavbarComponent,
    ProfileComponent,
    AdminDashboardComponent,
    PmDashboardComponent,
    LcDashboardComponent,
    SupervisorDashboardComponent,
    DownloadDataComponent,
    UsersInfoComponent,
    RegisterUserComponent,
    ViewerComponent,
    HeaderComponent,
    ProductionComponent,
    ResourceComponent,
    ReportsComponent,
    AssemblyLineComponent,
    RegisterAssemblyLineComponent,
    SubmitReportComponent,
    SetLineLayoutComponent,
    TestComponent,
    ViewAssemblyLinesComponent,
    RegisterMachineComponent,
    ViewMachineListComponent,
    ViewLineComponent,
    CongestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
