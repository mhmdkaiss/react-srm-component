import React from 'react';

export enum AuthFormType {
    Login = 'Login',
    Register = 'Register',
    Forgot = 'Forgot',
}

export interface AuthFormAgreement {
    key: string,
    text: string | React.ReactElement,
    textValues?: {[key: string]: string},
    mandatory: boolean,
    checked: boolean,
}

export interface AuthFormData {
    type: AuthFormType,
    email?: string,
    userName?: string,
    password?: string,
    socialNetwork?: string,
    agreementList?: Array<AuthFormAgreement>
}
