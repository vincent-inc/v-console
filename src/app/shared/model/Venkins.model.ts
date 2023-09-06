import { MatRow } from "./Mat.model";

export interface ConfigModel {
    id?:                  number;
    name:                string;
    possibleReplaceKeys?: string[];
    file:                string;
}

export class MatConfigModel implements MatRow {
    id?: number;
    name?: string;
}