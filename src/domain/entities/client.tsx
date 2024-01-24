export class Client{
    _id: string;
    _email:string;
    _username:string;

    // Constructor
    constructor(email: string, username:string, id: string){
        this._email = email;
        this._username = username;
        this._id = id;
    }

    // Return Object User
    static fromJson(json: JsonUser): Client{
        return new Client(json.email, json.username, json.id );
    }

    // Transform User data into json
    toJson():JsonUser{
        return {email: this._email, username: this._username, id: this._id};
    }
}

// DsUser : DataStructureUser
interface JsonUser {
    id: string,
    email: string,
    username: string
}