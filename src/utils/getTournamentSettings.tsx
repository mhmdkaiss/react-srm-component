export function getTournamentSettings(
    matchSettings?: { [value: string]: any }
): any | undefined {
    if (matchSettings?.['default']) {
        return matchSettings?.['default'];
    }
    if (matchSettings?.[0]) {
        return matchSettings?.[0];
    }
    return undefined;
}
