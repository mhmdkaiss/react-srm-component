import { NCStepper } from '@cactus/srm-component';
import React, { useState } from 'react';

export const NCStepperExample: React.FunctionComponent = () => {
    const MAX_STEP = 8;
    const ACTIVE_STEP = 4;

    const steps = [ 'Select team', 'Select players', 'Select captain' ];
    const steps2 = steps.concat([ 'Select boss', 'Select legend' ]);
    const steps3 = steps2.concat([ 'Select demon', 'Select god' ]);

    const [ activeStep, setActiveStep ] = useState<number>(ACTIVE_STEP);
    const [ error, setError ] = useState<boolean>(false);

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
        <>
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
            <NCStepper
                steps={8}
                stepsLabel={steps3}
                activeStep={activeStep}
                error={error}
            />
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex justify-content-center my-2">
                    <button className="mx-2" onClick={(() => moveStep(activeStep, false))}>Prev</button>
                    <button className="mx-2" onClick={(() => moveStep(activeStep, true))}>Next</button>
                </div>
                <button className="mx-2" onClick={(() => setError(!error))}>Switch {error ? 'Active' : 'Error'}</button>
            </div>
        </>
    );
};
