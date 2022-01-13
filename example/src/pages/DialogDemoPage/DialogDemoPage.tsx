import {
    Button,
    ButtonSize,
    HoverUserTeamCard,
    NCDialog,
    NCToastContainer,
    NCToastType,
    ToastModel,
    ToastPosition,
    NCSwitch
} from '@cactus/srm-component';
import ContextStore from '../../store';
import React, { useState } from 'react';
import { TEAM_MOCK } from '../../mock/UserTeamCards/UserTeamCards.mock';
import './DialogDemoPage.scss';

export const DialogDemoPage: React.FunctionComponent = () => {
    const [ atomsOpen, setAtomsOpen ] = React.useState(false);
    const toastsList = ContextStore.useStoreState((s) => s.toast.list);
    const pushToast = ContextStore.useStoreActions((a) => a.toast.pushToast);
    const deleteToast = ContextStore.useStoreActions((a) => a.toast.deleteToast);
    const [ noPadding, setNoPadding ] = useState<boolean>(false);
    const [ noHeader, setNoHeader ] = useState<boolean>(false);

    const copyGameAccount = () => {
        pushToast(new ToastModel(
            '',
            'Game account copied',
            NCToastType.SUCCESS
        ));
    };

    return (
        <div className='buttons-demo-page'>
            <Button label="show modal" size={ButtonSize.BIG} setClick={() => setAtomsOpen(true)}/>
            <NCDialog
                show={atomsOpen}
                setShow={setAtomsOpen}
                noPadding={noPadding}
                noHeader={noHeader}
                title={'Optional title of dialog'}
            >
                {/*CONFIG PART OF DIALOG*/}
                <div className="d-flex flex-column dotted-border">
                    <p>Config</p>
                    <div className="d-flex flex-row align-items-center">
                        <NCSwitch onChange={(e) => setNoHeader(e)} checked={noHeader} />
                        <p className="ml-2 mb-0">No Header (title visible)</p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <NCSwitch onChange={(e) => setNoPadding(e)} checked={noPadding} />
                        <p className="ml-2 mb-0">No Padding (for content visibility with no padding)</p>
                    </div>
                </div>
                {/*EXAMPLE CONTENT*/}
                <HoverUserTeamCard
                    team={TEAM_MOCK}
                    isSolo={false}
                    copyGameAccountCallback={copyGameAccount}
                />     <HoverUserTeamCard
                    team={TEAM_MOCK}
                    isSolo={false}
                    copyGameAccountCallback={copyGameAccount}
                />     <HoverUserTeamCard
                    team={TEAM_MOCK}
                    isSolo={false}
                    copyGameAccountCallback={copyGameAccount}
                />
            </NCDialog>
            <NCToastContainer
                toastList={toastsList}
                onDeleteToast={deleteToast}
                position={ToastPosition.TOP_RIGHT}
                duration={7000}
            />
        </div>
    );
};
