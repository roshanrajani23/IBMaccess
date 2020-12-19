export class Repos {
    FirstName:String;
    LastName:String;
    numOfRepos:String;
    avatar_url:String;
    id:String;
    login:String;

    constructor(FirstName, LastName, numOfRepos, avatar_url, login, id){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.numOfRepos = numOfRepos;
        this.avatar_url = avatar_url;
        this.login = login;
        this.id = id;
    }
}
