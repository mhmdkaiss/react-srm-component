import React from "react";
import { DisplaySelector, GameList, NCParticipantList } from "@cactus/srm-component"
import "./ListDemoPage.scss";

const games = [{
  "id": "teamfight-tactics",
  "route": "games",
  "title": "TFT",
  "slug": "teamfight-tactics",
  "icon": "https://public.nicecact.us/game/teamfight-tactics/medias/LogoImage",
  "active": 1,
}, {
  "id": "super-smash-bros-ultimate",
  "route": "games",
  "title": "Super Smash Bros. Ultimate",
  "slug": "super-smash-bros-ultimate",
  "icon": "https://public.nicecact.us/game/super-smash-bros-ultimate/medias/LogoImage",
  "active": 1,
}, {
  "id": "fortnite",
  "route": "games",
  "title": "Fortnite",
  "slug": "fortnite",
  "icon": "https://public.nicecact.us/game/fortnite/medias/LogoImage",
  "active": 1,
}, {
  "id": "legends-of-runeterra",
  "route": "games",
  "title": "Legends of Runeterra",
  "slug": "legends-of-runeterra",
  "icon": "https://public.nicecact.us/game/legends-of-runeterra/medias/LogoImage",
  "active": 1,
}, {
  "id": "tom-clancy-s-rainbow-six-siege",
  "route": "games",
  "title": "Tom Clancy's Rainbow Six: Siege",
  "slug": "tom-clancy-s-rainbow-six-siege",
  "icon": "https://public.nicecact.us/game/tom-clancy-s-rainbow-six-siege/medias/LogoImage",
  "active": 1,
}, {
  "id": "call-of-duty-modern-warfare",
  "route": "games",
  "title": "Call of duty Modern warfare",
  "slug": "call-of-duty-modern-warfare",
  "icon": "https://public.nicecact.us/game/call-of-duty-modern-warfare/medias/LogoImage",
  "active": 1,
}, {
  "id": "valorant",
  "route": "games",
  "title": "Valorant",
  "slug": "valorant",
  "icon": "https://public.nicecact.us/game/valorant/medias/LogoImage",
  "active": 1,
}, {
  "id": "fifa-21",
  "route": "games",
  "title": "FIFA 21",
  "slug": "fifa-21",
  "icon": "https://public.nicecact.us/game/fifa-21/medias/LogoImage",
  "active": 1,
}, {
  "id": "nba-2k21",
  "route": "games",
  "title": "NBA 2K21",
  "slug": "nba-2k21",
  "icon": "https://public.nicecact.us/game/nba-2k21/medias/LogoImage",
  "active": 1,
}, {
  "id": "call-of-duty-cold-war",
  "route": "games",
  "title": "Call Of Duty Cold War",
  "slug": "call-of-duty-cold-war",
  "icon": "https://public.nicecact.us/game/call-of-duty-cold-war/medias/LogoImage",
  "active": 1,
}, {
  "id": "wild-rift",
  "route": "games",
  "title": "Wild Rift",
  "slug": "wild-rift",
  "icon": "https://public.nicecact.us/game/wild-rift/medias/LogoImage",
  "active": 1,
}, {
  "id": "trackmania",
  "route": "games",
  "title": "Trackmania",
  "slug": "trackmania",
  "icon": "https://public.nicecact.us/game/trackmania/medias/LogoImage",
  "active": 1,
}, {
  "id": "mario-kart-8-deluxe",
  "route": "games",
  "title": "Mario kart 8 deluxe",
  "slug": "mario-kart-8-deluxe",
  "icon": "https://public.nicecact.us/game/mario-kart-8-deluxe/medias/LogoImage",
  "active": 1,
}, {
  "id": "call-of-duty-warzone",
  "route": "games",
  "title": "Call of Duty Warzone",
  "slug": "call-of-duty-warzone",
  "icon": "https://public.nicecact.us/game/call-of-duty-warzone/medias/LogoImage",
  "active": 1,
}];


const teams = [
    {
        name: "Team 1",
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
        name: "Team 2",
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

const players = teams.map(t => {
    const team = JSON.parse(JSON.stringify(t));
    delete team.players[Object.keys(t.players)[1]];
    return team;
})


export const ListDemoPage: React.FunctionComponent = () => {
    return (
        <div className="list-demo-page">
            <span className="theme-title">Fancy List</span>
            <GameList games={games} fancy onChange={()=>{}}/>
            <span className="theme-title">Icon List</span>
            <GameList games={games} onChange={()=>{}}/>
            <span className="theme-title">Display List</span>
            <DisplaySelector onChange={()=>{}}/>
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
        </div>
    )
};
