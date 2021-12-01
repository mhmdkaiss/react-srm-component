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

    return (
        <div className={`px-3 mt-2 messages-component messages d-flex flex-column flex-column-reverse ${fullScreen ? 'fullscreen-chat' : ''}`}>
            {messages.map((m) => {
                const isReferee = m.senderName === 'ADMIN';
                const isMe = currentUserId && m.sender === currentUserId;
                let name: string;
                let code: string | undefined;

                if (isReferee) {
                    name = intl.formatMessage({ id: 'chat.referee' });
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
                    <div className="message mt-2">{m.content.message}</div>
                </div>;
            })}
        </div>
    );
};
