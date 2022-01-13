export interface DiscordGuild {
    id: string;
    name: string;
    icon: string;
}

export interface DiscordInvite {
    code: string,
    guild: DiscordGuild
    approximate_member_count?: number
    /* To see the full object fields, visit https://discord.com/developers/docs/resources/invite */
}
