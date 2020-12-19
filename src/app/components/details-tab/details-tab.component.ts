import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { GithubService } from '../../services/github.service';
import { Details } from "../../models/details";

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnInit {

  @Input() flag:boolean;
  @Output() flagChanged: EventEmitter<boolean> =   new EventEmitter();
  login:String;
  githubDetails:Details;

  constructor(private _router:Router, private route: ActivatedRoute, private githubService:GithubService) { }

  ngOnInit(): void {
    this.login = this.route.firstChild.snapshot.params['login'];
    console.log(this.login)
    this.getDetails();


    //this.id = this.route.snapshot.paramMap.get("id")
    // this.route.params.subscribe(params => {
    //   this.id = params["id"];
    //   console.log(this.id);
    // });
  }

  navigateBack(){
  this.flag = !this.flag;
    this.flagChanged.emit(this.flag);
    this._router.navigate(['/home'], { replaceUrl: true });
  }

  getDetails(){

      this.githubService.getRepos(this.login).subscribe((data)=>{
        if(data.name != null){

          console.log(data);
          let organization = data.organization;
          let fullName = data.name;
          let type = data.type;
          let location = data.location;
          let avatar_url = data.avatar_url;

          this.githubDetails = new Details(fullName, avatar_url, type, location, organization)


          // let name = data.name.split(' ');
          // let FirstName = name[0];
          // let LastName = name[name.length-1] 
          // let numOfRepos = data.public_repos;
          // let avatar_url = val.avatar_url;
          // let id = data.id;
          // console.log(FirstName+ '-' + LastName+'  -'+numOfRepos+' -'+avatar_url+"id"+id);
          // console.log(numOfRepos);

          // this.customRepos.push(new Repos(FirstName, LastName, numOfRepos, avatar_url,id))
          // console.log("==========================="+this.customRepos.length)
        }
        else
          console.log(data.name)
      })
    }

}
