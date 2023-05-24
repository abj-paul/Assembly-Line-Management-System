import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DownloadDataComponent } from './admin-dashboard/download-data/download-data.component';
import { RegisterUserComponent } from './admin-dashboard/register-user/register-user.component';
import { UsersInfoComponent } from './admin-dashboard/users-info/users-info.component';
import { HomeComponent } from './home/home.component';
import { InvalidCredentialComponent } from './home/invalid-credential/invalid-credential.component';
import { LcDashboardComponent } from './lc-dashboard/lc-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AssemblyLineComponent } from './pm-dashboard/assembly-line/assembly-line.component';
import { PmDashboardComponent } from './pm-dashboard/pm-dashboard.component';
import { ProductionComponent } from './pm-dashboard/production/production.component';
import { TestComponent } from './test/test.component';
import { ReportsComponent } from './pm-dashboard/reports/reports.component';
import { ResourceComponent } from './pm-dashboard/resource/resource.component';
import { ProfileComponent } from './profile/profile.component';
import { SubmitReportComponent } from './supervisor-dashboard/submit-report/submit-report.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { SetLineLayoutComponent } from './pm-dashboard/production/set-line-layout/set-line-layout.component';
import { ViewerComponent } from './viewer/viewer.component';
import { RegisterAssemblyLineComponent } from './pm-dashboard/resource/register-assembly-line/register-assembly-line.component';
import { RegisterMachineComponent } from './pm-dashboard/resource/register-machine/register-machine.component';
import { ViewLineComponent } from './lc-dashboard/view-line/view-line.component';
import { CongestionComponent } from './lc-dashboard/congestion/congestion.component';
import { SetViewerInfoComponent } from './admin-dashboard/set-viewer-info/set-viewer-info.component';
import { MarkWorkstationComponent } from './supervisor-dashboard/mark-workstation/mark-workstation.component';

const routes: Routes = [
  {path: "test", component: TestComponent},
  {path: "", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path: "invalid-credentials", component: InvalidCredentialComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "user", component: UsersInfoComponent},
    {path: "system-data", component: DownloadDataComponent},
    {path: "register-user", component: RegisterUserComponent},
    {path: "set-viewer-info", component: SetViewerInfoComponent}
  ]},
  {path: "pm-dashboard", component: PmDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "production", component: ProductionComponent},
    {path: "resources", component: ResourceComponent},
    {path: "reports", component: ReportsComponent},
    {path: "assembly-line", component: AssemblyLineComponent},
    {path: "register-assembly-line", component: RegisterAssemblyLineComponent},
    {path: "register-machine", component: RegisterMachineComponent}
  ]},
  {path: "lc-dashboard", component: LcDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "layout", component: ViewLineComponent},
    {path: "congestion", component: CongestionComponent},
    {path: "reports", component: ReportsComponent},
    {path: "assembly-line", component: AssemblyLineComponent}
  ]},
  {path: "supervisor-dashboard", component: SupervisorDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "reports", component: SubmitReportComponent},
    {path: "assembly-line", component: AssemblyLineComponent},
    {path: "mark-workstation", component: MarkWorkstationComponent}
  ]},
  {path: "assembly-line", component: ViewerComponent},
  {path: "set-assembly-line-layout", component: SetLineLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
