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
var PetSearchComponent = (function () {
    function PetSearchComponent(router, route, petService) {
        this.router = router;
        this.route = route;
        this.petService = petService;
        this.petTypes = ['All', 'Dog', 'Cat'];
        this.petType = this.petTypes[0];
        this.keyword = '';
    }
    PetSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.petType = params['petType'] != undefined ? params['petType'] : _this.petType;
            _this.keyword = params['keyword'] != undefined ? params['keyword'] : _this.keyword;
        });
        this.search();
    };
    PetSearchComponent.prototype.search = function () {
        var _this = this;
        this.petService.search(this.keyword, this.petType).then(function (pets) { return _this.pets = pets; }).catch(function () { });
    };
    PetSearchComponent.prototype.viewPet = function (pet) {
        this.router.navigate(['/pet', pet.id]);
    };
    PetSearchComponent = __decorate([
        core_1.Component({
            selector: 'pet-search',
            templateUrl: 'app/components/petsearch/petsearch.component.html',
            styleUrls: ['app/components/petsearch/petsearch.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, pet_service_1.PetService])
    ], PetSearchComponent);
    return PetSearchComponent;
}());
exports.PetSearchComponent = PetSearchComponent;
//# sourceMappingURL=petsearch.component.js.map