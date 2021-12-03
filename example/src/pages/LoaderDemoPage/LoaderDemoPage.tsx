import React from "react";
import { NCLoader } from "@cactus/srm-component";

import './LoaderDemoPage.scss';

export const LoaderDemoPage: React.FunctionComponent = () => {

    return (
        <React.Fragment>
            <h1 className="secondary-color-light">Loaders</h1>

            <div className="d-flex">
                <div className="loader-1">
                    <NCLoader />
                </div>
                <div className="loader-2 mx-5">
                    <NCLoader />
                </div>
                <div className="loader-3">
                    <NCLoader />
                </div>
            </div>
            <div className="text-center mt-5">
                <h1 className="secondary-color-light">Limitation</h1>
                    <span className="red-color mb-3">Background can't be transparent</span>
                    <div className="transparent mt-4">
                        <NCLoader />
                    </div>
            </div>
        </React.Fragment>
    );

}
