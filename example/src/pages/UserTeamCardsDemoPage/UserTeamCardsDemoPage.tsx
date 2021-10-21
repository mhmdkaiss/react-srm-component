import React from 'react'
import './UserTeamCardsDemoPage.scss'
import {
    CardType,
    TeamCard,
    UserCard,
    UserCardType
} from '@cactus/srm-component'
import {
    PLAYER_MOCK,
    TEAM_MOCK
} from '../../mock/UserTeamCards/UserTeamCards.mock'

export const UserTeamCardsDemoPage: React.FunctionComponent = () => {
    return (
        <div className='d-flex flex-column user-team-cards-demo-page'>
            <div>
                <span className='component-title'>
                    User card {PLAYER_MOCK.player.premium}{' '}
                    {PLAYER_MOCK.player.captain ? ' CAPTAIN' : ''}
                </span>
                <div className='my-4 d-flex flex-column'>
                    <span>Full details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                size={UserCardType.lg}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div className='mx-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                size={UserCardType.small}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div className='ml-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={true}
                                size={UserCardType.xs}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span>Basic details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                size={UserCardType.lg}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div className='mx-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                size={UserCardType.small}
                                player={PLAYER_MOCK.player}
                            />
                        </div>
                        <div className='ml-3'>
                            <UserCard
                                playerId={PLAYER_MOCK.id}
                                full={false}
                                size={UserCardType.xs}
                                player={PLAYER_MOCK.player}
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
                    <span>Full details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCard
                                full={true}
                                size={CardType.lg}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div className='mx-3'>
                            <TeamCard
                                full={true}
                                size={CardType.small}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div className='ml-3'>
                            <TeamCard
                                full={true}
                                size={CardType.xs}
                                team={TEAM_MOCK}
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4 d-flex flex-column'>
                    <span>Basic details</span>
                    <div className='d-flex'>
                        <div className='mr-3'>
                            <TeamCard
                                full={false}
                                size={CardType.lg}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div className='mx-3'>
                            <TeamCard
                                full={false}
                                size={CardType.small}
                                team={TEAM_MOCK}
                            />
                        </div>
                        <div className='ml-3'>
                            <TeamCard
                                full={false}
                                size={CardType.xs}
                                team={TEAM_MOCK}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
