import { Component, OnInit, Input, Output, EventEmitter, ɵCompiler_compileModuleSync__POST_R3__} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { GithubService } from '../../services/github.service';
import { Details } from "../../models/details";
import { Repos } from 'src/app/models/repos';
import * as _ from 'lodash';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.scss']
})
export class DetailsTabComponent implements OnInit {

  @Input() flag:boolean;
  @Input() customRepos:Repos[];
  @Output() flagChanged: EventEmitter<boolean> =   new EventEmitter();
  login:String;
  @Output() githubDetails:Repos;
  editGithubDetails;
  editFlag:boolean;

  constructor(private _router:Router, private route: ActivatedRoute, private githubService:GithubService) { }

  ngOnInit(): void {
    this.login = this.route.firstChild.snapshot.params['login'];
    this.getDetails();
  }

  navigateBack(){
    this.flag = !this.flag;
    this.flagChanged.emit(this.flag);
    this._router.navigate(['/edit'], { replaceUrl: true });
  }

  navigateToEdit(login){
    // this.flag = !this.flag;
    // this.flagChanged.emit(this.flag);
    this._router.navigate(['/edit/'+login])
  }

  editData(){
    this.editGithubDetails = this.githubDetails;
    this.editFlag = !this.editFlag;
  }

  //Gets the details to DetailsComponent without making call to repos for other information
  getDetails() {
    _.filter(this.customRepos, (obj) => {
      if(obj.login === this.login) {
        console.log(obj);
        return this.githubDetails = obj;
      }
    }); 
  }
}
