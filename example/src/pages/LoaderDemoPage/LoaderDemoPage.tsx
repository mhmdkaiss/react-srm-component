import { NCLoader } from '@cactus/srm-component';
import React from 'react';
import './LoaderDemoPage.scss';

export const LoaderDemoPage: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <h1 className="secondary-color-light">Loaders</h1>

            <div className="d-flex">
                <div className="loader-1 text-center mr-5">
                    <h3 className="secondary-color-light">Default</h3>
                    <NCLoader />
                </div>
                <div className="loader-2 text-center ml-5">
                    <h3 className="secondary-color-light">Custom image</h3>
                    <NCLoader />
                </div>
            </div>
        </React.Fragment>
    );
};
