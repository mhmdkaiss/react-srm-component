import { NCCookies } from '@cactus/srm-component';
import React from 'react';

export const CookiesDemoPage: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <h1 className="secondary-color-light">Cookies</h1>
            <div className="mt-4">
                <h3 className="secondary-color-light">Delete cookies and refresh page to see the modal</h3>
            </div>
            <NCCookies />
        </React.Fragment>
    );
};
