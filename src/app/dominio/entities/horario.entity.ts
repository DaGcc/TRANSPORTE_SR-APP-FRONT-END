export interface HorarioEntity {
    idHorari:   number;
    titulo:      string;
    horaInicio:  string;
    horaFin:     string;
    diaInicio:   string;
    diaFin:      string;
    diaCompleto: boolean;
    estado:      boolean;
    events:      Event[];
}

export interface Event {
    start:  string;
    titulo: string;
    end:    string;
}
