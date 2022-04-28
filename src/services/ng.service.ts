import { GameAccount, GameAccountUser } from './../models/GameAccount';
import axios from 'axios';

export class NgService {
    private static baseUrl: string = String(process.env.REACT_APP_NG_URL);
    static token = (): string | null => localStorage.getItem('accessToken');

    static createUserGameAccount = async (accountId: string, gamerTag: string): Promise<boolean> => {
        try {
            await axios.post(
                `${NgService.baseUrl}/accounts/${accountId}/users`,
                {
                    gamerTag,
                },
                {
                    headers: {
                        'x-access-token': NgService.token(),
                    },
                }
            );
            return true;
        } catch {
            return false;
        }
    };

    static getGameAccount = async (accountId: string): Promise<GameAccount | undefined> => {
        try {
            const res = (await axios.get(`${NgService.baseUrl}/public/accounts/${accountId}`, {
                method: 'GET',
            })).data;
            return res;
        } catch {
            return;
        }
    };

    static getUserGameAccount = async (accountId: string): Promise<GameAccountUser | undefined> => {
        try {
            const res = (await axios.get(
                `${NgService.baseUrl}/accounts/${accountId}/users`,
                {
                    headers: {
                        'x-access-token': NgService.token(),
                    },
                }
            )).data;
            return res;
        } catch {
            return;
        }
    };
}
