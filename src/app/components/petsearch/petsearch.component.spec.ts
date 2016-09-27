import {async} from "@angular/core/testing";
import {PETS} from "../../mocks/mock-pets";
import {PetService} from "../../services/pet.service";
import {ActivatedRoute} from "@angular/router";
import {Pet} from "../../models/pet";
import {PetSearchComponent} from "./petsearch.component";

describe('PetSearchComponent', () => {

  it('should search for pets from the mock service', async(() => {
    var component = new PetSearchComponent(new MockPetService(PETS), new MockActivatedRoute());
    component.search();
    expect(component.pets).toEqual(PETS);

  }));
});

class MockPetService extends PetService {
  constructor(private pets: Pet[]) {super(null, null)}

  search(keyword: string, petType: string): Promise<Pet[]> {
    return Promise.resolve(this.pets);
  }
}

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
  }
}
