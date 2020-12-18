import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  navigateBack(){
    this._router.navigate(['']);
  }
}
