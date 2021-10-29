import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvitedComponent } from './invited.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SomosComponent } from './landing-page/somos/somos.component';

const app_routes: Routes = [ 
  {
    path: '',
    component: InvitedComponent,
    children: [
      {
        path: '',component: LandingPageComponent,
        // pathMatch: 'full',
      },
      {
        path: 'somos',
        component: SomosComponent ,
        // pathMatch: 'full',
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
  //     {
  //       path: '**',
  //       redirectTo: '',
  //     },
    ],
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(app_routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class InvitedRoutingModule {

}

export const routedComponents = [
  InvitedComponent,
  LandingPageComponent,
  SignInComponent,
  SignUpComponent,
];
