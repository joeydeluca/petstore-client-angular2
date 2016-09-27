import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Pet} from "../models/pet";
import {environment} from '../environment.ts';
import {AuthService} from "./auth.service";

/**
 * Hello everyone! I am the Pet Service. Use me when you want to make pet related calls to the server.
 */
@Injectable()
export class PetService {
  private petsUrl = environment.apiUrl + "/pets";

  constructor(private http: Http, private authService: AuthService) {
  }

  /**
   * Find all pets. No pagination yet!
   * @returns {Promise<any>|Promise<T>}
   */
  findMany(): Promise<Pet[]> {
    return this.http.get(this.petsUrl)
      .toPromise()
      .then(response => response.json() as Pet[])
      .catch(this.handleError);
  }

  /**
   * Finds a single pet based on the id
   * @param id
   * @returns {Promise<any>|Promise<T>}
   */
  findOne(id: number): Promise<Pet> {
    return this.http.get(`${this.petsUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Pet)
      .catch(this.handleError);
  }

  /**
   * Updates a pet
   * @param pet
   * @returns {Promise<any>|Promise<T>}
   */
  update(pet: Pet): Promise<Pet> {
    return this.http
      .put(this.petsUrl, JSON.stringify(pet), {headers: this.getHeaders()})
      .toPromise()
      .then(() => pet)
      .catch(this.handleError);
  }

  /**
   * Creates a new pet
   * @param pet
   * @returns {Promise<any>|Promise<T>}
   */
  create(pet: Pet): Promise<Pet> {
    return this.http
      .post(this.petsUrl, JSON.stringify(pet), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Deletes an existing pet
   * @param id
   * @returns {Promise<any>|Promise<T>}
   */
  delete(id: number): Promise<void> {
    return this.http.delete(`${this.petsUrl}/${id}`, {headers: this.getHeaders()})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  /**
   * Search for pets based on some parameters
   * @param keyword
   * @param petType
   * @returns {Promise<any>|Promise<T>}
   */
  search(keyword: string, petType: string): Promise<Pet[]> {
    return this.http.get(`${this.petsUrl}/?keyword=${keyword}&petType=${petType}`)
      .toPromise()
      .then(response => response.json() as Pet[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    if(error.status == 412) {
      return Promise.reject(JSON.parse(error._body));
    }
    return Promise.reject(error.message || error);
  }

  private getHeaders(): Headers {
    return new Headers({'Content-Type': 'application/json', 'Authorization':this.authService.getToken()});
  }

}
