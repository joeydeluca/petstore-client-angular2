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
var pet_1 = require("../../models/pet");
var pet_service_1 = require("../../services/pet.service");
var EditPetComponent = (function () {
    function EditPetComponent(petService, route) {
        this.petService = petService;
        this.route = route;
        this.pet = new pet_1.Pet();
        this.petTypes = ['DOG', 'CAT'];
        this.isCreate = true;
    }
    EditPetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id']) {
                _this.isCreate = false;
                var id = +params['id'];
                _this.petService.findOne(id)
                    .then(function (pet) { return _this.pet = pet; })
                    .catch(function () {
                });
            }
        });
    };
    EditPetComponent.prototype.save = function () {
        if (this.isCreate) {
            this.petService.create(this.pet)
                .then(this.goBack)
                .catch(function () {
            });
        }
        else {
            this.petService.update(this.pet)
                .then(this.goBack)
                .catch(function () {
            });
        }
    };
    EditPetComponent.prototype.delete = function () {
        this.petService.delete(this.pet.id)
            .then(this.goBack)
            .catch(function () {
        });
    };
    EditPetComponent.prototype.goBack = function () {
        window.history.back();
    };
    EditPetComponent = __decorate([
        core_1.Component({
            selector: 'edit-pet',
            templateUrl: 'app/components/editpet/editpet.component.html'
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.ActivatedRoute])
    ], EditPetComponent);
    return EditPetComponent;
}());
exports.EditPetComponent = EditPetComponent;
//# sourceMappingURL=editpet.component.js.map