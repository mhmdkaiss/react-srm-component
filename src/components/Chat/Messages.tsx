import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Event } from '../../models/RTEvent';
import './Messages.scss';

export interface ChatProps {
    messages: Array<Event>;
    currentUserId?: string;
    fullScreen: boolean;
}

export const Messages: React.FunctionComponent<ChatProps> = ({ messages, currentUserId, fullScreen }) => {
    const intl = useIntl();
    // eslint-disable-next-line no-useless-escape
    const isUrlRegex = /(((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$))/gi;
    return (
        <div className={`px-3 mt-2 messages-component messages d-flex flex-column flex-column-reverse ${fullScreen ? 'fullscreen-chat' : ''}`}>
            {messages.map((m) => {
                const isReferee = m.senderName === 'ADMIN';
                const isMe = currentUserId && m.sender === currentUserId;
                let message = m.content.message;
                let name: string;
                let code: string | undefined;

                const links = message.match(isUrlRegex);
                links?.forEach((element:string) => {
                    message = message.replaceAll(element, `<a style="color:white" href='${element}' target="_blank" rel="noopener noreferrer">${element}<a>`);
                });

                if (isReferee) {
                    name = intl.formatMessage({ id: 'chat.referee' });
                } else if (!m.senderName) {
                    name = intl.formatMessage({ id: `tournament.${isMe ? 'you' : 'opponent'}` });
                } else {
                    const hashIndex = m.senderName.lastIndexOf('#');
                    code = hashIndex !== -1 ? m.senderName.slice(hashIndex) : '';
                    name = hashIndex !== -1 ? m.senderName.slice(0, hashIndex) : m.senderName;
                }
                return <div className={`mt-4 ${isReferee ? 'referee' : ''} ${isMe ? 'me text-right' : ''}`} key={m.target}>
                    <div>
                        <span className="username">{name}</span>
                        {code &&
                        <span className="code">
                            {code}
                            {isMe && <span className="ml-1">(
                                <FormattedMessage
                                    id="chat.me"
                                    description="Chat - Me"
                                />
                                )</span>}
                        </span>
                        }
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: message }} className='message mt-2'></div>
                </div>;
            })}
        </div>
    );
};
