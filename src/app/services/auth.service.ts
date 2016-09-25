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
  private cookieKey = "PetsKey";
  private token: string;
  private role: string;

  constructor(private http: Http, private cookieService: CookieService) { }

  public login(userLogin: UserLogin): Promise<boolean> {
    return this.http
      .post(`${this.url}/login`, JSON.stringify(userLogin), {headers: this.headers})
      .toPromise()
      .then(response => {
        if(response.status === 200) {
          // Grab token from header
          var headers = response.headers;
          this.token = headers.get('Authorization').replace('Bearer ', '');
          console.log('found token ' + this.token);

          // Fetch the role after we have logged in
          return this.getRoleFromServer(this.token)
            .then(r => {
              this.role = r
              this.saveAuthDataToCookie();
              return true;
            })
            .catch(() => {})
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  public isAuthenticated(): boolean {
    var authData = this.cookieService.getObject(this.cookieKey) as AuthData;
    return authData && authData.token ? true : false;
  }

  public isAdmin(): boolean {
    var authData = this.cookieService.getObject(this.cookieKey) as AuthData;
    return authData && authData.role && authData.role === 'ROLE_ADMIN';
  }

  public getToken(): string {
    var authData = this.cookieService.getObject(this.cookieKey) as AuthData;
    return authData ? authData.token : '';
  }

  public logout(): void {
    this.cookieService.removeAll();
  }

  private getRoleFromServer(token: string): Promise<string> {
    return this.http.get(`${this.url}/users/role`, {headers: new Headers({'Authorization': token})})
      .toPromise()
      .then(response => response.text())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private saveAuthDataToCookie(): void {
    this.cookieService.putObject(this.cookieKey, new AuthData(this.token, this.role))
  }

}
