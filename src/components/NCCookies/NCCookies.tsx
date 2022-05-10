import './NCCookies.scss';

import { FormattedMessage, useIntl } from 'react-intl';

import CookieConsent from 'react-cookie-consent';
import React from 'react';

export const NCCookies: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <CookieConsent buttonText={intl.formatMessage({ id: 'cookies.got.it' })}>
            <FormattedMessage id="cookies.accept" description="Accept cookies" />
        </CookieConsent>
    );
};
