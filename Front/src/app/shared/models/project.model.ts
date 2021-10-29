export interface Proyect {
  UserId?: String,
  Convocatoria?: String,
  ProyectoBloqueado?: boolean,
  Seguimiento?: boolean,
  objetivosEspecificos?: objetivosEspecifico[],
  Entidades?: Entidad[],
  EquipoInvestigaciones?: EquipoInvestigacion[], //Cambiar el modelo del back
  AgregarDetallesRubros?: AgregarDetallesRubros[], //Cambiar el modelo del back
  resultadosPrevios?: String,
  iniciarProyecto?: iniciarProyecto, //Cambiar el modelo del back
  metodologia?: String,
  marcoConceptual?: String,
  resumen?: String,
  productosEsperados?: productosEsperados[],
  informaciones?: informacion[], //Cambiar el modelo del back
  estadoArte?: String,
  bibliografias?: bibliografia[], //Cambiar el modelo del back
  palabraClaves?: palabraClaves[], //Cambiar el modelo del back
  resultadosEsperados?: String,
  objetivoGeneral?: String,
  grupos?: Grupo[],
  ValorTotal?: number,
  calificaciones?: Calificaciones
};

export interface productosEsperados {
  descripcion: String,
  partFuerza: Number,
  partOtros: Number,
  rubroRelacionado: String,
  tipoProducto: String
}

export interface palabraClaves {
  palabra: String
}
export interface objetivosEspecifico {
  descr: String,
}

export interface bibliografia {
  bibliografia: String,
}
// convocatoria y usuario crador

export interface Grupo {
  nombreGrupo: String,
  entidad: String,
  antiguedad: String,
  codigo: String,
  categoria: String
}

export interface informacion {
  impacto: String,
  nInvestigacion: String,
  pregunta: String
}

export interface iniciarProyecto {
  telefonoGestor: Number,
  subprograma: String,
  programa: String,
  nombreProyecto: String,
  modelo: String,
  lugar: String,
  linea: String,
  gestor: String,
  email: String,
  duracion: Number,
  dependencia: String,
  comandante: String,
  avala: String
}

export interface AgregarDetallesRubros {
  idRubro?: String,
  RolDelInvestigador?: String,
  PerfilDelInvestigador?: String,
  NombreRubro?: String,
  NombreDelInvestigador?: String,
  Justificacion?: String,
  HorasSemanales?: String,
  Formacion?: String,
  Experiencia?: String,
  EntidadesCostos?: [{
    institucion: String,
    id: Number,
    especie: String,
    efectivo: String
  },
  ],
  TotalEfectivo?: number,
  DuracionEnMeses?: String,
  Descripcion?: String
  PresupuestoEjecutado?: Number,
  Cumplimiento?: number,
}

export interface EquipoInvestigacion {
  nombres: String,
  apellido: String,
  identificacion: Number,
  grupos: String,
  grado: String,
  dedicacion: String,
  cargo: String
}

export interface Entidad {
  Institucion: String,
  Nit: String,
  Persona: String,
  correo: String,
  numero: String
}

export interface Calificaciones {
  idEv?: String,
  ValorParcial?: number,
  Evaluado?: boolean,
  Valores?: {
    vlrequipo: number,
    vlrestado: number,
    vlrmarco: number,
    vlrobjEspecifico: number,
    vlrobjGeneral: number,
    vlrpalabrasClaves: number,
    vlrproyecto: number,
    vlrresumen: number,
    vlrunidadependencia: number
  }
}