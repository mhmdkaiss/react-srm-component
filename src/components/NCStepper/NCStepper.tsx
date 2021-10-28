import './NCStepper.scss';

import { MuiThemeProvider } from '@material-ui/core';

import React from 'react';
import { ThemePlatform } from '../../styles/Themes';
import { Icon, IconType } from '../../atoms/Icon/Icon';

export interface NCStepperProps {
    steps: number;
    stepsLabel: Array<string>;
    activeStep: number;
    error?: boolean
}

export const NCStepper: React.FunctionComponent<NCStepperProps> = (props: NCStepperProps) => {
    return (
        <React.Fragment>
            <MuiThemeProvider theme={ThemePlatform}>
                <div className="nc-stepper d-flex align-items-center w-100">
                    {Array.from(Array(props.steps).keys()).map((step) => {
                        return (
                            <div
                                key={step}
                                className={`step ${step + 1 === props.activeStep ? !props.error ? 'active' : 'error' : (step + 1 > props.activeStep) ? '' : props.error && step === props.activeStep - 2 ? 'done error-line' : 'done'} d-flex flex-column align-items-center w-100`}
                            >
                                <div className="step-inner">
                                    {props.steps !== step + 1 &&
                                        <div>
                                            {props.error && props.activeStep === step + 1
                                                ? <div className="px-1"><Icon icon={IconType.Warning} width={16} height={16} /></div>
                                                : <div className="step-circle"></div>
                                            }
                                        </div>
                                    }
                                    {props.steps === step + 1 &&
                                        <div className="success">
                                            <Icon icon={IconType.Success} width={22} height={22} />
                                        </div>
                                    }

                                </div>
                                <div className="label text-center mt-1">{props.stepsLabel[step]}</div>
                            </div>
                        )
                    })}
                </div>
            </MuiThemeProvider>
        </React.Fragment>
    );
}