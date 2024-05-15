
export interface ConfigModel {
    id?:                  number;
    name:                string;
    possibleReplaceKeys?: string[];
    file:                string;
}

export class MatConfigModel {
    id?: number;
    name?: string;
}