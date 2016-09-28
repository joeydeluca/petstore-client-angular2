import {Pet} from "../models/pet";
import {PetService} from "../services/pet.service";
import {PETS} from "./mock-pets";

export class PetServiceMock extends PetService {


  constructor() {super(null, null)}

  findOne(id: number): Promise<Pet> {
    return Promise.resolve(PETS[0]);
  }

  findMany(): Promise<Pet[]> {
    return Promise.resolve(PETS);
  }

  search(keyword: string, petType: string): Promise<Pet[]> {
    return Promise.resolve(PETS);
  }
}
