export interface OptionalFields {
    type: string;
    mandatory: boolean;
}

export enum OptionalFieldType {
    FIRSTNAME = 'first_name',
    LASTNAME = 'last_name',
    PHONENUMBER = 'phone',
    BIRTHDATE = 'birthdate',
}
