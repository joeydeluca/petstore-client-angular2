import { TestBed, async } from '@angular/core/testing';
import {ViewPetComponent} from "./viewpet.component";
import {PETS} from "../../mocks/mock-pets";
import {PetService} from "../../services/pet.service";
import { Observable } from 'rxjs/Rx';
import {ActivatedRoute} from "@angular/router";

describe('ViewPetComponent', () => {

 /* it('should create the component', async(() => {
    var component = new ViewPetComponent(new MockPetService(), new MockActivatedRoute());
    component.ngOnInit();
    expect(component.pet).toEqual(PETS[0]);
  }));
*/
});

class MockPetService extends PetService {
  constructor() {super(null, null)}
  findOne() {
    return Promise.resolve(
      PETS[0]
    );
  }
}

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = Observable.create({id: "5"});
  }
}
