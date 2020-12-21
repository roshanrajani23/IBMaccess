import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  //Gets 30 records of username/login from Github API
  getUsers():Observable<any>{
    const url = "https://api.github.com/users"
    return this.http.get<Users[]>(url)
  }

  //Gets the Name and other details from Github API based of Username
  getRepos(usr:String):Observable<any>{
    const url = `https://api.github.com/users/${usr}`
    return this.http.get<any>(url)
  }
}
