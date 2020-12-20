import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsTabComponent } from './components/details-tab/details-tab.component';
import { UsersComponent } from './components/users/users.component';
import { EditTabComponent } from './components/edit-tab/edit-tab.component';


const routes: Routes = [
  { 
    path: '', component: AppComponent,
    children: [
      {path: 'details/:login', component: DetailsTabComponent},
      {path: 'edit/:login', component: EditTabComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }