import { MatColumn, MatTableHide, MatTableSetting, Time } from "./Mat.model";

export interface Jwt {
    jwt?: string;
}

export interface User {
    id?:          number;
    sub?:         string;
    email?:       string;
    name?:        string
    username?:    string;
    password?:    string;
    userProfile?: UserProfile;
    userRoles?:   UserRole[];
    userApis?:    UserAPI[];
    expirable?:   boolean;
    expireTime?:  Time;
    enable?:      boolean;
}

export interface UserAPI {
    id?:         number;
    name?:       string;
    apiKey?:     string;
    expirable?:  boolean;
    enable?:     boolean;
    expireTime?: Time;
}

export interface UserProfile {
    id?:          number;
    alias?:       string;
    firstName?:   string;
    lastName?:    string;
    phoneNumber?: string;
    email?:       string;
    address?:     string;
    city?:        string;
    state?:       string;
    zip?:         string;
}

export interface UserRole {
    id?:    number;
    name?:  string;
    level?: number;
}

export interface Route {
    id?:     number;
    path?:   string;
    method?: string;
    secure?: boolean;
    roles?:  UserRole[];
}

export default class UserRow
{
    id?:                   number;
    username?:              string;
    email?:                 string;
    enable?:                boolean;
    userRoles?:             string;

    constructor(id: number, username: string, email: string, enable: boolean, userRoles: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.enable = enable;
        this.userRoles = userRoles;
    }
}

export class Player {
    id!: number;
    alias!: string;

    constructor(user: User) {
        this.id = user.id!;
        this.alias = user.userProfile!.alias!;
    }
}

export interface OpenIdRequest {
    code: string;
    state: string;
    redirectUri: string;
}

export interface Swaggers {
    serviceName: string;
    prefix:      string;
    paths:       Path[];
}

export class Path {
    @MatTableSetting("Absolute Path (with Regrex)")
    path?:   string;

    @MatTableHide(true)
    method?: Method[];

    constructor(path?: string, method?: Method[]) {
        this.path = path;
        this.method = method ?? [new Method()] as Method[];
    }
}

export class Method {
    name?:        MethodName;
    summary?:     null | string;
    operationId?: string;

    constructor(name?: MethodName, summary?: string, operationId?: string) {
        this.name = name;
        this.summary = summary;
        this.operationId = operationId;
    }
}

export enum MethodName {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE",
}
