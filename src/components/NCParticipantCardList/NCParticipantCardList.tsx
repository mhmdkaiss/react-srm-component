import React from 'react';
import { ChallengeResult } from '../../models/Challenge';
import { NCInput } from '../NCInput/NCInput';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import './NCParticipantCardList.scss';

export interface NCParticipantCardListProps {
    list: Array<ChallengeResult>;
    onClick?: (item: ChallengeResult) => void;
    triggerOnChange: (item: ChallengeResult) => void;
}

export const NCParticipantCardList: React.FunctionComponent<NCParticipantCardListProps> = (props: NCParticipantCardListProps) => {
    return (
        <div className='nc-participant-card-list px-4 scrollbar'>
            {
                props.list.map((item) => {
                    return (
                        <div key={item.id} className={'participant-card px-4 mb-2 row'}>
                            <div className='col-8 d-flex align-items-center'>
                                <NCInput styleName='input-style mr-4' value={item.score}
                                    onChange={(e) => {
                                        props.triggerOnChange(Object.assign(item, { score: Number(e) }));
                                    }} />
                                <ProfilePicture playerId={item.id} size={31}/>
                                <p className="mx-4">{item.username}</p>
                            </div>
                            <div className='col-4 d-flex justify-content-end'>
                                <p className='view-entry' onClick={() => {
                                    if (props.onClick) {
                                        props.onClick(item);
                                    }
                                }}><u>view entry</u></p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
