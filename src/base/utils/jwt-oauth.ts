
export interface JwtOauth {
    access_token:   string;
    token_type:     string;
    refresh_token:  string;
    expires_in:     number;
    scope:          string;
    info_adicional: string;
    id_usuario:     number;
    fecha_creacion: string;
    email:          string;
    jti:            string;
}
