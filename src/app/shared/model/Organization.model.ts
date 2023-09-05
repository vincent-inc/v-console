export interface Organization {
    id?:                  string;
    users?:               User[];
    roles?:               Role[];
    organizationProfile?: OrganizationProfile;
    smtp?:                SMTP;
}

export interface OrganizationProfile {
    id?:           number;
    publicEmail?:  string;
    bio?:          string;
    timeZone?:     string;
    socialMedias?: string[];
    name?:         string;
    address?:      string;
    city?:         string;
    state?:        string;
    zip?:          number;
}

export interface Role {
    id?:         number;
    title?:      string;
    active?:     boolean;
    permission?: Permission;
}

export interface Permission {
    id?:                        number;
    all?:                       boolean;
    readOrganizationUser?:      boolean;
    readOrganizationRole?:      boolean;
    readOrganizationProfile?:   boolean;
    readOrganizationSmtp?:      boolean;
    modifyOrganizationUser?:    boolean;
    modifyOrganizationRole?:    boolean;
    modifyOrganizationProfile?: boolean;
    modifyOrganizationSmtp?:    boolean;
}

export interface SMTP {
    id?:       number;
    host?:     string;
    port?:     number;
    username?: string;
    password?: string;
}

export interface User {
    id?:          number;
    userProfile?: UserProfile;
    defineRole?:  Role[];
}

export interface UserProfile {
    id?:        number;
    alias?:     string;
    firstName?: string;
    lastName?:  string;
    email?:     string;
    city?:      string;
    state?:     string;
    zip?:       string;
}
