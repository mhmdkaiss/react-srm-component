import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '../../../atoms';
import { ButtonSize, ButtonTheme, ButtonType } from '../../../atoms/Button/Button';
import {
    Checkbox,
    FormControlLabel,
    MuiThemeProvider,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { AuthFormAgreement, AuthFormData, AuthFormType } from '../../../models/AuthFormType';
import { IconType } from '../../../atoms/Icon/Icon';
import './AuthForm.scss';
import { AuthFormDefaultTheme } from '../../../styles/MuiAuthFormTheme';

interface AuthFormProps {
    formType: AuthFormType;
    agreementList: Array<AuthFormAgreement>
    onFormSubmit: (response: AuthFormData) => void;
    socialNetworks?: Array<string>;
    theme?: Theme;
}

export const AuthForm: React.FunctionComponent<AuthFormProps> = (props: AuthFormProps) => {
    const intl = useIntl();

    const [ userName, setUserName ] = useState<string>('');
    const [ userEmail, setUserEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ passwordCheck, setPasswordCheck ] = useState<string>('');
    const [ agreementList, setAgreementList ] = useState<Array<AuthFormAgreement>>(props.agreementList);
    const [ formType, setFormType ] = useState<AuthFormType>(props.formType);

    useEffect(() => {
        setFormType(props.formType);
    }, [props.formType]);

    useEffect(() => {
        checkDisableButton();
    }, [ userName, userEmail, passwordCheck, password, agreementList, formType ]);

    const checkDisableButton = () => {
        switch (formType) {
            case AuthFormType.Login:
                return userEmail.length === 0 || password.length === 0;
            case AuthFormType.Register:
                return !!(
                    agreementList.find((a) => !a.checked && a.mandatory) ||
                    userName.length === 0 ||
                    userEmail.length === 0 ||
                    password.length === 0 ||
                    passwordCheck.length === 0 ||
                    password !== passwordCheck
                );
            case AuthFormType.Forgot:
                return userEmail.length === 0;
        }
        return true;
    };

    const renderSocialButtons = () => {
        return (
            <div className='d-flex flex-column align-items-center'>
                {
                    props.socialNetworks && props.socialNetworks.map((socialNetwork: string) => {
                        const iconKey = Object.keys(IconType).find(i => {
                            return IconType[i].toLowerCase() === socialNetwork;
                        });
                        if (!iconKey) {
                            return;
                        }
                        return (
                            <div className='d-flex justify-content-center col-12 my-1' key={socialNetwork}>
                                <Button
                                    type={ButtonType.PRIMARY}
                                    theme={ButtonTheme.CUSTOM}
                                    size={ButtonSize.MEDIUM}
                                    styleClass={'col-12 ' + socialNetwork}
                                    containerClass={'col-md-7 col-12'}
                                    icon={{ type: IconType[iconKey], width: 24, height: 24 }}
                                    setClick={() => props.onFormSubmit({
                                        type: AuthFormType.Login,
                                        socialNetwork: socialNetwork
                                    })}
                                >
                                    {socialNetwork}
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    const setAgreementCheck = (index: number) => {
        agreementList[index].checked = !agreementList[index].checked;
        setAgreementList([...agreementList]);
    };

    const renderAgreements = () => {
        return (
            <React.Fragment>
                {
                    agreementList && agreementList.map((agreement: AuthFormAgreement, index: number) => {
                        return (
                            <MuiThemeProvider key={index} theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                                <FormControlLabel
                                    key={index}
                                    label={agreement.text + (agreement.mandatory ? '*' : '')}
                                    control={
                                        <Checkbox onChange={() => setAgreementCheck(index)} checked={agreement.checked}/>
                                    }
                                />
                            </MuiThemeProvider>
                        );
                    })
                }
                <p>{ intl.formatMessage({ id: 'auth.form.register.mandatory.agreements' })}</p>
                {
                    formType === AuthFormType.Register &&
                    <p>{ intl.formatMessage({ id: 'auth.form.register.agreement.terms' })}</p>
                }

            </React.Fragment>
        );
    };

    const renderPasswordForgottenForm = () => {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                    <TextField
                        className='shared-input mb-3'
                        value={userEmail}
                        autoFocus={true}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.email' })}
                        onChange={(e) => setUserEmail(e.target.value)}/>
                </MuiThemeProvider>
                <div className="d-flex justify-content-center col-12">
                    <Button
                        type={ButtonType.PRIMARY}
                        theme={ButtonTheme.CUSTOM}
                        size={ButtonSize.MEDIUM}
                        styleClass={'login col-12'}
                        containerClass={'col-md-6 col-12'}
                        setClick={() => sendForm()}
                        disabled={checkDisableButton()}
                    >
                        <p>{ intl.formatMessage({ id: 'auth.form.button.send' })}</p>
                    </Button>
                </div>

            </React.Fragment>
        );
    };

    const renderLoginForm = () => {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                    <TextField
                        className='shared-input mb-3'
                        value={userEmail}
                        autoFocus={true}
                        type={'email'}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.email' })}
                        onChange={(e) => setUserEmail(e.target.value)}/>
                    <TextField
                        className='shared-input mb-3'
                        value={password}
                        type={'password'}
                        placeholder={intl.formatMessage({ id: 'auth.form.password' })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </MuiThemeProvider>
                <div className="d-flex justify-content-center mt-2 col-12">
                    <Button
                        type={ButtonType.PRIMARY}
                        theme={ButtonTheme.CUSTOM}
                        size={ButtonSize.MEDIUM}
                        styleClass={'login col-12'}
                        containerClass={'col-md-6 col-12'}
                        setClick={() => sendForm()}
                        disabled={checkDisableButton()}
                    >
                        { intl.formatMessage({ id: 'auth.form.login' })}
                    </Button>
                </div>
                <div className='text-underline mx-auto my-3' onClick={() => setFormType(AuthFormType.Forgot)}>
                    {intl.formatMessage({ id: 'auth.form.forgot.password.ask' })}
                </div>
                {
                    formType === AuthFormType.Login &&
                    <p className='text-center'>{ intl.formatMessage({ id: 'auth.form.g4g.credentials.sentence' })}</p>
                }
            </React.Fragment>
        );
    };

    const renderRegisterForm = () => {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                    <TextField
                        className='shared-input mb-3'
                        value={userName}
                        autoFocus={true}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.name' })}
                        onChange={(e) => setUserName(e.target.value)}/>
                    <TextField
                        className='shared-input mb-3'
                        value={userEmail}
                        type={'email'}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.email' })}
                        onChange={(e) => setUserEmail(e.target.value)}/>
                    <TextField
                        className='shared-input mb-3'
                        type={'password'}
                        value={password}
                        placeholder={intl.formatMessage({ id: 'auth.form.password' })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        className='shared-input mb-3'
                        value={passwordCheck}
                        type={'password'}
                        placeholder={intl.formatMessage({ id: 'auth.form.repeat.password' })}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                </MuiThemeProvider>
                {renderAgreements()}
                <div className="d-flex justify-content-center col-12">
                    <Button
                        type={ButtonType.PRIMARY}
                        theme={ButtonTheme.CUSTOM}
                        size={ButtonSize.MEDIUM}
                        styleClass={'login col-12'}
                        containerClass={'col-md-6 col-12'}
                        setClick={() => sendForm()}
                        disabled={checkDisableButton()}
                    >
                        { intl.formatMessage({ id: 'auth.form.register' })}
                    </Button>
                </div>
            </React.Fragment>
        );
    };

    const sendForm = () => {
        switch (formType) {
            case AuthFormType.Login:
                props.onFormSubmit({ type: formType, email: userEmail, password });
                break;
            case AuthFormType.Register:
                props.onFormSubmit({
                    type: formType,
                    userName,
                    password,
                    email: userEmail,
                    agreementList: props.agreementList
                });
                break;
            case AuthFormType.Forgot:
                props.onFormSubmit({ type: formType, email: userEmail });
                break;
        }
    };

    const renderTitle = () => {
        switch (formType) {
            case AuthFormType.Login:
                return intl.formatMessage({ id: 'auth.form.login' });
            case AuthFormType.Register:
                return intl.formatMessage({ id: 'auth.form.register' });
            case AuthFormType.Forgot:
                return intl.formatMessage({ id: 'auth.form.password.forgotten' });
        }
    };

    const renderForm = () => {
        switch (formType) {
            case AuthFormType.Login:
                return renderLoginForm();
            case AuthFormType.Register:
                return renderRegisterForm();
            case AuthFormType.Forgot:
                return renderPasswordForgottenForm();
        }
    };

    return (
        <div className='corner-login h-100 d-flex flex-column justify-content-center'>
            <Typography variant='h3' className='white mx-auto text-uppercase mb-3'>{renderTitle()}</Typography>
            {renderForm()}
            {
                formType !== AuthFormType.Forgot && props.socialNetworks &&
                <React.Fragment>
                    <div className="corner-divider">
                        <div className='divider-line'/>
                        <div className='divider-label'>{ intl.formatMessage({ id: 'auth.form.or' })}</div>
                        <div className='divider-line'/>
                    </div>
                    {renderSocialButtons()}
                </React.Fragment>
            }
        </div>
    );
};
