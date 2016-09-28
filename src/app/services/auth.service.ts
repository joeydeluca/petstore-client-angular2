import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {UserLogin} from "../models/userLogin";
import {CookieService} from "angular2-cookie/core";
import {AuthData} from "../models/AuthData";
import {environment} from "../environment.ts";

@Injectable()
export class AuthService {
  private url = environment.apiUrl;
  private headers = new Headers({'Content-Type': 'application/json'});
  private tokenKey = "PetsKey";
  private token: string;
  private role: string;

  constructor(private http: Http, private cookieService: CookieService) { }

  public login(userLogin: UserLogin): Promise<boolean> {
    return this.http
      .post(`${this.url}/login`, JSON.stringify(userLogin), {headers: this.headers})
      .toPromise()
      .then(response => {
        if(response.status !== 200) {
          return false;
        }

        var responseDto = response.json();
        console.debug('auth response ' + JSON.stringify(responseDto));

        this.token = responseDto.token;

        this.role = responseDto.role;
        this.saveAuthDataToCookie();

        return true;
      })
      .catch(this.handleError);
  }

  public isAuthenticated(): boolean {
    var item = localStorage.getItem(this.tokenKey);
    return item ? true : false;
  }

  public isAdmin(): boolean {
    var item = localStorage.getItem(this.tokenKey);
    if(item) {
      var authData = JSON.parse(item) as AuthData;
      return authData && authData.role && authData.role === 'ROLE_ADMIN';
    }
    return false;
  }

  public getToken(): string {
    var item = localStorage.getItem(this.tokenKey);
    if(item) {
      return JSON.parse(item).token;
    }
    return '';
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private saveAuthDataToCookie(): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(new AuthData(this.token, this.role)));
  }

}
