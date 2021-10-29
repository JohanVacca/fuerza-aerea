import { Component, OnInit } from '@angular/core';
import { Proyect, AgregarDetallesRubros, informacion, Entidad, EquipoInvestigacion, Grupo, iniciarProyecto, bibliografia } from '../../../../shared/models/project.model';
import { ProjectService } from '../../../../shared/services/Proyect/project.service';
import { AuthStorageService } from '../../../../@core/services/storage/auth-storage/auth-storage.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VistaFormulacionComponent, VistaFormulacionData } from '../vista-formulacion/vista-formulacion.component';
import { InstructivosService } from '../../../../@core/services/instructivos/FormIns.service';
import { Api } from '../../../../../environments/environment'
import { cronogramaObj, actividad } from '../../../../shared/models/cronograma.model';
import { cronogramaService } from '../../../../shared/services/cronograma/cronograma.service'

export interface file {
  NombreArchivo: String,
  suma: number[];
}

@Component({
  selector: 'app-create-proyect',
  templateUrl: './create-proyect.component.html',
  styleUrls: ['./create-proyect.component.scss']
})
export class CreateProyectComponent implements OnInit {
  aceptoTerminos = false
  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    private auth: AuthStorageService,
    private rutaActiva: ActivatedRoute,
    private instructivosService: InstructivosService,
    private cronogramaService: cronogramaService) { }

  ngOnInit(): void {
    this.IdProyec = localStorage.getItem("IdProyec");
    if (this.IdProyec != undefined) {
      this.Val = true
    }
  }
  ProyectoNuevo: Proyect;
  IdProyec;
  Val = false;
  AgregarDetalles: AgregarDetallesRubros[];
  informaciones: informacion[];
  Entidades: Entidad[];
  EquipoInvestigaciones: EquipoInvestigacion[];
  Grupos: Grupo[];
  iniciarProyecto: iniciarProyecto;
  bibliografia: bibliografia[];
  UserId;
  Actividades: actividad[];

  ValiniciarProyecto;
  ValComponenteCient;
  ValProductos;
  ValComposicion;
  ValiniciarObjeGeneral;

  up() {
    let cv = this.rutaActiva.snapshot.params;
    let Convocatoria = cv.id;
    this.AgregarDetalles = JSON.parse(localStorage.getItem("AgregarDetallesRubros"));
    this.Entidades = JSON.parse(localStorage.getItem("Entidades"));
    this.informaciones = JSON.parse(localStorage.getItem("informacion"));
    this.EquipoInvestigaciones = JSON.parse(localStorage.getItem("equipoInvestigacion"));
    this.Grupos = JSON.parse(localStorage.getItem("grupos"));
    this.iniciarProyecto = JSON.parse(localStorage.getItem("iniciarProyecto"));
    this.bibliografia = JSON.parse(localStorage.getItem("bibliografia"));
    this.UserId = this.auth.getUserId();
    this.Actividades = JSON.parse(localStorage.getItem("cronograma"));

    this.ProyectoNuevo = {
      UserId: this.UserId,
      Convocatoria: Convocatoria,
      ProyectoBloqueado: false,
      Seguimiento: false,
      AgregarDetallesRubros: this.AgregarDetalles,
      Entidades: this.Entidades,
      EquipoInvestigaciones: this.EquipoInvestigaciones,
      bibliografias: this.bibliografia,
      estadoArte: localStorage.getItem("estadoArte"),
      grupos: JSON.parse(localStorage.getItem("grupos")),
      informaciones: this.informaciones,
      iniciarProyecto: this.iniciarProyecto,
      marcoConceptual: localStorage.getItem("marcoConceptual"),
      metodologia: localStorage.getItem("metodologia"),
      objetivoGeneral: JSON.parse(localStorage.getItem("objetivoGeneral")),
      objetivosEspecificos: JSON.parse(localStorage.getItem("objetivosEspecificos")),
      palabraClaves: JSON.parse(localStorage.getItem("palabraClaves")),
      resultadosEsperados: localStorage.getItem("resultadosEsperados"),
      productosEsperados: JSON.parse(localStorage.getItem("productosEsperados")),
      resultadosPrevios: localStorage.getItem("resultadosPrevios"),
      resumen: localStorage.getItem("resumen"),
      ValorTotal: 0
    }
    if (this.iniciarProyecto != null) {
      if (JSON.parse(localStorage.getItem("objetivoGeneral")) != null) {
        if (this.Grupos != null && this.EquipoInvestigaciones != null) {
          if (this.Entidades != null && this.AgregarDetalles != null && localStorage.getItem("productosEsperados") != null) {
            if (this.informaciones != null) {
              this.projectService.add(this.ProyectoNuevo).subscribe(r => {
                let idProject = r.Proyecto._id;

                let cronograma: cronogramaObj = {
                  ConvocatoriaId: Convocatoria,
                  proyectId: idProject,
                  actividades: this.Actividades
                }
                this.cronogramaService.add(cronograma).subscribe(r => {
                  console.log(r)
                })
                this.auth.getFile().forEach(element => {

                  let formData = new FormData();
                  formData.append('CodigoPr', idProject);
                  formData.append('NombreTipo', element.name);
                  let file = element.file
                  formData.append('file', file, element.name);
                  formData.append('NombreDoc', element.NombreDoc)
                  formData.append('NombreArchivo', Api.api + element.name + idProject + '.' + file.type.split('/')[1])

                  this.instructivosService.uploadFile(formData).subscribe((res) => {
                  });
                });

                let datos: VistaFormulacionData = {
                  idProyecto: idProject,
                  evaluar: false
                }
                const dialogRef = this.dialog.open(VistaFormulacionComponent, {
                  data: datos
                })
              })
              let token = localStorage.getItem("token");
              let role = localStorage.getItem("Role");
              localStorage.clear()
              localStorage.setItem("token", token);
              localStorage.setItem("Role", role);
            }
          } else {
            this.ValProductos = true;
          }
        } else {
          this.ValComponenteCient = true;
        }
      } else {
        this.ValiniciarObjeGeneral = true;
      }
    } else {
      this.ValiniciarProyecto = true;
    }
  }


  upDate() {
    let cv = this.rutaActiva.snapshot.params;
    let Convocatoria = cv.id;
    this.AgregarDetalles = JSON.parse(localStorage.getItem("AgregarDetallesRubros"));
    this.Entidades = JSON.parse(localStorage.getItem("Entidades"));
    this.informaciones = JSON.parse(localStorage.getItem("informacion"));
    this.EquipoInvestigaciones = JSON.parse(localStorage.getItem("equipoInvestigacion"));
    this.Grupos = JSON.parse(localStorage.getItem("grupos"));
    this.iniciarProyecto = JSON.parse(localStorage.getItem("iniciarProyecto"));
    this.bibliografia = JSON.parse(localStorage.getItem("bibliografia"));
    this.UserId = this.auth.getUserId();

    this.ProyectoNuevo = {
      UserId: this.UserId,
      Convocatoria: Convocatoria,
      ProyectoBloqueado: false,
      AgregarDetallesRubros: this.AgregarDetalles,
      Entidades: this.Entidades,
      EquipoInvestigaciones: this.EquipoInvestigaciones,
      bibliografias: this.bibliografia,
      estadoArte: localStorage.getItem("estadoArte"),
      grupos: JSON.parse(localStorage.getItem("grupos")),
      informaciones: this.informaciones,
      iniciarProyecto: this.iniciarProyecto,
      marcoConceptual: localStorage.getItem("marcoConceptual"),
      metodologia: localStorage.getItem("metodologia"),
      objetivoGeneral: JSON.parse(localStorage.getItem("objetivoGeneral")),
      objetivosEspecificos: JSON.parse(localStorage.getItem("objetivosEspecificos")),
      palabraClaves: JSON.parse(localStorage.getItem("palabraClaves")),
      resultadosEsperados: localStorage.getItem("resultadosEsperados"),
      productosEsperados: JSON.parse(localStorage.getItem("productosEsperados")),
      resultadosPrevios: localStorage.getItem("resultadosPrevios"),
      resumen: localStorage.getItem("resumen"),
      ValorTotal: 0
    }

    if (this.iniciarProyecto != null) {
      if (JSON.parse(localStorage.getItem("objetivoGeneral")) != null) {
        if (this.Grupos != null && this.EquipoInvestigaciones != null) {
          if (this.Entidades != null && this.AgregarDetalles != null && localStorage.getItem("productosEsperados") != null) {
            if (this.informaciones != null) {
              this.projectService.update(localStorage.getItem("IdProyec"), this.ProyectoNuevo).subscribe(r => {
                let idProject = r.Proyecto._id;
                this.auth.getFile().forEach(element => {
                  let formData = new FormData();
                  formData.append('CodigoPr', idProject);
                  formData.append('NombreTipo', element.name);
                  let file = element.file
                  formData.append('file', file, element.name);
                  formData.append('NombreDoc', element.NombreDoc)
                  formData.append('NombreArchivo', Api.api + element.name + idProject + '.' + file.type.split('/')[1])

                  this.instructivosService.uploadFile(formData).subscribe((res) => {
                  });
                });

                this.auth.setFileC();
                let datos: VistaFormulacionData = {
                  idProyecto: idProject,
                  evaluar: false
                }
                const dialogRef = this.dialog.open(VistaFormulacionComponent, {
                  data: datos
                })
              })
              let token = localStorage.getItem("token");
              let role = localStorage.getItem("Role");
              localStorage.clear()
              localStorage.setItem("token", token);
              localStorage.setItem("Role", role);
            } else {
              this.ValComposicion = true;
            }
          } else {
            this.ValProductos = true;
          }
        } else {
          this.ValComponenteCient = true;
        }
      } else {
        this.ValiniciarObjeGeneral = true;
      }
    } else {
      this.ValiniciarProyecto = true;
    }
  }

  CloseAlert() {
    this.ValiniciarProyecto = false;
    this.ValComponenteCient = false;
    this.ValProductos = false;
    this.ValComposicion = false;
    this.ValiniciarObjeGeneral = false;
  }
}
