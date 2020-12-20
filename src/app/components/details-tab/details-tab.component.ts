import { Component, OnInit, Input, Output, EventEmitter, ɵCompiler_compileModuleSync__POST_R3__, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { GithubService } from '../../services/github.service';
import { Details } from "../../models/details";
import { Repos } from 'src/app/models/repos';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

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
  @Output() githubDetails:any;
  editGithubDetails;
  editFlag:boolean;


  constructor(private _router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.githubDetails = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            numOfRepos: new FormControl(),
            avatar_url: new FormControl(),
            login: new FormControl(),
            id: new FormControl(),
            following: new FormControl(),
            location: new FormControl(),

    });
    this.login = this.route.firstChild.snapshot.params['login'];
    this.getDetails();
  }

  navigateBack(){
    this.flag = !this.flag;
    this.flagChanged.emit(this.flag);
    this._router.navigate(['/edit'], { replaceUrl: true });
  }

  //Gets the details to DetailsComponent without making call to repos for other information
  getDetails() {
    let details = _.filter(this.customRepos, ['login', this.login]);
    this.githubDetails = details[0];
  }

  onSave(): void {
    //console.log(value)
    //this.githubDetails = this.githubDetails.value;
  }

  editData(){
    this.editGithubDetails = this.githubDetails;
    this.editFlag = !this.editFlag;
  }

  onCancel() {
    this.editFlag = false;
  }
}
