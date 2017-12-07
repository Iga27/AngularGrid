import {Injectable} from "@angular/core";
import {Http,Response,Headers} from "@angular/http";
import {User} from "./User";

@Injectable()
export class UserService
{
    private url = "";
    constructor(private http:Http){}

    getUsers()
    {
        return this.http.get(this.url);
    }

    createUser(user:User)
    {
        let body=JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(this.url,body,{headers:headers});
    }

    updateUser(id:number,user:User)
    {
        let body=JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.put(this.url+'/'+id,body,{headers:headers});
    }

    deleteUser(id:number)
    {
        return this.http.delete(this.url+'/'+id);
    }
     
}
