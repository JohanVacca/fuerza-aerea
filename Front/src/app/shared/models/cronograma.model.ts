export interface cronogramaObj {
    proyectId?: String;
    ConvocatoriaId: String;
    actividades: actividad[]
}

export interface actividad {
    idUnicoTare: Number,
    nombreAct: String,
    predecesora: predecesora,
    subActividad?: subAct[]
}

export interface predecesora {
    id: number,
    name: string
}

export interface subAct {
    _id?: string,
    nombreSub: String,
    fechaInicio: Date,
    fechaFinal: Date
    avance?: Number,
    fechaReal?: Date,
    Desface?: Number,
}
