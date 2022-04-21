import { MatchSettings } from '../models/Tournament';

export function getTournamentSettings(
    matchSettings?: Array<MatchSettings>
): MatchSettings | undefined {
    if (matchSettings?.['default']) {
        return matchSettings?.['default'];
    }

    if (matchSettings?.[0]) {
        return matchSettings?.[0];
    }

    return undefined;
}
