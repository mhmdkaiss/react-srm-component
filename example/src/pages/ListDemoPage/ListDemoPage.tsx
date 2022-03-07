import {
    DisplaySelector,
    GameList, NCAnimatedCardList, NCCardList, NCFlagSelector,
    NCParticipantList, NCTournamentCard,
    NCTournamentCardLoading,
    UserCard
} from '@cactus/srm-component';
import React from 'react';
import { PLAYER_MOCK } from '../../mock/UserTeamCards/UserTeamCards.mock';
import './ListDemoPage.scss';

const games = [{
    'id': 'teamfight-tactics',
    'route': 'games',
    'title': 'TFT',
    'slug': 'teamfight-tactics',
    'icon': 'https://public.nicecact.us/game/teamfight-tactics/medias/LogoImage',
    'active': 1,
}, {
    'id': 'super-smash-bros-ultimate',
    'route': 'games',
    'title': 'Super Smash Bros. Ultimate',
    'slug': 'super-smash-bros-ultimate',
    'icon': 'https://public.nicecact.us/game/super-smash-bros-ultimate/medias/LogoImage',
    'active': 1,
}, {
    'id': 'fortnite',
    'route': 'games',
    'title': 'Fortnite',
    'slug': 'fortnite',
    'icon': 'https://public.nicecact.us/game/fortnite/medias/LogoImage',
    'active': 1,
}, {
    'id': 'legends-of-runeterra',
    'route': 'games',
    'title': 'Legends of Runeterra',
    'slug': 'legends-of-runeterra',
    'icon': 'https://public.nicecact.us/game/legends-of-runeterra/medias/LogoImage',
    'active': 1,
}, {
    'id': 'tom-clancy-s-rainbow-six-siege',
    'route': 'games',
    'title': 'Tom Clancy\'s Rainbow Six: Siege',
    'slug': 'tom-clancy-s-rainbow-six-siege',
    'icon': 'https://public.nicecact.us/game/tom-clancy-s-rainbow-six-siege/medias/LogoImage',
    'active': 1,
}, {
    'id': 'call-of-duty-modern-warfare',
    'route': 'games',
    'title': 'Call of duty Modern warfare',
    'slug': 'call-of-duty-modern-warfare',
    'icon': 'https://public.nicecact.us/game/call-of-duty-modern-warfare/medias/LogoImage',
    'active': 1,
}, {
    'id': 'valorant',
    'route': 'games',
    'title': 'Valorant',
    'slug': 'valorant',
    'icon': 'https://public.nicecact.us/game/valorant/medias/LogoImage',
    'active': 1,
}, {
    'id': 'fifa-21',
    'route': 'games',
    'title': 'FIFA 21',
    'slug': 'fifa-21',
    'icon': 'https://public.nicecact.us/game/fifa-21/medias/LogoImage',
    'active': 1,
}, {
    'id': 'nba-2k21',
    'route': 'games',
    'title': 'NBA 2K21',
    'slug': 'nba-2k21',
    'icon': 'https://public.nicecact.us/game/nba-2k21/medias/LogoImage',
    'active': 1,
}, {
    'id': 'call-of-duty-cold-war',
    'route': 'games',
    'title': 'Call Of Duty Cold War',
    'slug': 'call-of-duty-cold-war',
    'icon': 'https://public.nicecact.us/game/call-of-duty-cold-war/medias/LogoImage',
    'active': 1,
}, {
    'id': 'wild-rift',
    'route': 'games',
    'title': 'Wild Rift',
    'slug': 'wild-rift',
    'icon': 'https://public.nicecact.us/game/wild-rift/medias/LogoImage',
    'active': 1,
}, {
    'id': 'trackmania',
    'route': 'games',
    'title': 'Trackmania',
    'slug': 'trackmania',
    'icon': 'https://public.nicecact.us/game/trackmania/medias/LogoImage',
    'active': 1,
}, {
    'id': 'mario-kart-8-deluxe',
    'route': 'games',
    'title': 'Mario kart 8 deluxe',
    'slug': 'mario-kart-8-deluxe',
    'icon': 'https://public.nicecact.us/game/mario-kart-8-deluxe/medias/LogoImage',
    'active': 1,
}, {
    'id': 'call-of-duty-warzone',
    'route': 'games',
    'title': 'Call of Duty Warzone',
    'slug': 'call-of-duty-warzone',
    'icon': 'https://public.nicecact.us/game/call-of-duty-warzone/medias/LogoImage',
    'active': 1,
}];

const teams = [
    {
        name: 'Team 1',
        slug: 'teamcurry',
        route: 'route1',
        players: {
            '5e6f53cadcfc00132e1c73b1': {
                name: 'Player 1',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            },
            '5e6f53cadcfc00132e1c73b2': {
                name: 'Player 2',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            }
        },
        score: 10
    },
    {
        name: 'Team 2',
        id: '5e6f53cadcfc00132e1c7354',
        slug: '',
        route: 'route2',
        players: {
            '5e6f53cadcfc00132e1c73b1': {
                name: 'Player 1',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            },
            '5e6f53cadcfc00132e1c73b2': {
                name: 'Player 2',
                captain: false,
                premium: false,
                account: '',
                elo: 0,
            }
        },
        score: 5
    }
];

const langs = [
    {
        _id: '5c5c34c2c14265e8e8469d18',
        code: 'en',
        name: 'English',
    },
    {
        _id: '5c5c35fbc14265e8e846ba66',
        code: 'fr',
        name: 'Français',
    },
    {
        _id: '5c5c35fbc14265e8e846ba69',
        code: 'pt',
        name: 'Português',
    },
    {
        _id: '5c8a175421696d127d06cf95',
        code: 'es',
        name: 'Español',
    },
    {
        _id: '5db0212a76d2aa4497629045',
        code: 'de',
        name: 'Deutsch',
    },
    {
        _id: '5ed1c988ce60233529e0d05f',
        code: 'ar',
        name: 'العربية',
    },
    {
        _id: '614300ae73295b4d3057f005',
        code: 'it',
        name: 'Italiano',
    },
    {
        _id: '6143011873295b4d3057f006',
        code: 'ja',
        name: 'Japanese',
    }
];

const players = teams.map(t => {
    const team = JSON.parse(JSON.stringify(t));
    delete team.players[Object.keys(t.players)[1]];
    return team;
});

const tournament = {
    id: '4684223f-1522-4e05-8e20-601b11584247',
    date: 1630677600,
    gameSlug: 'rocket-league',
    min: 4,
    name: 'Tournament name',
    partner: 'creditagricole',
    platforms: [ 'ps4', 'pc', 'xbox', 'switch' ],
    entrance: {
        fee: 0,
    },
    format: 1,
    state: 0,
};

const tournamentCards = [...Array(9)].map((_, index) => {
    const i = index % 3;
    const gameId = i ? i === 1 ?
        '5ee2000cca2d921b383b5c94' :
        '5cbefb8ccf473930ea0237f1' :
        '5c436c2c766ea609157540e8';
    const gameName = i ? i === 1 ?
        'Small game' :
        'Long game name' :
        'Very very long game name';
    return (
        <NCTournamentCard
            key={`tournament-card-${index}`}
            tournament={tournament}
            gameName={gameName}
            banner={`${process.env.REACT_APP_S3_PUBLIC_URL}/game/${gameId}/medias/TournamentBanner`}
            prize="10"
            forceSmall={true}
        />
    );
});

const userCards = [...Array(6)].map((_, index) => {
    return (
        <UserCard
            key={`user-card-${index}`}
            playerId={PLAYER_MOCK.id}
            full={false}
            xs={false}
            player={PLAYER_MOCK.player}
        />
    );
});

export const ListDemoPage: React.FunctionComponent = () => {
    return (
        <div className="list-demo-page">
            <span className="theme-title">Fancy List</span>
            <GameList games={games} fancy onChange={(e) => {console.log(e);}}/>
            <span className="theme-title">Icon List</span>
            <GameList games={games} onChange={(e) => {console.log(e);}}/>
            <span className="theme-title">Display List</span>
            <DisplaySelector onChange={(e) => {console.log(e);}}/>
            <span className="theme-title">Participant List</span>
            <div className="d-flex row">
                <div className="col-6">
                    <NCParticipantList list={teams} winners={[teams[0].route]} selected={teams[0].route} />
                </div>
                <div className="col-6">
                    <NCParticipantList list={players} winners={[players[0].route]} selected={players[0].route} />
                </div>
            </div>
            <div className="d-flex row">
                <div className="col-6">
                    <NCParticipantList list={teams} winners={[teams[0].route]} selected={teams[0].route} isLeaderboard={true} />
                </div>
                <div className="col-6">
                    <NCParticipantList list={players} winners={[players[0].route]} selected={players[0].route} isLeaderboard={true}/>
                </div>
            </div>
            <div className="d-flex row">
                <NCFlagSelector
                    key={'rule-lang'}
                    languages={langs}
                    actionHook={(code: string) => {
                        console.log('NCFlagSelector:actionHook', code);
                    }}
                    publicUrl="https://esm-dev-public.s3.amazonaws.com"
                ></NCFlagSelector>
            </div>

            <span className="theme-title mt-5 pt-5">Cards List</span>
            <div className="col-8">
                <NCCardList cards={tournamentCards} />
            </div>
            <div className="col-8">
                <NCCardList cards={userCards} />
            </div>
            <span className="theme-title mt-5 pt-5">Animated Cards List</span>
            <div className="col-8">
                <NCAnimatedCardList cards={tournamentCards} />
            </div>
            <div className="d-flex">
                <div className="col-8">
                    <NCAnimatedCardList cards={userCards} maxCardWidth={440}/>
                </div>
                <div className="col-4 text-center">
                    <div>This style is there just to test with another card</div>
                    <div>{'It\'s only on example page, not in the shared library'}</div>
                </div>
            </div>
            <span className="theme-title mt-5 pt-5">Loading Cards List</span>
            <div className="col-8">
                <NCAnimatedCardList
                    cards={tournamentCards}
                    loadingCard={<NCTournamentCardLoading />}
                />
            </div>
        </div>
    );
};
