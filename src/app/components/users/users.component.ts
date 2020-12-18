import { Component, OnInit, Input } from '@angular/core';
import { Repos } from 'src/app/models/repos';
import { Users } from 'src/app/models/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users:Users[]
  @Input() customRepos:Repos[]
  p:number = 1;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
  }

  navigateDetails(id:Number){
    this._router.navigate(['/details/'+id])
  }

}
