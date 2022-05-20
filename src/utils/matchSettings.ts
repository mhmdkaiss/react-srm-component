import { MatchSettings } from '../models/Tournament';

export function getTournamentSettings(
    matchSettings?: { [value: string]: MatchSettings }
): MatchSettings | undefined {
    return matchSettings?.['default'] ?? matchSettings?.[0];
}
