import React, { useEffect, useState } from 'react';
import { TwitchPlayer, TwitchPlayerEvent } from 'twitch-player';
import './NCStream.scss';

interface NCStreamProps {
  channel: string;
  width?: string;
  height?: string;
  autoPlay?: boolean;
  muted?: boolean;
  setOnline?: (online: boolean) => void;
}

export const NCStream: React.FunctionComponent<NCStreamProps> = ({
    channel,
    width = '100%',
    height = '500',
    autoPlay = true,
    muted = true,
    setOnline = () => void(0),
}) => {
    const [ twitchPlayer, setTwitchPlayer ] = useState<TwitchPlayer | null>(null);
    const initPlayer = () => {
        if (!channel) {
            return;
        }
        if (!twitchPlayer) {
            const player = TwitchPlayer.FromOptions('twitch-player', {
                width: width,
                height: height,
                channel: channel,
                autoplay: autoPlay,
                muted: muted,
            });
            setTwitchPlayer(player);
        } else {
            twitchPlayer.addEventListener(TwitchPlayerEvent.READY, () => {
                twitchPlayer.addEventListener(TwitchPlayerEvent.ONLINE, () => setOnline(true));
                twitchPlayer.addEventListener(TwitchPlayerEvent.OFFLINE, () => setOnline(false));
            });
        }
    };

    useEffect(() => {
        initPlayer();
    }, [twitchPlayer]);

    return (
        <div className="stream-container">
            <div className="nc-stream" id="twitch-player"></div>
        </div>
    );
};
