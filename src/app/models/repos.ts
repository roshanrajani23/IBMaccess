export class Repos {
    firstName:String;
    lastName:String;
    numOfRepos:Number;
    avatar_url:String;
    id:Number;
    login:String;
    following:Number;
    location:String;

    constructor(firstName, lastName, numOfRepos, avatar_url, login, id, following, location){
        this.firstName = firstName;
        this.lastName = lastName;
        this.numOfRepos = numOfRepos;
        this.avatar_url = avatar_url;
        this.login = login;
        this.id = id;
        this.following = following;
        this.location = location;
    }
}
