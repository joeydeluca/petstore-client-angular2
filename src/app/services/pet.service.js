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
require("rxjs/add/operator/toPromise");
var PetService = (function () {
    function PetService(http) {
        this.http = http;
        this.petsUrl = 'http://localhost:8080/pets';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    PetService.prototype.findMany = function () {
        return this.http.get(this.petsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PetService.prototype.findOne = function (id) {
        return this.http.get(this.petsUrl + "/" + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PetService.prototype.update = function (pet) {
        return this.http
            .put(this.petsUrl, JSON.stringify(pet), { headers: this.headers })
            .toPromise()
            .then(function () { return pet; })
            .catch(this.handleError);
    };
    PetService.prototype.create = function (pet) {
        return this.http
            .post(this.petsUrl, JSON.stringify(pet), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PetService.prototype.delete = function (id) {
        return this.http.delete(this.petsUrl + "/" + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PetService.prototype.search = function (keyword, petType) {
        return this.http.get(this.petsUrl + "/?keyword=" + keyword + "&petType=" + petType)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PetService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PetService);
    return PetService;
}());
exports.PetService = PetService;
//# sourceMappingURL=pet.service.js.map