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
var core_1 = require("@angular/core");
var auth_service_1 = require("../../services/auth.service");
var userLogin_1 = require("../../models/userLogin");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loginFailed = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginFailed = false;
        var userLogin = new userLogin_1.UserLogin();
        userLogin.username = this.username;
        userLogin.password = this.password;
        this.authService.login(userLogin)
            .then(function (isSuccess) {
            if (isSuccess) {
                _this.router.navigate(['/pets']);
            }
            else {
                _this.loginFailed = true;
            }
        }).catch(function () {
            _this.loginFailed = true;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/components/login/login.component.html',
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map