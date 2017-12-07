import {Component,OnInit} from "@angular/core";
import {TemplateRef,ViewChild} from "@angular/core";
import {UserService} from "./user.service";
import {User} from "./User";
import {Response} from "@angular/http";

@Component(
    {
        selector: "my-app",
        templateUrl: './app/app.component.html',
        providers: [UserService]
    }
)
export class AppComponent implements OnInit
{

    @ViewChild("readonlyTemplate")
    readonlyTemplate: TemplateRef<any>;
    @ViewChild("editTemplate")
    editTemplate: TemplateRef<any>;

    users: Array<User>;
    editedUser:User;
    isNewRecord:boolean;
    statusMessage:string;

 constructor(private service : UserService)
 {
     this.users=new Array<User>();
 }

    ngOnInit()
    {
        this.loadUsers();
    }

    loadUsers()
    {
       this.service.getUsers().subscribe((response:Response)=>
        {
        this.users=response.json(); 
        });
    }

    addUser(user:User)
    {
        this.editedUser=new User(0,"",0);
        this.users.push(this.editedUser);
        this.isNewRecord=true;
    }

    editUser(user:User)
    {
        this.editedUser=new User(user.Id,user.Name,user.Age);
    }

    loadTemplate(user:User)
    {
       if(this.editedUser!=null && this.editedUser.Id==user.Id)
       return this.editTemplate;
       else
       return this.readonlyTemplate;
    }

    saveUser()
    {
        if(this.isNewRecord)
        {
            this.service.createUser(this.editedUser).subscribe((response:Response)=>
            {
                this.statusMessage="Пользователь сохранен";
                this.loadUsers();
            });
            this.isNewRecord=false;
            this.editedUser=null;
        }
        else
        {
            this.service.updateUser(this.editedUser.Id,this.editedUser).subscribe((response:Response)=>
            {
                this.statusMessage="Пользователь обновлен";
                this.loadUsers();
            })
            this.editedUser=null;
        }

    }

    deleteUser(user: User)
    {
        this.service.deleteUser(user.Id).subscribe((response:Response)=>
        {
            this.statusMessage="Пользователь удален";
            this.loadUsers();
        })
    }

    cancel()
    {
        if(this.isNewRecord)
        {
            this.users.pop();
             
            this.isNewRecord=false;
        }
        this.editedUser=null;
    }
}

