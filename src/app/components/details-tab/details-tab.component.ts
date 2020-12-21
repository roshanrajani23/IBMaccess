import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Repos } from 'src/app/models/repos';
import * as _ from 'lodash';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.scss']
})
export class DetailsTabComponent implements OnInit {

  @Input() flag:boolean;
  @Input() customRepos:Repos[];
  @Output() flagChanged: EventEmitter<boolean> =   new EventEmitter();
  @Output() githubDetails:any;
  @ViewChild('myForm', { static: true }) myForm: NgForm;
  login:String;
  editGithubDetails:Object;
  editFlag:boolean;
  formChangesSubscription: any;

  constructor(private _router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login = this.route.firstChild.snapshot.params['login'];
    this.getDetails();
  }

  //Navigate back to Home page
  navigateBack(){
    this.flag = !this.flag;
    this.flagChanged.emit(this.flag);
    this._router.navigate(['/'], { replaceUrl: true });
  }

  //Gets the details to DetailsComponent without making call to repos for other information
  getDetails() {
    let details = _.filter(this.customRepos, ['login', this.login]);
    this.githubDetails = details[0];
  }

  //Save the Github user information in the session
  onSave(value: any) {
    console.log(value);
    this.githubDetails = value;
    this.editFlag = false;
  }

  //Edit Github user values
  editData(){
    this.editGithubDetails = this.githubDetails;
    this.editFlag = !this.editFlag;
  }

  //Cancel the save.
  onCancel() {
    this.editFlag = false;
  }
}
