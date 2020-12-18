import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { Users } from '../app/models/users';
import { Repos } from '../app/models/repos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task';

  users:Users[] = [];
  repos:Repos[] = [];
  customRepos:Repos[] = [];
  flag:Boolean = true;
  router:String;

  bsModalRef: any = {};
  backup_rowData = [];
  isSearchCleared = true;
  rowData: any[] = [];
  
  constructor(private githubService:GithubService, private _router: Router){
    this.router = _router.url; 
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.githubService.getUsers('r').subscribe((data)=>{
      
      this.users = data
      this.getRepos();
    })
  }
  getRepos(){
    this.users.map((val)=>{
      console.log(val.login)
      this.githubService.getRepos(val.login).subscribe((data)=>{
        if(data.name != null){
          let name = data.name.split(' ');
          let Login = data.login;
          let FirstName = name[0];
          let LastName = name[name.length-1] 
          let numOfRepos = data.public_repos;
          let avatar_url = val.avatar_url;
          let id = data.id;
          console.log(FirstName+ '-' + LastName+'  -'+numOfRepos+' -'+avatar_url+"id"+id);
          console.log(numOfRepos);
          this.customRepos.push(new Repos(FirstName, LastName, numOfRepos, avatar_url, Login, id))
        }
        else
          console.log(data.name)
      })
    })
  }

  fireUserSearch(e: any){
    
    let searchText:string = e.target.value;
    if(searchText && searchText.length>0){
      if(this.isSearchCleared){
        this.backup_rowData = JSON.parse(JSON.stringify(this.rowData));
      }
      
      this.githubService.getUsers(searchText).subscribe(x => {
       this.rowData = [x];
       this.isSearchCleared = false;
      },
      err =>{
        console.log(err);
        this.rowData = [];
      });
    }else{
      if(this.backup_rowData && this.backup_rowData.length > 0){
        this.rowData = JSON.parse(JSON.stringify(this.backup_rowData));
        this.backup_rowData = [];
        this.isSearchCleared = true;
      }
    }
  }
}