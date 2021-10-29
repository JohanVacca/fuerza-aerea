import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ApiService } from 'app/@core/services';
import { ApiService } from '../../services'
import { RolesService } from '../../services/roles/roles.service';
import { RoleModel } from '../../../../app/shared/models/role.model';
import { filter, flatMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly endpoint = 'user';

  constructor(private http: ApiService,
              private roles: RolesService) { }

  /**
   * Get the available commanders role
   */
  getAllCommanders() {
    return this.http.get(`${this.endpoint}/getCommanders`, null, true)
      .pipe(
        map((res: HttpResponse<RoleModel[]>) => {
          return res['users'] || null;
        }),
      );
  }

  /**
   * Get the available investigators role
   */
  getAllInvestigators() {
    return this.http.get(`${this.endpoint}/getInvestigators`, null, true)
      .pipe(
        map((res: HttpResponse<RoleModel[]>) => {
          return res['users'] || null;
        }),
      );
  }

  getUserCorreo(correo){
    return this.http.get(`${this.endpoint}/Correo/${correo}`,null,true)
      .pipe(
        map((res: HttpResponse<RoleModel[]>) => {
          return res['user'] || null;
        }),
      );
  }
}
