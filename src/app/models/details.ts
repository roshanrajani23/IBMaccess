export class Details {
    fullName:String;
    avatar_url:String;
    type:String;
    location:String;
    organization:String;

    constructor(fullName, avatar_url, type, location,organization){
        this.fullName = fullName;
        this.avatar_url = avatar_url;
        this.type = type;
        this.location = location;
        this.organization = organization;
    }
}