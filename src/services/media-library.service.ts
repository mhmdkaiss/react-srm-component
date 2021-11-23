import axios from 'axios';

export interface Media {
    name: string;
    modified: string;
    size: number;
    file: boolean;
    key: string;
    publicUrl: string;
}

export enum FileManagerMode {
    NORMAL = 'NORMAL',
    SELECT = 'SELECT',
}

export class MediaLibraryService {
    private static baseUrl: string = String(process.env.REACT_APP_COMMON_URL);
    static token = () => localStorage.getItem('accessToken');

    static async getMediaLibrary(path: string = ''): Promise<Array<Media>> {
        try {
            const res = (await axios.get(`${MediaLibraryService.baseUrl}/media${path}`, {
                headers: {
                    'x-access-token': MediaLibraryService.token(),
                }
            })).data;
            return res;
        } catch (e) {
            throw e.response;
        }
    }

    static async createMedia(path: string, data: string): Promise<Media> {
        if (!path) {
            throw Error;
        }

        try {
            const media = (await axios.post(
                `${MediaLibraryService.baseUrl}/media${path}`,
                { data: data },
                {
                    headers: {
                        'x-access-token': MediaLibraryService.token(),
                    }
                }
            )).data;
            return media;
        } catch (e) {
            throw e.response;
        }
    }

    static async deleteMedia(id: string): Promise<boolean> {
        if (!id) {
            return false;
        }

        try {
            await axios.delete(
                `${MediaLibraryService.baseUrl}/media/${id}`, {
                    headers: {
                        'x-access-token': MediaLibraryService.token(),
                    }
                }
            );
        } catch {
            // toast.error('Fail to delete media, try again later');
            return false;
        }

        // toast.success('Media deleted');
        return true;
    }
}
