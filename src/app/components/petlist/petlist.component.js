"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PetListComponent = (function () {
    function PetListComponent(router, petService, authService) {
        this.router = router;
        this.petService = petService;
        this.authService = authService;
    }
    PetListComponent.prototype.getPets = function () {
        var _this = this;
        this.petService.findMany()
            .then(function (heroes) { return _this.pets = heroes; })
            .catch(function () { });
    };
    PetListComponent.prototype.ngOnInit = function () {
        this.getPets();
    };
    PetListComponent.prototype.onSelect = function (pet) {
        this.selectedPet = pet;
    };
    PetListComponent.prototype.gotoDetail = function (pet) {
        this.router.navigate(['/editpet', pet.id]);
    };
    PetListComponent.prototype.add = function () {
        this.router.navigate(['/editpet']);
    };
    PetListComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    PetListComponent = __decorate([
        core_1.Component({
            selector: 'pet-list',
            templateUrl: './petlist.component.html',
            styleUrls: ['./petlist.component.css']
        })
    ], PetListComponent);
    return PetListComponent;
}());
exports.PetListComponent = PetListComponent;
//# sourceMappingURL=petlist.component.js.map