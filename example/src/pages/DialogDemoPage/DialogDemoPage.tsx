import React from "react"
import { Button, ButtonSize, HoverUserTeamCard, Icon, IconType, NCDialog } from "@cactus/srm-component"
import { TEAM_MOCK } from "../../mock/UserTeamCards/UserTeamCards.mock";

export const DialogDemoPage: React.FunctionComponent = () => {
    const [atomsOpen, setAtomsOpen] = React.useState(true);

    return (
        <div className='buttons-demo-page'>
            <div><Icon
                icon={IconType.Copy} width={18} height={20}
            /></div>
            <Button label="show modal" size={ButtonSize.BIG} setClick={() => setAtomsOpen(true)} />
            <HoverUserTeamCard
                team={TEAM_MOCK}
                isSolo={false}
            />

            <NCDialog show={atomsOpen} setShow={setAtomsOpen} noPadding={true} noHeader={true}>
                <HoverUserTeamCard
                    team={TEAM_MOCK}
                    isSolo={false}
                />
            </NCDialog>
        </div>
    )
}
