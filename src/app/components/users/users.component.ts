import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Repos } from 'src/app/models/repos';
import { Users } from 'src/app/models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users:Users[]
  @Input() customRepos:Repos[]
  @Input() flag:boolean
  @Output() flagChanged: EventEmitter<boolean> =   new EventEmitter();
  p:number = 1;

  githubUsers: String[] = [];
  bsModalRef: any = {};
  backup_customRepos = [];
  isSearchCleared = true;
  
  isObservableResolved:boolean

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private githubService:GithubService) {
      
   }

  ngOnInit(): void {
    
  }

  navigateDetails(login){
    this._router.navigate(['/details/'+login])
    this.flag = !this.flag
    this.flagChanged.emit(this.flag);
  }

  fireUserSearch(e: any){
    let searchText:string = e.target.value;
    if(searchText && searchText.length>0){
      if(this.isSearchCleared){
        this.backup_customRepos = JSON.parse(JSON.stringify(this.customRepos));
      }
      
      this.githubService.getName(searchText).subscribe(x => {
       this.customRepos = [x];
       this.isSearchCleared = false;
      },
      err =>{
        console.log(err);
        this.customRepos = [];
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
