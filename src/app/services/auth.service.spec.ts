import {TestBed, getTestBed} from "@angular/core/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {CookieService} from "angular2-cookie/core";
import {AuthService} from "./auth.service";

describe('Auth Service', () => {
  let testBed: TestBed;
  let backend: MockBackend = null;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    authService = testBed.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

/*  it('should login', done => {

    backend.connections.subscribe(connection => {

      if(connection.request.url.includes('/login')) {
        connection.mockRespond(new Response( new ResponseOptions({status: 200})));
      }
      else if(connection.request.url.includes('/role')) {
        connection.mockRespond(new Response( new ResponseOptions({status: 200})));
      }
    });


    authService.login()
      .then((response) => {
        expect(response).toEqual(true);
        done();
      });
  });*/

});

