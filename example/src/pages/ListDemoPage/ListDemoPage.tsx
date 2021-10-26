import React from "react";
import { DisplaySelector, GameList } from "@cactus/srm-component"
import "./ListDemoPage.scss";

const games = [
    {
      "id": "autochess",
      "route": "games",
      "title": "Autochess",
      "icon": "",
      "active": 1
    },
    {
      "id": "overwatch",
      "route": "games",
      "title": "Overwatch",
      "icon": "",
      "active": 1
    },
    {
      "id": "rocket-league",
      "route": "games",
      "title": "Rocket League",
      "icon": "",
      "active": 1
    },
    {
      "id": "nba-2k21",
      "route": "games",
      "title": "NBA 2K21",
      "icon": "",
      "active": 1
    },
    {
      "id": "fifa-21",
      "route": "games",
      "title": "FIFA 21",
      "icon": "https://public.nicecact.us/game/5f7f0e4b481ed14c964e3417/medias/IconImage",
      "active": 0
    },
    {
      "id": "forza-7",
      "route": "games",
      "title": "Forza 7",
      "icon": "",
      "active": 1
    },
    {
      "id": "pokemon-unite",
      "route": "games",
      "title": "Pokemon unite",
      "icon": "",
      "active": 1
    },
    {
      "id": "mariokart-tour",
      "route": "games",
      "title": "Mario kart tour",
      "icon": "https://public.nicecact.us/game/5e83080c537278233bfac7f2/medias/IconImage",
      "active": 1
    },
    {
      "id": "dirt-rally",
      "route": "games",
      "title": "Dirt Rally",
      "icon": "",
      "active": 1
    },
    {
      "id": "valorant",
      "route": "games",
      "title": "VALORANT",
      "icon": "",
      "active": 1
    },
    {
      "id": "tom-clancy-s-rainbow-six-siege",
      "route": "games",
      "title": "Tom Clancy's Rainbow Six Siege",
      "icon": "",
      "active": 1
    },
    {
      "id": "league-of-legends",
      "route": "games",
      "title": "League Of Legends",
      "icon": "",
      "active": 1
    },
    {
      "id": "clash-royale",
      "route": "games",
      "title": "Clash Royale",
      "icon": "",
      "active": 1
    },
    {
      "id": "8-ball-pool",
      "route": "games",
      "title": "8 Ball Pool",
      "icon": "",
      "active": 1
    },
    {
      "id": "fortnite",
      "route": "games",
      "title": "Fortnite",
      "icon": "",
      "active": 1
    },
    {
      "id": "teamfight-tactics",
      "route": "games",
      "title": "Teamfight Tactics",
      "icon": "",
      "active": 1
    },
    {
      "id": "dragon-ball-fighterz",
      "route": "games",
      "title": "Dragon Ball FighterZ",
      "icon": "",
      "active": 1
    },
    {
      "id": "super-smash-bros-ultimate",
      "route": "games",
      "title": "Super Smash Bros Ultimate",
      "icon": "",
      "active": 1
    },
    {
      "id": "mario-kart-8-deluxe",
      "route": "games",
      "title": "Mario kart 8 deluxe",
      "icon": "",
      "active": 1
    },
    {
      "id": "playerunknows-battleground",
      "route": "games",
      "title": "Playerunknow's battleground",
      "icon": "",
      "active": 1
    }
];

export const ListDemoPage: React.FunctionComponent = () => {
    return (
        <div className="list-demo-page">
            <span className="theme-title">Fancy List</span>
            <GameList games={games} fancy onChange={()=>{}}/>
            <span className="theme-title">Icon List</span>
            <GameList games={games} onChange={()=>{}}/>
            <span className="theme-title">Display List</span>
            <DisplaySelector onChange={()=>{}}/>
        </div>
    )
};
