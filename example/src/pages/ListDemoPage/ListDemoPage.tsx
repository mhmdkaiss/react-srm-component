import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { DisplaySelectorExample } from './examples/displayselector.example';
import { GameListFancyExample } from './examples/gamelist-fancy.example';
import { GameListExample } from './examples/gamelist.example';
import { NCAnimatedCardListTournamentLoadingExample } from './examples/ncanimatedcardlist-tournament-loading.example';
import { NCAnimatedCardListTournamentExample } from './examples/ncanimatedcardlist-tournament.example';
import { NCAnimatedCardListUserExample } from './examples/ncanimatedcardlist-user.example';
import { NCCardListTournamentExample } from './examples/nccardlist-tournament.example';
import { NCCardListUserExample } from './examples/nccardlist-user.example';
import { NCFlagSelectorExample } from './examples/ncflagselector.example';
import { NCListActionsExample } from './examples/nclist-actions.example';
import { NCListTrFilledExample } from './examples/nclist-tr-filled.example';
import { NCListTrHoverExample } from './examples/nclist-tr-hover.example';
import { NCListExample } from './examples/nclist.example';
import { NCParticipantListPlayersLeaderboardExample } from './examples/ncparticipantlist-players-leaderboard.example';
import { NCParticipantListPlayersExample } from './examples/ncparticipantlist-players.example';
import { NCParticipantListTeamsLeaderboardExample } from './examples/ncparticipantlist-teams-leaderboard.example';
import { NCParticipantListTeamsExample } from './examples/ncparticipantlist-teams.example';
import './ListDemoPage.scss';

const DisplaySelectorExampleRaw = raw('./examples/displayselector.example.tsx');
const GameListFancyExampleRaw = raw('./examples/gamelist-fancy.example.tsx');
const GameListExampleRaw = raw('./examples/gamelist.example.tsx');
const NCAnimatedCardListTournamentLoadingExampleRaw = raw('./examples/ncanimatedcardlist-tournament-loading.example.tsx');
const NCAnimatedCardListTournamentExampleRaw = raw('./examples/ncanimatedcardlist-tournament.example.tsx');
const NCAnimatedCardListUserExampleRaw = raw('./examples/ncanimatedcardlist-user.example.tsx');
const NCCardListTournamentExampleRaw = raw('./examples/nccardlist-tournament.example.tsx');
const NCCardListUserExampleRaw = raw('./examples/nccardlist-user.example.tsx');
const NCFlagSelectorExampleRaw = raw('./examples/ncflagselector.example.tsx');
const NCListActionsExampleRaw = raw('./examples/nclist-actions.example.tsx');
const NCListTrFilledExampleRaw = raw('./examples/nclist-tr-filled.example.tsx');
const NCListTrHoverExampleRaw = raw('./examples/nclist-tr-hover.example.tsx');
const NCListExampleRaw = raw('./examples/nclist.example.tsx');
const NCParticipantListPlayersLeaderboardExampleRaw = raw('./examples/ncparticipantlist-players-leaderboard.example.tsx');
const NCParticipantListPlayersExampleRaw = raw('./examples/ncparticipantlist-players.example.tsx');
const NCParticipantListTeamsLeaderboardExampleRaw = raw('./examples/ncparticipantlist-teams-leaderboard.example.tsx');
const NCParticipantListTeamsExampleRaw = raw('./examples/ncparticipantlist-teams.example.tsx');

export const ListDemoPage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'Lists',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'DisplaySelector',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: DisplaySelectorExampleRaw,
                    component: DisplaySelectorExample,
                },
            ]
        },
        {
            name: 'GameList',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: GameListExampleRaw,
                    component: GameListExample,
                },
                {
                    name: 'Fancy',
                    raw: GameListFancyExampleRaw,
                    component: GameListFancyExample,
                },
            ]
        },
        {
            name: 'NCFlagSelector',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: NCFlagSelectorExampleRaw,
                    component: NCFlagSelectorExample,
                },
            ]
        },
        {
            name: 'NCCardList',
            description: '',
            exampleList: [
                {
                    name: 'Users',
                    raw: NCCardListUserExampleRaw,
                    component: NCCardListUserExample,
                },
                {
                    name: 'Tournaments',
                    raw: NCCardListTournamentExampleRaw,
                    component: NCCardListTournamentExample
                },
            ]
        },
        {
            name: 'NCAnimatedCardList',
            description: '',
            exampleList: [
                {
                    name: 'Users',
                    raw: NCAnimatedCardListUserExampleRaw,
                    component: NCAnimatedCardListUserExample
                },
                {
                    name: 'Tournament',
                    raw: NCAnimatedCardListTournamentExampleRaw,
                    component: NCAnimatedCardListTournamentExample
                },
                {
                    name: 'Tournament Loading',
                    raw: NCAnimatedCardListTournamentLoadingExampleRaw,
                    component: NCAnimatedCardListTournamentLoadingExample
                },
            ]
        },
        {
            name: 'NCList',
            description: '',
            exampleList: [
                {
                    name: 'Simple',
                    raw: NCListExampleRaw,
                    component: NCListExample,
                },
                {
                    name: 'tr filled',
                    raw: NCListTrFilledExampleRaw,
                    component: NCListTrFilledExample,
                },
                {
                    name: 'tr hover',
                    raw: NCListTrHoverExampleRaw,
                    component: NCListTrHoverExample,
                },
                {
                    name: 'Actions',
                    raw: NCListActionsExampleRaw,
                    component: NCListActionsExample,
                },
            ]
        },
        {
            name: 'NCParticipantList',
            description: '',
            exampleList: [
                {
                    name: 'Players',
                    raw: NCParticipantListPlayersExampleRaw,
                    component: NCParticipantListPlayersExample
                },
                {
                    name: 'Players Leaderboard',
                    raw: NCParticipantListPlayersLeaderboardExampleRaw,
                    component: NCParticipantListPlayersLeaderboardExample
                },
                {
                    name: 'Teams',
                    raw: NCParticipantListTeamsExampleRaw,
                    component: NCParticipantListTeamsExample
                },
                {
                    name: 'Teams Leaderboard',
                    raw: NCParticipantListTeamsLeaderboardExampleRaw,
                    component: NCParticipantListTeamsLeaderboardExample
                },
            ]

        }
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
