import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'home', component: HomeComponent },

  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
