import React from "react"
import { Button, ButtonSize, NCBox, NCCard, NCDialog, NCMediaLibrary } from "@cactus/srm-component"

export const DialogDemoPage: React.FunctionComponent = () => {
    const [atomsOpen, setAtomsOpen] = React.useState(true);

    const selected = (v: any) => {
        setAtomsOpen(false);
    }

    return (
        <div className='buttons-demo-page'>
            <Button label="show modal" size={ButtonSize.BIG} setClick={() => setAtomsOpen(true)}/>
            <NCCard>
                <NCBox>
                    <NCMediaLibrary actionHook={selected}></NCMediaLibrary>
                </NCBox>
            </NCCard>
            <NCDialog show={atomsOpen} setShow={setAtomsOpen}>
                <NCMediaLibrary actionHook={selected}></NCMediaLibrary>
            </NCDialog>
        </div>
    )
}
