import './UserTeamCardsDemoPage.scss';

import {
    ByeCard,
    HoverUserTeamCard,
    SelectionType,
    TeamCard,
    TeamCardRounded,
    TeamCardSearch,
    TeamPermission,
    UserCard,
    UserCardRounded,
    UserCardRoundedSize,
} from '@cactus/srm-component';
import {
    PLAYER_MOCK,
    TEAM_MOCK,
} from '../../mock/UserTeamCards/UserTeamCards.mock';
import React, { useState } from 'react';
import moment from 'moment';

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
                    <span className='component-subtitle'>Basic details</span>
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
                                deletable
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
                    <span className='component-subtitle'>Full details</span>
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
                    <span className='component-subtitle'>Team permission (Full details not xs)</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                xs={false}
                                player={PLAYER_MOCK.player}
                                permission={TeamPermission.MANAGER}
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
                                permission={TeamPermission.MANAGER}
                                onPermissionChange={(e) => console.log(e)}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span className='component-subtitle'>Rounded</span>
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
                    <span className='component-subtitle'>Basic details</span>
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
                    <span className='component-subtitle'>Full details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCard full={true} xs={false} team={TEAM_MOCK} teamSize={true} date={Date.now()} />
                        </div>
                        <div className='ml-3'>
                            <TeamCard full={true} xs={true} team={TEAM_MOCK} date={Date.now()} />
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

                <div className='my-4 d-flex flex-column'>
                    <span className='component-subtitle'>Rounded</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCardRounded
                                team={TEAM_MOCK}
                                onClick={() => console.log('on click')}
                            />
                        </div>
                    </div>
                </div>

                <div className='my-4 d-flex flex-column'>
                    <span className='component-title'>Team Search card</span>
                    <div className='d-flex flex-column component-container'>
                        <TeamCardSearch
                            team={{
                                ...TEAM_MOCK,
                                sn: {
                                    discord: 'http://www.google.com',
                                    twitter: 'http://www.google.com',
                                    youtube: 'http://www.google.com'

                                },
                            }}
                        />
                        <TeamCardSearch
                            team={{
                                ...TEAM_MOCK,
                            }}
                        />
                        <TeamCardSearch
                            team={{
                                ...TEAM_MOCK,
                                players: {},
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <span className='component-title'>
                    Bye card
                </span>
                <div className='my-4 d-flex flex-column'>
                    <span className='component-subtitle'>Users</span>
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
                    <span className='component-subtitle'>Teams</span>
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
            <div>
                <span className='component-title'>
                    Hover card
                </span>
                <div className='my-4 d-flex'>
                    <div className='mr-4'>
                        <span className='component-subtitle'>User</span>
                        <HoverUserTeamCard
                            isSolo={true}
                            team={TEAM_MOCK}
                        />
                    </div>
                    <div className='ml-4'>
                        <span className='component-subtitle'>Team</span>
                        <HoverUserTeamCard
                            isSolo={false}
                            team={TEAM_MOCK}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
