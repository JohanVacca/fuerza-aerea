import {Injectable} from '@angular/core';
import {ApiService} from '../../../@core/services';
import {map} from 'rxjs/operators';
import {Proyect} from '../../models/project.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private readonly endpoint = 'Project';

    constructor(
        private http: ApiService,
    ) {
    }

    public getIdConv(groupCategoryId: string): Observable<any> {
        return this.http.get(`${this.endpoint}/getIdConv/${groupCategoryId}`, null, true)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }

    public add(Project: Partial<Proyect>): Observable<any> {
        return this.http.post(`${this.endpoint}`, Project)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }

    public getById(ProjectId: string): Observable<any> {
        return this.http.get(`${this.endpoint}/${ProjectId}`, null, true)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }

    public getAll(): Observable<{ Proyectos: Proyect[] }> {
        return this.http.get(`${this.endpoint}`, null, true)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }

    public update(ProjectId: string, Project: Partial<Proyect>): Observable<any> {
        return this.http.patch(`${this.endpoint}/${ProjectId}`, Project, null, true)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }

    delete(ProjectId: string): Observable<any> {
        return this.http.delete(`${this.endpoint}/${ProjectId}`, null, true)
            .pipe(
                map((res: any) => {
                    return res || null;
                }),
            );
    }
}
