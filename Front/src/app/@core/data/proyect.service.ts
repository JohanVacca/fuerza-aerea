
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


let counter = 0;

@Injectable()
export class ProyectService {
  private controller: string = "Proyectos";

  private proyectos = [];

  private proyectArray: any[];

  constructor(private http: HttpClient) {

  }

  public getProyects() {
    return this.http.get(environment.api_url + this.controller);
  }

  public getOneProyect(idProyect : number) {
    return this.http.get(environment.api_url + this.controller+ "/"+idProyect);
  }

  public createProyect(proyect) {
    return this.http.post(environment.api_url + this.controller, proyect);
  }

  public updateProyect(proyect) {
    return this.http.put(environment.api_url + this.controller, proyect);
  }

  public deleteProyect(idProyect : number) {
    return this.http.delete(environment.api_url + this.controller+ "/"+idProyect);
  }

}
