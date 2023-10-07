export interface EstructuraDialogoConfirmacion {

    header : string  | undefined; 
    body : string | undefined; 
    isEnableBtnCancel? : boolean;
    isEnableBtnConfir? : boolean;
}