import { createMuiTheme } from '@material-ui/core';

export enum NCTheme {
    Platform,
    Grey,
}

export const getTheme = (theme: NCTheme) => {
    switch (theme) {
        case NCTheme.Platform:
            return ThemePlatform;
        case NCTheme.Grey:
            return ThemeGrey;
        default:
            return ThemePlatform;
    }
};

export const ThemePlatform = createMuiTheme({
    palette: {
        primary: {
            main: '#b2f617',
        },
        secondary: {
            main: '#292D30',
        },
        type: 'dark',
    },
    typography: {
        fontFamily: 'mollenregular',
    },
});

export const ThemeGrey = createMuiTheme({
    palette: {
        primary: {
            main: '#888c88',
        },
        secondary: {
            main: '#1a1a1a',
        },
        type: 'dark',
    },
    typography: {
        fontFamily: 'mollenregular',
    },
});
