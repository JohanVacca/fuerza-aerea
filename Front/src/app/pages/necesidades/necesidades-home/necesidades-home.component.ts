import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {InvCenterService} from '../../../shared/services/inv-center2/inv-center.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { InvEndorsersService } from 'src/app/shared/services/inv-endorsers/inv-endorsers.service';
import { InvestigationProgramService } from 'src/app/shared/services/investigation-program/investigation-program.service';
import { InvestigationSubProgramService } from 'src/app/shared/services/investigation-sub-program/investigation-sub-program.service';
import { InvestigationTypesService } from 'src/app/shared/services/investigation-types/investigation-types.service';
import { InvestigationLinesService } from 'src/app/shared/services/investigation-lines/investigation-lines.service';
import { UsersService } from 'src/app/@core/services/users/users.service';
import {ActivatedRoute} from '@angular/router';
import { CommonSimpleModel } from 'src/app/shared/models/common-simple.model';
import { UserModel } from 'src/app/shared/models/user.model';
import {finalize, map, startWith} from 'rxjs/operators';
import { SaveStateService } from 'src/app/shared/services/saveStateService/save-state.service';
import { CentroDeInvestigacion, PrimerPaso, StateInterface} from 'src/app/shared/services/saveStateService/StateInterface';
import { UnidadService } from 'src/app/shared/services/unidad-service/unidad.service';
import { NecesidadService } from '../../../shared/services/necesidad-service/necesidad.service';
import { MatStepper } from '@angular/material/stepper';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-necesidades-home',
  templateUrl: './necesidades-home.component.html',
  styleUrls: ['./necesidades-home.component.scss']
})


export class NecesidadesHomeComponent implements OnInit {

  private state: StateInterface;

  constructor(
      private necesidadService: NecesidadService, 
      private UserService: UsersService,
      private fb: FormBuilder,
      private investigationLinesService: InvestigationLinesService,
      private investigationProgramService: InvestigationProgramService,
      private investigationSubProgramService: InvestigationSubProgramService,
      private investigationTypesService: InvestigationTypesService,
      private rutaActiva: ActivatedRoute,
      private form: FormBuilder,
  ) {
  }

  public LIST = 'Necesidades';
  public MESSAGE_LIST = 'A continuación podrá crear las necesidades de su unidad';
  public displayedColumns1: string[] = ['name','programa', 'subprograma','lineainv', 'descripcion', 'porque', 'acciones'];
  public necesidades = [];
  public name = '';
  public centrosForm: FormGroup;
  public programa;
  public subprograma;
  public lineaInv;
  public LinesIns: CommonSimpleModel[] = [];
  public ProgamIns: CommonSimpleModel[] = [];
  public ProgamSubIns: CommonSimpleModel[] = [];
  public Convocatoria: string;
  public validador = true;
  public UserIns = ' ';
  public gestorActiId;
  public ubicacion = '';
  public rResponsable;
  public comandante ;


  @Input() stepper: MatStepper;
  public filteredOptions: Observable<string[]>;
  public myControl = new FormControl(); 
 
  ngOnInit(): void {
    this.builder();
 //   this.getUnidades();
//   this.getProgramss();
//    this.getAll();
  }

  public setName(name: string): void {
    this.name = name;
  }


/*   public removeUnidad(id: string): void {
    this.necesidadService.removeUnidad(id)
        .pipe(finalize(() => this.getUnidades()))
        .subscribe(nuevoCentro => {}); 
  } */

  public addUnidad(): void {
    if (this.name) {
/*       this.necesidadService.createUnidad(this.name, this.ubicacion)
          .pipe(finalize(() => this.getUnidades()))
          .subscribe(nuevoCentro => {});  */
    }
  }

  private builder(): void {
    this.centrosForm = this.fb.group({
      name: new FormControl(''),
      programa: new FormControl('', [Validators.required]),
      avala: new FormControl('', [Validators.required]),

    });
  }

  public guardar(): void {
    this.updateState();
}
  updateState() {
    throw new Error('Method not implemented.');
  }

/*   public getAll(): void {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    this.investigationProgramService.getIdConv(this.Convocatoria).subscribe(responseProgram => {
        this.ProgamIns = responseProgram;
    });

  } */
/* 
  public getAll(): void {
    let cv = this.rutaActiva.snapshot.params;
    this.Convocatoria = cv.id;
    this.investigationLinesService.getIdConv(this.Convocatoria).subscribe(responseLines => {
      this.LinesIns = responseLines;
      if (responseLines.length > 0) {
          this.LinesIns = responseLines.sort((a, b) => {
              return a.descr < b.descr ? -1 : 1;
          });
      }
      this.initAutoComplete();
        });
      }

  
  private initAutoComplete(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
    );
}
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase(); 
    const newArrayList = [];
    this.LinesIns.map(option => {
        if (option.descr.toLowerCase().includes(filterValue)) {
            newArrayList.push(option.descr.toLowerCase());
        }
    });
    return newArrayList; */
//}

/* private getAll(): void{
  this.usersService.getAll()
      .subscribe(users => {
          this.Responsables = [];
          users.map(user => {
            if (user.role.name === 'Responsable'){
                this.Responsables.push(user);
            }
          });
      });
} */

/*   private getUnidades(): void {
    this.necesidadService.getAll()
        .subscribe(unidad => {
          console.log('unidad >>> ', unidad);
          // @ts-ignore
          this.unidades = unidad.unidades;
        });
  }  */


  

}


