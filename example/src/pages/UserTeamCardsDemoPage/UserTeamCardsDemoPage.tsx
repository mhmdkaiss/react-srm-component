import './UserTeamCardsDemoPage.scss';

import {
    PLAYER_MOCK,
    TEAM_MOCK,
} from '../../mock/UserTeamCards/UserTeamCards.mock';
import React, { useState } from 'react';
import {
    SelectionType,
    TeamCard,
    UserCard,
    UserCardRounded,
    UserCardRoundedSize,
    ByeCard,
} from '@cactus/srm-component';

export const UserTeamCardsDemoPage: React.FunctionComponent = () => {
    const [ userCardSelected, setUserCardSelected ] = useState<boolean>(false);
    const [ teamCardSelected, setTeamCardSelected ] = useState<boolean>(false);

    return (
        <div className='d-flex flex-column user-team-cards-demo-page'>
            <div>
                <span className='component-title'>
                    User card {PLAYER_MOCK.player.premium ? 'PREMIUM' : ''}{' '}
                    {PLAYER_MOCK.player.captain ? ' CAPTAIN' : ''}
                </span>
                <div className='my-4 d-flex flex-column'>
                    <span>Basic details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                xs={false}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div
                            className='ml-3 text-center'
                            onClick={() =>
                                setUserCardSelected(!userCardSelected)
                            }
                        >
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                xs={false}
                                player={PLAYER_MOCK.player}
                                selectable={true}
                                selected={userCardSelected}
                            />
                        </div>
                        <div className='ml-3 text-center'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                xs={true}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span>Full details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                xs={false}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div
                            className='ml-3 text-center'
                            onClick={() =>
                                setUserCardSelected(!userCardSelected)
                            }
                        >
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                xs={false}
                                player={PLAYER_MOCK.player}
                                selectable={true}
                                selected={userCardSelected}
                            />
                        </div>
                        <div className='ml-3 text-center'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                xs={true}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span>Rounded</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCardRounded
                                size={UserCardRoundedSize.small}
                                player={PLAYER_MOCK.player}
                                playerId={PLAYER_MOCK.id}
                            />
                        </div>
                        <div className='mx-3'>
                            <UserCardRounded
                                size={UserCardRoundedSize.xs}
                                player={PLAYER_MOCK.player}
                                playerId={PLAYER_MOCK.id}
                            />
                        </div>
                        <div
                            className='mx-3'
                            onClick={() =>
                                setUserCardSelected(!userCardSelected)
                            }
                        >
                            <UserCardRounded
                                size={UserCardRoundedSize.small}
                                player={PLAYER_MOCK.player}
                                playerId={'5c93521793fcfb64bdeb81a9'}
                                selectable={true}
                                selected={userCardSelected}
                            />
                        </div>
                        <div
                            className='mx-3'
                            onClick={() =>
                                setUserCardSelected(!userCardSelected)
                            }
                        >
                            <UserCardRounded
                                size={UserCardRoundedSize.xs}
                                player={PLAYER_MOCK.player}
                                playerId={PLAYER_MOCK.id}
                                selectable={true}
                                selected={userCardSelected}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span className='component-title'>
                    Team card {PLAYER_MOCK.player.premium}{' '}
                    {PLAYER_MOCK.player.captain ? ' CAPTAIN' : ''}
                </span>
                <div className='my-4 d-flex flex-column'>
                    <span>Basic details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCard
                                full={false}
                                xs={false}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div className='ml-3'>
                            <TeamCard full={false} xs={true} team={TEAM_MOCK} />
                        </div>
                        <div
                            className='ml-3'
                            onClick={() =>
                                setTeamCardSelected(!teamCardSelected)
                            }
                        >
                            <TeamCard
                                full={false}
                                xs={true}
                                selectable={SelectionType.Close}
                                selected={teamCardSelected}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div
                            className='ml-3'
                            onClick={() =>
                                setTeamCardSelected(!teamCardSelected)
                            }
                        >
                            <TeamCard
                                full={false}
                                xs={true}
                                selectable={SelectionType.Selected}
                                selected={teamCardSelected}
                                team={TEAM_MOCK}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span>Full details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCard full={true} xs={false} team={TEAM_MOCK} />
                        </div>
                        <div className='ml-3'>
                            <TeamCard full={true} xs={true} team={TEAM_MOCK} />
                        </div>
                        <div
                            className='ml-3'
                            onClick={() =>
                                setTeamCardSelected(!teamCardSelected)
                            }
                        >
                            <TeamCard
                                full={true}
                                xs={true}
                                selectable={SelectionType.Close}
                                selected={teamCardSelected}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div
                            className='ml-3'
                            onClick={() =>
                                setTeamCardSelected(!teamCardSelected)
                            }
                        >
                            <TeamCard
                                full={true}
                                xs={true}
                                selectable={SelectionType.Selected}
                                selected={teamCardSelected}
                                team={TEAM_MOCK}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <span className='component-title'>
                    Bye card
                </span>
                <div className='my-4 d-flex flex-column'>
                    <span>Users</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <ByeCard
                                full={true}
                                xs={false}
                                isSolo={true}
                            />
                        </div>
                        <div className='ml-3'>
                            <ByeCard
                                full={true}
                                xs={true}
                                isSolo={true}
                            />
                        </div>
                        <div
                            className='ml-3'
                        >
                            <ByeCard
                                full={false}
                                xs={false}
                                isSolo={true}
                            />
                        </div>
                        <div
                            className='ml-3'
                        >
                            <ByeCard
                                full={false}
                                xs={true}
                                isSolo={true}
                            />
                        </div>
                    </div>
                </div>

                <div className='my-4 d-flex flex-column'>
                    <span>Teams</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <ByeCard
                                full={true}
                                xs={false}
                                isSolo={false}
                            />
                        </div>
                        <div className='ml-3'>
                            <ByeCard
                                full={true}
                                xs={true}
                                isSolo={false}
                            />
                        </div>
                        <div
                            className='ml-3'
                        >
                            <ByeCard
                                full={false}
                                xs={false}
                                isSolo={false}
                            />
                        </div>
                        <div
                            className='ml-3'
                        >
                            <ByeCard
                                full={false}
                                xs={true}
                                isSolo={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
