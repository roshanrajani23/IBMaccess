import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Repos } from 'src/app/models/repos';
import { Users } from 'src/app/models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { Observable } from 'rxjs';

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

  githubUsers: String[] = [];
  bsModalRef: any = {};
  backup_customRepos = [];
  isSearchCleared = true;
  toastMessage = false;
  
  isObservableResolved:boolean

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private githubService:GithubService) {}

  ngOnInit(): void {}

  navigateDetails(login){
    this._router.navigate(['/details/'+login])
    this.flag = !this.flag
    this.flagChanged.emit(this.flag);
  }

  // Search Text data based of username from All gitApi data, for REPOS
  getDetailsForSearch(searchText){
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
          console.log(lastName, firstName, id, numOfRepos);
          //Not working as expected
          //this.customRepos = new Repos(firstName, lastName, numOfRepos, avatar_url, login, id);
      } else console.error();
    })
  }

  // Search Text data based of username from All gitApi data, for USERNAME and AVATAR
  fireUserSearch(e: any){
    let searchText:string = e.target.value;
    this.getDetailsForSearch(searchText);
    if(searchText && searchText.length>0){
      if(this.isSearchCleared){
        this.backup_customRepos = JSON.parse(JSON.stringify(this.customRepos));
      }
      this.githubService.getName(searchText).subscribe(x => {
        this.customRepos = [x];
        this.isSearchCleared = false;
      },
      err => {
        this.toastMessage = true;
        console.log(err);
        let noDataFound = 
        {
          firstName: "",
          lastName: "",
          numOfRepos: "",
          avatar_url: '/assets/images/emoji.png',
          login: "No Data Found",
          id: ""
        }
        this.customRepos = [noDataFound];
      });
    }else{
      if(this.backup_customRepos && this.backup_customRepos.length > 0){
        this.customRepos = JSON.parse(JSON.stringify(this.backup_customRepos));
        this.backup_customRepos = [];
        this.isSearchCleared = true;
      }
    }
  }
}
