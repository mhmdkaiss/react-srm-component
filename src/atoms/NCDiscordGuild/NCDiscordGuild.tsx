import React from 'react';
import { useIntl } from 'react-intl';
import { DiscordGuild } from '../../models/DiscordApi';
import './NCDiscordGuild.scss';

interface NCDiscordGuildProps {
    guild: DiscordGuild,
    membersCount?: number,
}

const nFormatter = (num: number) : string => {
    if (num > 9999 && num < 1000000){
        return parseFloat((num/1000).toFixed(1)) + 'K';
    } else if (num > 1000000){
        return parseFloat((num/1000000).toFixed(1)) + 'M';
    }
    return String(num);
};

export const NCDiscordGuild: React.FunctionComponent<NCDiscordGuildProps> = (
    props: NCDiscordGuildProps
) => {
    const { guild, membersCount } = props;
    const intl = useIntl();
    const guildIcon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
    const guildMembers = membersCount
        ? `${nFormatter(membersCount)} ${intl.formatMessage({ id: 'tournament.discord.members_count' })}`
        : null;
    return (
        <React.Fragment>
            <div className='nc-discord-guild'>
                <img className='guild-icon' src={guildIcon} />
                <div className='guild-info-container'>
                    <p className='guild-name'>{guild.name.toLocaleLowerCase()}</p>
                    {guildMembers && <p className='guild-members'>{guildMembers}</p>}
                </div>
            </div>
        </React.Fragment>
    );
};
