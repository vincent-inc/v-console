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

export interface JobRequest {
    configName?: string;
    configId?:   number;
    path?:       string;
    jobName?:    string;
    replaceMap?: Object;
}
