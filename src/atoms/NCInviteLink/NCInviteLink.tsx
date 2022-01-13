import React from 'react';
import './NCInviteLink.scss';

interface NCInviteLinkProps {
    link: string,
    children: React.ReactChild
}

export const NCInviteLink: React.FunctionComponent<NCInviteLinkProps> = (
    props: NCInviteLinkProps
) => {
    return (
        <React.Fragment>
            <div className='nc-invitation-link' onClick={() => { window.open(props.link, '_blank'); }}>
                {props.children}
            </div>
        </React.Fragment>
    );
};
