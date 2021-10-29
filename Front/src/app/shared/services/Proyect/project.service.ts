import { Injectable } from '@angular/core';
import { ApiService } from '../../../@core/services';
import { map } from 'rxjs/operators';
import { Proyect } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly endpoint = 'Project';

  constructor(
    private http: ApiService,
  ) { }
  getIdConv(groupCategoryId: string) {
    return this.http.get(`${this.endpoint}/getIdConv/${groupCategoryId}`, null, true)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }
  add(Project: Partial<Proyect>) {
    return this.http.post(`${this.endpoint}`, Project)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }

  getById(ProjectId: string) {
    return this.http.get(`${this.endpoint}/${ProjectId}`, null, true)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }

  getAll() {
    return this.http.get(`${this.endpoint}`, null, true)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }

  update(ProjectId: string, Project: Partial<Proyect>) {
    return this.http.patch(`${this.endpoint}/${ProjectId}`, Project, null, true)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }

  delete(ProjectId: string) {
    return this.http.delete(`${this.endpoint}/${ProjectId}`, null, true)
      .pipe(
        map((res: any) => {
          return res || null;
        }),
      );
  }
}
