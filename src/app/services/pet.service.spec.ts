import {TestBed, getTestBed, async} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {CookieService} from "angular2-cookie/core";

import {PetService} from "./pet.service";
import {PETS} from "../mocks/mock-pets";
import {AuthService} from "./auth.service";
import {Pet} from "../models/pet";

describe('Pet Service', () => {
  let testBed: TestBed;
  let backend: MockBackend = null;
  let petService: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetService,
        AuthService,
        CookieService,
        {provide: XHRBackend, useClass: MockBackend}
      ],
      imports: [
        HttpModule
      ]
    });
    testBed = getTestBed();
    backend = getTestBed().get(XHRBackend);
    petService = testBed.get(PetService);
  });

  it('should be defined', () => {
      expect(petService).toBeDefined();
  });

  it('should find all pets', done => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({body: PETS}
          )));
      });
    petService
      .findMany()
      .then((response) => {
        expect(response).toEqual(PETS);
        done();
    });
  });

  it('should find one pet', done => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({body: PETS[0]}
          )));
      });
    petService
      .findOne(1)
      .then((response) => {
        expect(response).toEqual(PETS[0]);
        done();
      });
  });

  it('should update a pet', done => {
    var pet = new Pet();
    pet.id = 1;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({body: JSON.stringify(pet)}
          )));
      });
    petService
      .update(pet)
      .then((response) => {
        expect(response).toEqual(pet);
        done();
      });
  });

});

