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
var router_1 = require("@angular/router");
var pet_service_1 = require("../../services/pet.service");
var ViewPetComponent = (function () {
    function ViewPetComponent(petService, route) {
        this.petService = petService;
        this.route = route;
    }
    ViewPetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.petService.findOne(id)
                .then(function (hero) { return _this.pet = hero; }).catch(function () { });
        });
    };
    ViewPetComponent.prototype.goBack = function () {
        window.history.back();
    };
    ViewPetComponent = __decorate([
        core_1.Component({
            selector: 'pet-detail',
            templateUrl: 'app/components/viewpet/viewpet.component.html',
            styleUrls: ['app/components/viewpet/viewpet.component.css']
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.ActivatedRoute])
    ], ViewPetComponent);
    return ViewPetComponent;
}());
exports.ViewPetComponent = ViewPetComponent;
//# sourceMappingURL=viewpet.component.js.map