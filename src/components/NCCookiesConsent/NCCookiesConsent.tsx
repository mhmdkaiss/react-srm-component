import './NCCookiesConsent.scss';

import { Button, NCDialog, NCTypography } from '../../atoms';
import { FormattedMessage, useIntl } from 'react-intl';
import React, { useState } from 'react';

import { ButtonTheme } from '../../atoms/Button/Button';
import Cookies from 'js-cookie';
import { NCSwitch } from '../NCSwitch/NCSwitch';

interface CookieOption {
    label: string;
    name: string;
    value: string;
    active: boolean;
}

interface NCCookiesConsentProps {
    decline?: boolean;
}

export const NCCookiesConsent: React.FunctionComponent<NCCookiesConsentProps> = (props: NCCookiesConsentProps) => {
    const intl = useIntl();
    const cookiesOption: Array<CookieOption> = [
        { label: intl.formatMessage({ id: 'cookies.accept.user' }), name: 'user', value: 'true', active: true },
        { label: intl.formatMessage({ id: 'cookies.accept.session' }), name: 'session', value: 'true', active: true },
    ];
    const [ cookies, setCookies ] = useState<Array<CookieOption>>(cookiesOption);

    const getCookie = () => {
        return cookies.every(cookie => Cookies.get(cookie.name));
    };

    const [ show, setShow ] = useState<boolean>(!getCookie());

    const onClose = () => {
        setShow(false);
    };

    const setCookie = (name: string, value: string) => {
        Cookies.set(name, value, { expires: 365 });
    };

    const onAccept = () => {
        cookies.map(cookie => setCookie(cookie.name, cookie.active ? cookie.value : String(cookie.active)));
        onClose();
    };

    const onDecline = () => {
        cookies.map(cookie => setCookie(cookie.name, 'false'));
        onClose();
    };

    return (
        <NCDialog show={show} setShow={() => onClose()} noClose={true} noHeader={true} position={{ bottom: 0, left: 0 }}>
            <div className="cookie-consent">
                <div className="header">
                    <NCTypography variant='body1'>
                        <FormattedMessage id="cookies.accept" description="Accept cookies" />
                    </NCTypography>
                </div>
                <div className="content">
                    {
                        cookies.map((cookie, index) => (
                            <div key={cookie.name} className="cookie-option">
                                <NCTypography variant='body1'>{cookie.label}</NCTypography>
                                <NCSwitch
                                    checked={cookie.active}
                                    onChange={(active) => {
                                        cookies[index].active = active;
                                        setCookies([...cookies]);
                                    }}
                                    disabled={!props.decline}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="actions" style={{ gridTemplateColumns: props.decline ? 'auto auto' : 'auto' }}>
                    { props.decline &&
                        <Button label={intl.formatMessage({ id: 'cookies.decline.all' })} theme={ButtonTheme.RED} setClick={() => onDecline()} />
                    }
                    <Button label={cookies.every((cookie) => cookie.active) ? intl.formatMessage({ id: 'cookies.accept.all' }) : intl.formatMessage({ id: 'cookies.accept.partial' })} setClick={() => onAccept()} />
                </div>
                <div className="reject-cookies">
                    <span onClick={() => onDecline()}>
                        <NCTypography variant='body1'>
                            <FormattedMessage id="cookies.reject.all" description="Reject cookies" />
                        </NCTypography>
                    </span>
                </div>
            </div>
        </NCDialog>
    );
};
