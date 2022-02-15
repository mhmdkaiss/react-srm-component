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
    onFormSubmit: (response: AuthFormData) => Promise<void>;
    socialNetworks?: Array<string>;
    theme?: Theme;
    errorMessage?: string;
    onSwitchFormType: (type: AuthFormType) => void;
}

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export const AuthForm: React.FunctionComponent<AuthFormProps> = (props: AuthFormProps) => {
    const intl = useIntl();

    const [ userName, setUserName ] = useState<string>('');
    const [ userEmail, setUserEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ passwordCheck, setPasswordCheck ] = useState<string>('');
    const [ agreementList, setAgreementList ] = useState<Array<AuthFormAgreement>>(props.agreementList);
    const [ formType, setFormType ] = useState<AuthFormType>(props.formType);
    const [ processing, setProcessing ] = useState<boolean>(false);

    useEffect(() => {
        setFormType(props.formType);
    }, [props.formType]);

    useEffect(() => {
        checkDisableButton();
    }, [ userName, userEmail, passwordCheck, password, agreementList, formType, processing ]);

    const onSwitchFormType = (formType: AuthFormType) => {
        if (props.onSwitchFormType) {
            props.onSwitchFormType(formType);
        }
    };

    const checkDisableButton = () => {
        if (processing) {
            return true;
        }
        switch (formType) {
            case AuthFormType.Login:
                return userEmail.length === 0 || password.length === 0 || !emailRegex.test(userEmail);
            case AuthFormType.Register:
                return !!(
                    agreementList.find((a) => !a.checked && a.mandatory) ||
                    userName.length === 0 ||
                    userEmail.length === 0 ||
                    password.length === 0 ||
                    passwordCheck.length === 0 ||
                    password !== passwordCheck ||
                    !emailRegex.test(userEmail)
                );
            case AuthFormType.Forgot:
                return userEmail.length === 0 || !emailRegex.test(userEmail);
        }
        return true;
    };

    const submitForm = async(response: AuthFormData) => {
        setProcessing(true);
        await props.onFormSubmit(response);
        setProcessing(false);
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
                                    setClick={() => submitForm({ socialNetwork: socialNetwork, type: AuthFormType.Login })}
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
                        let text = agreement.text;
                        if ((typeof text === 'string') && intl.messages[text]) {
                            text = intl.formatMessage({ id: text }, agreement.textValues);
                        }
                        return (
                            <MuiThemeProvider key={index} theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                                <FormControlLabel
                                    className='agreement'
                                    disabled={processing}
                                    key={index}
                                    label={text + (agreement.mandatory ? '*' : '')}
                                    control={
                                        <Checkbox onChange={() => setAgreementCheck(index)} checked={agreement.checked}/>
                                    }
                                />
                            </MuiThemeProvider>
                        );
                    })
                }
                <p className='disclaimer agreements'>{ intl.formatMessage({ id: 'auth.form.register.mandatory.agreements' })}</p>
                {
                    formType === AuthFormType.Register &&
                    <p className='disclaimer terms'>{ intl.formatMessage({ id: 'auth.form.register.agreement.terms' })}</p>
                }

            </React.Fragment>
        );
    };

    const renderPasswordForgottenForm = () => {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 email'
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
                        <p>{ intl.formatMessage({ id: processing ? 'auth.form.processing' : 'auth.form.button.send' })}</p>
                    </Button>
                </div>
                <div className='text-underline cursor-pointer mx-auto my-1' onClick={() => setFormType(AuthFormType.Login)}>
                    {intl.formatMessage({ id: 'auth.form.login' })}
                </div>

            </React.Fragment>
        );
    };

    const renderLoginForm = () => {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={props.theme ? props.theme : AuthFormDefaultTheme}>
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 email'
                        value={userEmail}
                        autoFocus={true}
                        type={'email'}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.email' })}
                        onChange={(e) => setUserEmail(e.target.value)}/>
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 password'
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
                        { intl.formatMessage({ id: processing ? 'auth.form.processing' : 'auth.form.login' })}
                    </Button>
                </div>
                <div className='error-message d-flex justify-content-center mt-1'><span>{props.errorMessage}</span></div>
                <div className='text-underline cursor-pointer mx-auto my-3' onClick={() => setFormType(AuthFormType.Forgot)}>
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
                        disabled={processing}
                        className='shared-input mb-3 user-name'
                        value={userName}
                        autoFocus={true}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.name' })}
                        onChange={(e) => setUserName(e.target.value)}/>
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 email'
                        value={userEmail}
                        type={'email'}
                        placeholder={intl.formatMessage({ id: 'auth.form.user.email' })}
                        onChange={(e) => setUserEmail(e.target.value)}/>
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 password'
                        type={'password'}
                        value={password}
                        placeholder={intl.formatMessage({ id: 'auth.form.password' })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        disabled={processing}
                        className='shared-input mb-3 password-repeat'
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
                        { intl.formatMessage({ id: processing ? 'auth.form.processing' : 'auth.form.register' })}
                    </Button>
                </div>
                <div className='error-message d-flex justify-content-center mt-1'><span>{props.errorMessage}</span></div>
            </React.Fragment>
        );
    };

    const sendForm = () => {
        switch (formType) {
            case AuthFormType.Login:
                submitForm({ type: formType, email: userEmail, password });
                break;
            case AuthFormType.Register:
                submitForm({
                    type: formType,
                    userName,
                    password,
                    email: userEmail,
                    agreementList: props.agreementList
                });
                break;
            case AuthFormType.Forgot:
                submitForm({ type: formType, email: userEmail });
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
            <Typography variant='h3' className='d-none d-md-block white mx-auto text-uppercase mb-3 title'>{renderTitle()}</Typography>
            <div className='d-md-none form-type-selector d-flex mb-3'>
                <div
                    className={`cursor-pointer type mr-2 text-lowercase ${formType !== AuthFormType.Register ? 'active' : ''}`}
                    onClick={() => onSwitchFormType(AuthFormType.Login)}>
                    {intl.formatMessage({ id: 'auth.form.login' })}
                </div>
                <div
                    className={`cursor-pointer type text-lowercase ${formType === AuthFormType.Register ? 'active' : ''}`}
                    onClick={() => onSwitchFormType(AuthFormType.Register)}>
                    {intl.formatMessage({ id: 'auth.form.register' })}
                </div>
            </div>
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