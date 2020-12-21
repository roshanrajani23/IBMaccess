import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Repos } from 'src/app/models/repos';
import { Users } from 'src/app/models/users';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users:Users[];
  @Input() customRepos:Repos[];
  @Input() flag:boolean;
  @Output() flagChanged: EventEmitter<boolean> = new EventEmitter();

  p:number = 1;
  searchText: String;
  txtValue: String;
  githubUsers: String[] = [];
  bsModalRef: any = {};
  backup_customRepos = [];
  isSearchCleared = true;
  toastMessage = false;
  backupData:Object;
  isObservableResolved:boolean

  constructor(private _router: Router, private githubService:GithubService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.backupData = this.customRepos;
  }

  //Navigate to Details route
  navigateDetails(login: String){
    this._router.navigate(['/details/'+login])
    this.flag = !this.flag
    this.flagChanged.emit(this.flag);
  }

  // Search Text data based of username from All gitApi data, for REPOS
  getDetailsForSearch(searchText: String){
    if(!_.isNil(searchText)) {
      this.githubService.getRepos(searchText).subscribe((data)=>{
        if(data.name != null){
          console.log(data);
          let name = data.name.split(' ');
            let firstName = name[0];
            let lastName = name[name.length-1] 
            let numOfRepos = data.public_repos;
            let avatar_url = data.avatar_url;
            let id = data.id;
            let login = data.login;
            let following = data.following;
            let location = data.location;
            let searchValue = {
              firstName: name[0],
              lastName: name[name.length-1],
              numOfRepos: data.public_repos,
              avatar_url: data.avatar_url,
              login: data.login,
              id: data.id,
              following: data.following,
              location: data.location
            }
            //Push to Repos to Edit the values
            this.customRepos.push(new Repos(firstName, lastName, numOfRepos, avatar_url, login, id, following, location));
            //Add to customRepos to show it on table
            this.customRepos = [searchValue];
          } else err => {
          console.log(err);
        }
      })
    }
  }

  // Search 'username' data based of from Github API
  fireUserSearch(e: any){
    let searchText:string = e.target.value;
    this.getDetailsForSearch(this.searchText);
    if(searchText && searchText.length>0){
      if(this.isSearchCleared){
        this.backup_customRepos = JSON.parse(JSON.stringify(this.customRepos));
      }
      this.githubService.getRepos(searchText).subscribe(x => {
        this.customRepos = [x];
        this.isSearchCleared = false;
      },
      err => {
        this.toastr.info('No Username Found');
        console.log(err);
      });
    } else {
      if(_.isNil(this.searchText)) {
        this.toastr.info('Please enter a Username');
      }
      if (this.backup_customRepos && this.backup_customRepos.length > 0){
        this.customRepos = JSON.parse(JSON.stringify(this.backup_customRepos));
        this.backup_customRepos = [];
        this.isSearchCleared = true;
      }
    }
  }

  //Reset Table data if search is empty
  resetOnClearSearch(value: any){
    this.txtValue = value;
    if(this.txtValue === '')
    {
      this.customRepos = JSON.parse(JSON.stringify(this.backupData));
    }
  }
}
