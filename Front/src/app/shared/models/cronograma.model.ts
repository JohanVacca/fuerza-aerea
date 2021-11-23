export interface cronogramaObj {
    proyectId?: string;
    ConvocatoriaId: string;
    actividades: actividad[];
}

export interface actividad {
    idUnicoTare: number;
    nombreAct: string;
    predecesora: predecesora;
    subActividad?: subAct[];
    objetivo?: string;
}

export interface predecesora {
    id: number;
    name: string;
}

export interface subAct {
    _id?: string,
    nombreSub: string;
    fechaInicio: Date;
    fechaFinal: Date;
    avance?: number;
    fechaReal?: Date;
    Desface?: number;
}
