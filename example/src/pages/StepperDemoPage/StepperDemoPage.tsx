import './StepperDemoPage.scss';

import React, { useRef, useState } from 'react';

import { NCStepper, NCBreadcrumb } from '@cactus/srm-component';

export const StepperDemoPage: React.FunctionComponent = () => {
    const MAX_STEP = 8;
    const ACTIVE_STEP = 4;

    const steps = [ 'Select team', 'Select players', 'Select captain' ];
    const steps2 = steps.concat([ 'Select boss', 'Select legend' ]);
    const steps3 = steps2.concat([ 'Select demon', 'Select god' ]);

    const [ activeStep, setActiveStep ] = useState<number>(ACTIVE_STEP);
    const [ error, setError ] = useState<boolean>(false);

    const refSection1 = useRef<HTMLDivElement>(null);
    const refSection2 = useRef<HTMLDivElement>(null);
    const refSection3 = useRef<HTMLDivElement>(null);
    const refSection4 = useRef<HTMLDivElement>(null);

    const moveStep = (currentStep: number, next: boolean) => {
        if (next) {
            if (currentStep < MAX_STEP) {
                setActiveStep(currentStep + 1);
            }
            return;
        }

        if (currentStep > 1) {
            setActiveStep(currentStep - 1);
        }
    };

    return (
        <div className="stepper-page white">
            <h6 className="secondary-color-cool">NC Stepper</h6>
            <div>
                <div className="my-4">
                    <NCStepper
                        steps={2}
                        stepsLabel={steps}
                        activeStep={1}
                        error={false}
                    />
                </div>
                <div className="my-4">
                    <NCStepper
                        steps={4}
                        stepsLabel={steps}
                        activeStep={2}
                        error={true}
                    />
                </div>
                <div className="my-4">
                    <NCStepper
                        steps={6}
                        stepsLabel={steps2}
                        activeStep={6}
                        error={false}
                    />
                </div>
                <div className="my-4">
                    <NCStepper
                        steps={8}
                        stepsLabel={steps3}
                        activeStep={activeStep}
                        error={error}
                    />
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center my-2">
                        <button className="mx-2" onClick={(() => moveStep(activeStep, false))}>Prev</button>
                        <button className="mx-2" onClick={(() => moveStep(activeStep, true))}>Next</button>
                    </div>
                    <button className="mx-2" onClick={(() => setError(!error))}>Switch {error ? 'Active' : 'Error'}</button>
                </div>
            </div>

            <div className='position-sticky breadcrumb-demo-container d-flex justify-content-between my-5'>
                <h6 className="secondary-color-cool">NC Breadcrumb</h6>
                <div className='position-absolute breadcrumb-demo'>
                    <NCBreadcrumb
                        routes={
                            [
                                { label: 'Section 1', ref: refSection1 },
                                { label: 'Section 2', ref: refSection2 },
                                { label: 'Section 3', ref: refSection3 },
                                { label: 'Section 4', ref: refSection4 }
                            ]
                        }
                        currentStep={2}
                    />
                </div>
            </div>
            <div>
                <div ref={refSection1} className='breadcrumb-demo-section text-center'>Section 1</div>
                <div ref={refSection2} className='breadcrumb-demo-section text-center'>Section 2</div>
                <div ref={refSection3} className='breadcrumb-demo-section text-center'>Section 3</div>
                <div ref={refSection4} className='breadcrumb-demo-section text-center'>Section 4</div>
            </div>

        </div>
    );
};
