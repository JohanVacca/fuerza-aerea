
export interface StateInterface {
    primerPaso?: PrimerPaso;
    segundoPaso?: SegundoPaso;
    tercerPaso?: TercerPaso;
    cuartoPaso?: CuartoPaso;
    quintoPaso?: QuintoPaso;
}

export interface PrimerPaso {
    nombreProyecto?: string;
    unidadDependencia?: string;
    correoGestor?: string;
    telefonoGestor?: string;
    nombreGestor?: string;
    comandante?: string;
    lugarDeEjecucion?: string;
    duracionEnMeses?: string;
    lineaDeInvestigacion?: string;
    modeloDeInvestigacion?: string;
    programaDeInvestigacion?: string;
    subProgramaDeInvestigacion?: string;
    quienAvalaInvestigacion?: string;
    centroDeInvestigacion?: string;
}

export interface SegundoPaso {
    listaDeGrupos?: Grupo[];
    equipoDeInvestigacion?: Investigador[];
}

export interface TercerPaso {
    componentePresupuestal?: ComponentePresupuestal;
    cronogramaProyecto?: CronogramaProyecto;
    productosEsperados?: ProductosEsperados;
}

export interface CuartoPaso {
    objetivo?: Objetivo;
    informacion?: Informacion;
    resumen?: string;
    marcoConceptual?: string;
    estadoDelArte?: string;
    metodologia?: string;
    resultadosEsperados?: string;
    resultadosPrevios?: string;
    bibliografi?: string[];
    complementos?: string;
}

export interface QuintoPaso {
    integrantesDelProyecto?: string;
    compromisoSecretoProfesional?: string;
    acuerdoPropiedadIntelectual?: string;
    formalizacionAlianzas?: string;
}

export interface Informacion {
    nombreDeLaInvestigacion?: string;
    preguntaDeLaInvestigacion?: string;
    impactoDeLaInvestigacion?: string;
    palabrasClave?: string;
}

export interface Objetivo {
    objetivoGeneral?: string;
    objetivosEspecificos?: ObjetivoEspecifico[];
}

export interface ObjetivoEspecifico {
    descr?: string;
}

export interface ProductosEsperados {
    producto?: Producto;
}

export interface Producto {
    tipo?: string;
    rubroRelacionado?: string;
    descripcion?: string;
    participacion?: Participacion;
}

export interface Participacion {
    fuerzaAerea?: string;
    otros?: string;
}

export interface CronogramaProyecto {
    actividades?: Actividad[];
}

export interface Actividad {
    nombre?: string;
    actividadPredecesora?: string;
    subActividad?: string;
    fechaInicio?: string;
    fechaFinal?: string;
}

export interface ComponentePresupuestal {
    entidades?: Entidad[];
    rubros?: number[];
    personalCientifico?: PersonalCientifico[];
}

export interface PersonalCientifico {
    Descripcion: string;
    DuracionEnMeses: number;
    EntidadesCostos: EntidadCosto[];
    Experiencia: string;
    Formacion: string;
    HorasSemanales: number;
    InvestigadorSeleccionado: Investigador;
    Justificacion: string;
    NombreDelInvestigador: string;
    NombreRubro: string;
    PerfilDelInvestigador: PerfilInvestigador;
    RolDelInvestigador: string;
    idRubro: string;
}

export interface EntidadCosto {
    efectivo: number;
    especie: number;
    id: number;
    institucion: string;
}

export interface PerfilInvestigador {
    experiencia: string;
    formacion: string;
    honorarioId: number;
    topeMaximo: number;
}

export interface Rubro {
    rubro?: number;
}

export interface Entidad {
    nombre?: string;
    nit?: string;
    personaACargo?: string;
    numeroDeContacto?: string;
    email?: string;
}

export interface Grupo {
    numero?: number;
    nombreGrupo?: string;
    codigo?: string;
    categoria?: string;
    antiguedad?: string;
    entidad?: string;
    lider?: string;
}

export interface Investigador {
    investigador?: string;
    nombres?: string;
    apellido?: string;
    identificacion?: string;
    grado?: string;
    rol?: string;
    dedicacion?: string;
    cargo?: string;
    grupos?: string;
}

export interface CentroDeInvestigacion {
    _id?: string;
    name?: string;
}

export interface MetodologiaObjetivo {
    objetivo?: string;
    actividades?: string[];
}

export interface CronogramaResponse {
    cronogramas: CronogramaResponseObject;
}

export interface CronogramaResponseObject {
    ConvocatoriaId: string;
    actividades: ActividadResponse[];
    proyectId: string;
}

export interface ActividadResponse {
    nombreAct: string;
    objetivo: string;
}

export interface ActividadObject {
    nombreAct: string;
    objetivo: string;
}

export interface RubrosPDF {
    tipo?: string;
    entidad?: string;
    especie?: number;
    efectivo?: number;
}

export interface RubrosPorEntidades {
    entidad?; string;
    rubro?: RubrosPDF[];
}
