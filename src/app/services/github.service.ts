import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,forkJoin} from 'rxjs';
import {map,concatMap,flatMap,mergeMap} from 'rxjs/operators';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUsers(searchText:String):Observable<any>{
    const url = "https://api.github.com/users"
    return this.http.get<Users[]>(url)
  }
  getRepos(usr:String):Observable<any>{
    const url = `https://api.github.com/users/${usr}`
    return this.http.get<any>(url)
  }

  getData():Observable<any>{
    let githubData = "https://api.github.com/users"
    return this.http.get<any>(githubData) 
    .pipe(
      mergeMap((result: any) => {
        let allIds = result.map((x: any) => this.getName(x.login));
        return forkJoin(...allIds).pipe(
          map((idDataArray) => {
            console.log(idDataArray);
            return idDataArray;
          })
        )
        
      })
    );
  }
    
  getName(loginId: string):Observable<any>{
    let githubData = "https://api.github.com/users/"+loginId;
    return this.http.get<any>(githubData)
  }
}
