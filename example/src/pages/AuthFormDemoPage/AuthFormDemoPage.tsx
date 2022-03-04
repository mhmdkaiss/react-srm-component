import { AuthForm, AuthFormType, NCSelect } from '@cactus/srm-component';
import { createMuiTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { AuthFormAgreement, AuthFormData } from '../../../../src/models/AuthFormType';
import './AuthFormDemoPage.scss';

export const AuthFormDemoPage: React.FunctionComponent = () => {
    const formTypeValues = [
        { key: 'Login', value: AuthFormType.Login.valueOf() },
        { key: 'Register', value: AuthFormType.Register.valueOf() },
        { key: 'Forgot', value: AuthFormType.Forgot.valueOf() },
    ];
    const [ formType, setFormType ] = useState<string>(formTypeValues[0].value);

    const socialNetworks: Array<string> = [ 'twitch', 'discord', 'google', 'apple', 'facebook' ];
    const agreementList: Array<AuthFormAgreement> = [
        { key: '1', text: 'I\'m over 12 years old AND if I am below 16 my parents authorize me to access this website', mandatory: true, checked: false },
        { key: '2', text: 'I agree to share communications with [PARTNER]', mandatory: false, checked: false },
        { key: '3', text: 'I agree to receive communication from nicecactus', mandatory: false, checked: false }
    ];

    const AuthFormTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#ff0000',
            },
            secondary: {
                main: '#FFFFFF',
            },
            type: 'dark'
        },
        typography: {
            fontFamily: 'mollenregular',
        },
    });

    const getSubmittedForm = async(submittedForm: AuthFormData) => {
        console.log(submittedForm);
    };

    return (
        <div className='corner-login-demo-page'>
            <div className='d-flex flex-row mb-3 w-50'>
                <div className='w-25 text-white'>Form type :</div>
                <NCSelect
                    selectFields={formTypeValues}
                    fieldValue={'value'}
                    fieldName={'key'}
                    actionHook={(event) => {
                        if (typeof event === 'string') {
                            setFormType(event);
                        }
                    }}
                />
            </div>
            <div className='login-wrapper'>
                <AuthForm
                    formType={AuthFormType[formType]}
                    agreementList={agreementList}
                    onFormSubmit={(formSubmitted) => getSubmittedForm(formSubmitted)}
                    socialNetworks={socialNetworks}
                    theme={AuthFormTheme}
                    onSwitchFormType={setFormType}
                />
            </div>
        </div>
    );
};
