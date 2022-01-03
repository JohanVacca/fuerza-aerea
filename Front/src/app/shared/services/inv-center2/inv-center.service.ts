import { Injectable } from '@angular/core';
import {ApiService} from '../../../@core/services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvCenterService {

  private readonly endpoint = 'inv-center';

  constructor(
      private http: ApiService,
  ) { }

  getAll() {
    return this.http.get(`${this.endpoint}`, null, true);
  }

  crearCentro(name: string) {
    return this.http.post(`${this.endpoint}`, {name}, true);
  }

  removeCenter(id: string) {
    return this.http.delete(`${this.endpoint}`, {body: {id}}, true);
  }
}
