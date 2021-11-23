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
}
