import React from 'react';
import { MapRound, TournamentFormat } from '../../models/MapRounds';
import { NCRoundsBracket, NCRoundsBracketProps } from '../NCRoundsBracket/NCRoundsBracket';
import {
    NCRoundsDoubleElimination,
    NCRoundsDoubleEliminationProps
} from '../NCRoundsDoubleElimination/NCRoundsDoubleElimination';
import './NCTournamentRounds.scss';

interface NCTournamentRoundsProps {
    displayFormat: TournamentFormat,
    mapRounds: Array<MapRound>
    themeColor?: string
}

const MAP_ROUNDS_FORMATS = {
    [TournamentFormat.BRACKET]: (props: NCRoundsBracketProps) => {
        return <NCRoundsBracket {...props} />;
    },
    [TournamentFormat.DOUBLE_ELIM]: (props: NCRoundsDoubleEliminationProps) => {
        return <NCRoundsDoubleElimination {...props} />;
    },
};

const renderTournamentRoundsContent = (props: NCTournamentRoundsProps) : React.ReactElement | undefined => {
    const { displayFormat, ...roundsProps } = props;
    return MAP_ROUNDS_FORMATS[displayFormat]?.({ ...roundsProps });
};

export const NCTournamentRounds: React.FunctionComponent<NCTournamentRoundsProps> = (
    props: NCTournamentRoundsProps
) => {
    return (
        <div className='nc-tournament-rounds'>
            {renderTournamentRoundsContent(props)}
        </div>
    );
};
