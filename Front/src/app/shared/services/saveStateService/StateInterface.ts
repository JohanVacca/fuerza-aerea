import {FormControl, Validators} from '@angular/forms';

export interface StateInterface {
    primerPaso?: PrimerPaso;
    segundoPaso?: SegundoPaso;
    tercerPaso?: TercerPaso;
    cuartoPaso?: CuartoPaso;
    quintoPaso?: QuintoPaso;
}

export interface PrimerPaso {
    comandante: string;
    nombreProyecto: string;
    telefonoGestor: number;
    dependencia: string;
    email: string;
    gestor: string;
    lugar: string;
    duracion: number;
    linea: string;
    modelo: string;
    programa: string;
    subprograma: string;
    avala: string;
    centroDeInvestigacion?: string;
    gestorId?: string;
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
    planteamiento?: Planteamiento;
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
    EntidadesCostos: number;
    Experiencia: string;
    Formacion: string;
    HorasSemanales: number;
    Justificacion: string;
    NombreDelInvestigador: string;
    NombreRubro: string;
    PerfilDelInvestigador: PerfilInvestigador;
    RolDelInvestigador: string;
    idRubro: string;
    entidad: string;
    tipoDeRubro: string;
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
    investigadorId?: string;
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

export interface FirmasProyecto {
    liderInvestigacion?: Firma;
    gestorActi?: Firma;
    ComandanteJefe?: Firma;
}

export interface Firma {
    id: string;
    name: string;
    status: boolean;
}

export interface Planteamiento {
    planteamiento: string;
    enQueConsiste: string;
    porQueSeRequiere: string;
    paraQueDesarrollarlo: string;
    beneficiosFAC: string;
    utilidad: number;
    inversion: number;
}
