import {async} from "@angular/core/testing";
import {ViewPetComponent} from "./viewpet.component";
import {PETS} from "../../mocks/mock-pets";
import {PetServiceMock} from "../../mocks/pet.service.mock";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

describe('ViewPetComponent', () => {

  it('should fetch a pet from the mock service', async(() => {
    var component = new ViewPetComponent(new PetServiceMock(), new MockActivatedRoute());
    component.ngOnInit();
    setTimeout(() => {
      expect(component.pet).toEqual(PETS[0])
    }, 500)
    ;
  }));
});

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = new Observable(obs => {
      obs.next({id: "5"});
    })
  }
}
