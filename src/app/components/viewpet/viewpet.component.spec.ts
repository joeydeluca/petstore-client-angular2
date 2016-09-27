import {async} from "@angular/core/testing";
import {ViewPetComponent} from "./viewpet.component";
import {PETS} from "../../mocks/mock-pets";
import {PetService} from "../../services/pet.service";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {Pet} from "../../models/pet";

describe('ViewPetComponent', () => {
  var pet = PETS[0];

  it('should fetch a pet from the mock service', async(() => {
    var component = new ViewPetComponent(new MockPetService(pet), new MockActivatedRoute());
    component.ngOnInit();
    setTimeout(() => {
      expect(component.pet).toEqual(pet)
    }, 500)
    ;
  }));
});

class MockPetService extends PetService {
  constructor(private pet: Pet) {super(null, null)}

  findOne(id: number): Promise<Pet> {
    return Promise.resolve(this.pet);
  }
}

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = new Observable(obs => {
      obs.next({id: "5"});
    })
  }
}
