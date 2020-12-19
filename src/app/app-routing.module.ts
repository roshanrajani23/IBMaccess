import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsTabComponent } from './components/details-tab/details-tab.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: 'details/:login', pathMatch: 'full', component: DetailsTabComponent },
  { path: 'home', component: AppComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }