import { Button, ButtonSize, HoverUserTeamCard, Icon, IconType, NCDialog, NCToastContainer, NCToastType, ToastModel, ToastPosition } from "@cactus/srm-component"

import ContextStore from "../../store";
import React from "react"
import { TEAM_MOCK } from "../../mock/UserTeamCards/UserTeamCards.mock";

export const DialogDemoPage: React.FunctionComponent = () => {
    const [atomsOpen, setAtomsOpen] = React.useState(true);
    const toastsList = ContextStore.useStoreState((s) => s.toast.list);
    const pushToast = ContextStore.useStoreActions((a) => a.toast.pushToast);
    const deleteToast = ContextStore.useStoreActions((a) => a.toast.deleteToast);

    const copyGameAccount = () => {
        pushToast(new ToastModel(
            '',
            'Game account copied',
            NCToastType.SUCCESS
        ));
    }

    return (
        <div className='buttons-demo-page'>
            <div><Icon
                icon={IconType.Copy} width={18} height={20}
            /></div>
            <Button label="show modal" size={ButtonSize.BIG} setClick={() => setAtomsOpen(true)} />
            <HoverUserTeamCard
                team={TEAM_MOCK}
                isSolo={false}
                copyGameAccountCallback={copyGameAccount}
            />

            <NCDialog show={atomsOpen} setShow={setAtomsOpen} noPadding={true} noHeader={true}>
                <HoverUserTeamCard
                    team={TEAM_MOCK}
                    isSolo={false}
                    copyGameAccountCallback={copyGameAccount}
                />
            </NCDialog>

            <NCToastContainer toastList={toastsList} onDeleteToast={deleteToast} position={ToastPosition.TOP_RIGHT} duration={7000}/>
        </div>
    );
};
