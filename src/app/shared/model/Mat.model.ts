export interface MatRow {
    
}

export interface Time {
    id?:     number;
    year?:   number;
    month?:  number;
    day?:    number;
    hours?:  number;
    minute?: number;
    second?: number;
}

export interface DialogInput {
    title?: string,
    message?: string,
    yes?: string,
    no?: string,
    multipleLine?: boolean,
    defaultValue?: any
}