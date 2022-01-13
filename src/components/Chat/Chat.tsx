import './Chat.scss';

import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FormattedMessage, useIntl } from 'react-intl';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';

import { Event } from '../../models/RTEvent';
import { Messages } from './Messages';

export interface ChatProps {
    messages: Array<Event>;
    currentUserId?: string;
    isCaptain?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (message: string) => void;
    fullScreen?: boolean
}

export const Chat: React.FunctionComponent<ChatProps> = (props: ChatProps) => {
    const localStorageKey = 'tournament-chat-position';
    const intl = useIntl();
    const [ isChatOpen, setIsChatOpen ] = useState<boolean>(true);
    const [ chatWasOpen, setChatWasOpen ] = useState<boolean>(true);
    const [ unread, setUnread ] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>('');
    const [ dragged, setDragged ] = useState<boolean>();
    const [ isMessageValid, setIsMessageValid ] = useState<boolean>(false);
    const [ boxPosition, setBoxPosition ] = useState<{ x: number, y: number }>();
    const [ boxPositionClass, setBoxPositionClass ] = useState<string>('bottom-left');
    const draggableNodeRef = React.useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const putInWindow = (x: number, y: number) => {
        const maxCoef = 125;
        const minCoef = -50;
        let _x = x;
        let _y = y;
        if (_x > window.innerWidth - maxCoef) {
            _x = window.innerWidth - maxCoef;
        }

        if (_x < minCoef) {
            _x = minCoef;
        }

        if (_y > window.innerHeight - maxCoef) {
            _y = window.innerHeight - maxCoef;
        }

        if (_y < minCoef) {
            _y = minCoef;
        }

        return { x: _x, y: _y };
    };

    const onDrag = () => {
        if (!dragged) {
            setDragged(true);
            setChatWasOpen(isChatOpen);
            setIsChatOpen(false);
        }
    };

    const onDragStop = (_: DraggableEvent, data: DraggableData) => {
        if (dragged) {
            updateBoxPosition(data.x, data.y);
            setIsChatOpen(chatWasOpen);
        }

        localStorage.setItem(localStorageKey, JSON.stringify({ x: data.x, y: data.y }));
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (draggableNodeRef && draggableNodeRef.current && !draggableNodeRef.current.contains(e.target as Node)) {
            setIsChatOpen(false);
        }
    };

    const onGlobalKeyDown = (e: KeyboardEvent): void => {
        if (e.ctrlKey && e.code === 'Space') {
            toggleChat();
        }
    };

    const onMouseClick = () => {
        if (!dragged || props.fullScreen) {
            toggleChat();
        }
        setDragged(false);
    };

    const toggleChat = () => {
        if (unread && !isChatOpen) {
            setUnread(false);
        }
        setIsChatOpen(!isChatOpen);
    };

    const onMessageChanged = (message: string) => {
        setMessage(message);
        setIsMessageValid(message.trim().length > 0);
    };

    const onSendMessage = () => {
        if (isMessageValid) {
            props.sendMessage(message);
            onMessageChanged('');
        }
    };

    const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    };

    const updateBoxPosition = (pX: number, pY: number) => {
        const { x, y } = putInWindow(pX, pY);
        const top = y > window.innerHeight / 2;
        const left = x > window.innerWidth / 2;
        if (top && left) {
            setBoxPositionClass('top-left');
        } else if (top && !left) {
            setBoxPositionClass('top-right');
        } else if (!top && left) {
            setBoxPositionClass('bottom-left');
        } else if (!top && !left) {
            setBoxPositionClass('bottom-right');
        }
        setBoxPosition({ x: x, y: y });
    };

    const onWindowResize = () => {
        if (boxPosition) {
            updateBoxPosition(boxPosition.x, boxPosition.y);
        }
    };

    useEffect(() => {
        if (isChatOpen && messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, [isChatOpen]);

    useEffect(() => {
        const storedPosition = localStorage.getItem(localStorageKey);
        let posX = window.innerWidth;
        let posY = window.innerHeight;
        if (storedPosition) {
            const parsedStoredPosition = JSON.parse(storedPosition);
            if ((parsedStoredPosition.x || parsedStoredPosition.x === 0) && (parsedStoredPosition.y || parsedStoredPosition.y === 0)) {
                posX = parsedStoredPosition.x;
                posY = parsedStoredPosition.y;
            }
        }
        updateBoxPosition(posX, posY);

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', onGlobalKeyDown);
        };
    }, [toggleChat]);

    useEffect(() => {
        if (props.fullScreen) {
            setBoxPosition({ x: 0, y: 0 });
        }
    }, [props.fullScreen]);

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        return () => {
            window.removeEventListener('resize', onWindowResize);
        };
    }, [boxPosition]);

    useEffect(() => {
        if (!isChatOpen) {
            setUnread(true);
        }
    }, [props.messages]);

    return (
        <React.Fragment>
            {boxPosition &&
                <Draggable nodeRef={draggableNodeRef} disabled={props.fullScreen} handle=".comments-icon" position={boxPosition} onDrag={onDrag} onStop={onDragStop}>
                    <div ref={draggableNodeRef} className={`chat position-fixed d-flex ${props.fullScreen ? 'fullscreen-chat flex-column-reverse align-items-end w-100' : ''} ${isChatOpen ? '' : 'closed'}`} >
                        <div
                            onClick={() => onMouseClick()}
                            onTouchEnd={() => (props.fullScreen ? null : onMouseClick())}
                            className={`icon-container  comments-icon d-flex align-items-center justify-content-center
                                ${unread ? 'unread' : ''}
                                ${props.fullScreen ? 'my-1 mr-2' : ''}`
                            }>
                            {unread &&
                                <div className="unread-icon"></div>
                            }
                            <Icon
                                icon={IconType.Comments} width={unread ? 27 : 20} height={unread ? 28 : 21}
                            />
                        </div>
                        <div className={`box ${props.fullScreen ? 'w-100 d-flex flex-column flex-fill' : boxPositionClass}`}>
                            <div className="d-flex flex-column justify-content-center header px-3 w-100">
                                <span className="title"><FormattedMessage
                                    id="chat.chatbox"
                                    description="Chat - Chatbox"
                                /></span>
                                {!props.fullScreen && <span className="hint">
                                    <FormattedMessage
                                        id="chat.shortcut"
                                        description="Chat - Chatbox"
                                        values={{ shortcutKey: 'ctrl+space' }}
                                    />
                                </span>}
                                <span onClick={() => setIsChatOpen(false)} >
                                    <Icon styleName={'position-absolute'} icon={IconType.Close} height={12} width={12} />
                                </span>
                            </div>
                            <div className={'chat-shadow position-absolute w-100'}></div>
                            <Messages fullScreen={props.fullScreen || false} messages={props.messages} currentUserId={props.currentUserId} />
                            <div className="footer mt-3 px-3 pb-2">
                                {props.isCaptain ?
                                    <React.Fragment>
                                        <span className="input-text">
                                            <FormattedMessage
                                                id="chat.send_your_message"
                                                description="Chat - Send your message"
                                            />
                                        </span>
                                        <div className="d-flex align-items-center">
                                            <input
                                                onKeyDown={handleKeyDown}
                                                placeholder={intl.formatMessage({ id: 'chat.write_message' })}
                                                value={message}
                                                onChange={(e) => onMessageChanged(e.target.value)}
                                                type='text'
                                                ref={messageInputRef}
                                            />
                                            <span onClick={() => onSendMessage()}>
                                                <Icon styleName={`ml-2 ${isMessageValid ? 'valid' : ''}`} icon={IconType.Send} width={19.5} height={19.5} />
                                            </span>
                                        </div>
                                    </React.Fragment>

                                    :
                                    <span className="input-text-no-captain d-flex justify-content-center">{intl.formatMessage({ id: 'only.captain.can.talk' })}</span>
                                }
                            </div>
                        </div>
                    </div>
                </Draggable>
            }
        </React.Fragment >
    );
};
