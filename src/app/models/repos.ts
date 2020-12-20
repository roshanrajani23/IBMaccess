export class Repos {
    firstName:String;
    lastName:String;
    numOfRepos:String;
    avatar_url:String;
    id:String;
    login:String;
    following:String;
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
