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
  title = 'IBM Assessment';

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

  flagChangedHandler(flag: boolean) {
    this.flag = flag;
  }

  getUsers(){
    this.githubService.getUsers().subscribe((data)=>{
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
          let login = data.login;
          let firstName = name[0];
          let lastName = name[name.length-1] 
          let numOfRepos = data.public_repos;
          let avatar_url = val.avatar_url;
          let id = data.id;
          let following = data.following;
          let location = data.location;
          this.customRepos.push(new Repos(firstName, lastName, numOfRepos, avatar_url, login, id, following, location));
        }
        else err => {
          console.log(err);
        }
      })
    })
  }
}