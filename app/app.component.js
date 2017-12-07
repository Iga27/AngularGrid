"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var user_service_1 = require("./user.service");
var User_1 = require("./User");
var AppComponent = (function () {
    function AppComponent(service) {
        this.service = service;
        this.users = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    AppComponent.prototype.loadUsers = function () {
        var _this = this;
        this.service.getUsers().subscribe(function (response) {
            _this.users = response.json();
        });
    };
    AppComponent.prototype.addUser = function (user) {
        this.editedUser = new User_1.User(0, "", 0);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    };
    AppComponent.prototype.editUser = function (user) {
        this.editedUser = new User_1.User(user.Id, user.Name, user.Age);
    };
    AppComponent.prototype.loadTemplate = function (user) {
        if (this.editedUser != null && this.editedUser.Id == user.Id)
            return this.editTemplate;
        else
            return this.readonlyTemplate;
    };
    AppComponent.prototype.saveUser = function () {
        var _this = this;
        if (this.isNewRecord) {
            this.service.createUser(this.editedUser).subscribe(function (response) {
                _this.statusMessage = "Пользователь сохранен";
                _this.loadUsers();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        }
        else {
            this.service.updateUser(this.editedUser.Id, this.editedUser).subscribe(function (response) {
                _this.statusMessage = "Пользователь обновлен";
                _this.loadUsers();
            });
            this.editedUser = null;
        }
    };
    AppComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.service.deleteUser(user.Id).subscribe(function (response) {
            _this.statusMessage = "Пользователь удален";
            _this.loadUsers();
        });
    };
    AppComponent.prototype.cancel = function () {
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    };
    return AppComponent;
}());
__decorate([
    core_2.ViewChild("readonlyTemplate"),
    __metadata("design:type", core_2.TemplateRef)
], AppComponent.prototype, "readonlyTemplate", void 0);
__decorate([
    core_2.ViewChild("editTemplate"),
    __metadata("design:type", core_2.TemplateRef)
], AppComponent.prototype, "editTemplate", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: './app/app.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map