import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DownloadDataComponent } from './admin-dashboard/download-data/download-data.component';
import { RegisterUserComponent } from './admin-dashboard/register-user/register-user.component';
import { UsersInfoComponent } from './admin-dashboard/users-info/users-info.component';
import { HomeComponent } from './home/home.component';
import { InvalidCredentialComponent } from './home/invalid-credential/invalid-credential.component';
import { LoginComponent } from './login/login.component';
import { AssemblyLineComponent } from './pm-dashboard/assembly-line/assembly-line.component';
import { PmDashboardComponent } from './pm-dashboard/pm-dashboard.component';
import { ProductionComponent } from './pm-dashboard/production/production.component';
import { ReportsComponent } from './pm-dashboard/reports/reports.component';
import { ResourceComponent } from './pm-dashboard/resource/resource.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path: "invalid-credentials", component: InvalidCredentialComponent},
  {path: "admin-dashboard", component: AdminDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "user", component: UsersInfoComponent},
    {path: "system-data", component: DownloadDataComponent},
    {path: "register-user", component: RegisterUserComponent}
  ]},
  {path: "pm-dashboard", component: PmDashboardComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "production", component: ProductionComponent},
    {path: "resources", component: ResourceComponent},
    {path: "reports", component: ReportsComponent},
    {path: "assembly-line", component: AssemblyLineComponent}
  ]},
  {path: "assembly-line", component: ViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
