import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Pet} from "../models/pet";
import {environment} from '../environment.ts';
import {AuthService} from "./auth.service";

@Injectable()
export class PetService {
  private petsUrl = environment.apiUrl + "/pets";
  private headers: Headers;

  constructor(private http: Http, private authService: AuthService) {
  }

  findMany(): Promise<Pet[]> {
    return this.http.get(this.petsUrl)
      .toPromise()
      .then(response => response.json() as Pet[])
      .catch(this.handleError);
  }

  findOne(id: number): Promise<Pet> {
    return this.http.get(`${this.petsUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Pet)
      .catch(this.handleError);
  }

  update(pet: Pet): Promise<Pet> {
    return this.http
      .put(this.petsUrl, JSON.stringify(pet), {headers: this.getHeaders()})
      .toPromise()
      .then(() => pet)
      .catch(this.handleError);
  }

  create(pet: Pet): Promise<Pet> {
    return this.http
      .post(this.petsUrl, JSON.stringify(pet), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.petsUrl}/${id}`, {headers: this.getHeaders()})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(keyword: string, petType: string): Promise<Pet[]> {
    return this.http.get(`${this.petsUrl}/?keyword=${keyword}&petType=${petType}`)
      .toPromise()
      .then(response => response.json() as Pet[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private getHeaders(): Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization':this.authService.getToken()});
  }

}
