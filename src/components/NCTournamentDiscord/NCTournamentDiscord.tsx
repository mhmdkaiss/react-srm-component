import React from 'react';
import { NCDiscordGuild } from '../../atoms/NCDiscordGuild/NCDiscordGuild';
import { NCInviteLink } from '../../atoms/NCInviteLink/NCInviteLink';
import { DiscordInvite } from '../../models/DiscordApi';
import './NCTournamentDiscord.scss';

 interface NCTournamentDiscordProps {
   message: string,
   invites: Array<DiscordInvite>
}

export const NCTournamentDiscord: React.FunctionComponent<NCTournamentDiscordProps> = (
    props: NCTournamentDiscordProps
) => {
    const { message, invites } = props;
    return (
        <div className="nc-tournament-discord">
            <p className='nc-join-discord-message'>{message}</p>
            <div className={`nc-invite-links-container ${invites.length === 1 ? 'one-invite' : ''}`}>
                {invites.map((invite) => {
                    const { code, approximate_member_count: membersCount } = invite;
                    const inviteLink = `https://discord.com/invite/${code}`;
                    return (
                        <NCInviteLink key={`discord-invite-${code}`} link={inviteLink}>
                            <NCDiscordGuild guild={invite.guild} membersCount={membersCount} />
                        </NCInviteLink>
                    );
                })}
            </div>
        </div>
    );
};
