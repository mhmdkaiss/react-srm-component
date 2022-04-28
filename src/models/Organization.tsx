export interface Organization {
    name: string,
    domain: string,
    color: OrganizationColor,
    s3path?: string,
}

export interface OrganizationColor {
    primary: string,
    secondary: string,
}
