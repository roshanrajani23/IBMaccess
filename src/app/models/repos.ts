export class Repos {
    FirstName:String;
    LastName:String;
    numOfRepos:String;
    avatar_url:String;
    Login:String;
    id:String;

    constructor(FirstName, LastName, numOfRepos, avatar_url, Login, id){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.numOfRepos = numOfRepos;
        this.avatar_url = avatar_url;
        this.Login = Login;
        this.id = id;
    }
}
