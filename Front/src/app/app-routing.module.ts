import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './@core/services/guards/auth-guard.service';
import { LandingPageComponent } from './invited/landing-page/landing-page.component';
import { ProjectSetupComponent } from './pages/admin/project-setup/project-setup.component';
import { ProjectSetupModule } from './pages/admin/project-setup/project-setup.module';
// import {DashboardComponent} from'./pages/dashboard/dashboard.component'; 


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./invited/invited.module').then(m => m.InvitedModule)
  },
  {
    path: 'pages',
    //loadChildren: './pages/pages.module#PagesModule',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    //component:DashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'project',
    //loadChildren: './pages/pages.module#PagesModule',
    loadChildren: () => import('./pages/admin/project-setup/project-setup.module').then(m => m.ProjectSetupModule),
    //component:DashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },

];
// const config: ExtraOptions = {
//   useHash: true,
// };
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
