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
var http_1 = require("@angular/http");
var core_2 = require('angular2-cookie/core');
var AuthData_1 = require("../models/AuthData");
var AuthService = (function () {
    function AuthService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.url = 'http://localhost:8080';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.cookieKey = "PetsKey";
    }
    AuthService.prototype.login = function (userLogin) {
        var _this = this;
        return this.http
            .post(this.url + "/login", JSON.stringify(userLogin), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            if (response.status === 200) {
                // Grab token from header
                var headers = response.headers;
                _this.token = headers.get('Authorization').replace('Bearer ', '');
                console.log('found token ' + _this.token);
                // Fetch the role after we have logged in
                return _this.getRoleFromServer(_this.token)
                    .then(function (r) {
                    _this.role = r;
                    _this.saveAuthDataToCookie();
                    return true;
                })
                    .catch(function () { });
            }
            else {
                return false;
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.cookieService.getObject(this.cookieKey) != null;
    };
    AuthService.prototype.isAdmin = function () {
        var authData = this.cookieService.getObject(this.cookieKey);
        return authData && authData.role && authData.role === 'ROLE_ADMIN';
    };
    AuthService.prototype.getRoleFromServer = function (token) {
        return this.http.get(this.url + "/users/role", { headers: new http_1.Headers({ 'Authorization': token }) })
            .toPromise()
            .then(function (response) { return response.text(); })
            .catch(this.handleError);
    };
    AuthService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AuthService.prototype.saveAuthDataToCookie = function () {
        this.cookieService.putObject(this.cookieKey, new AuthData_1.AuthData(this.token, this.role));
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, core_2.CookieService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map