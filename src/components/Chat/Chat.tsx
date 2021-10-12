import React, { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FormattedMessage, useIntl } from "react-intl";
import { Icon, IconType } from "../../atoms/Icon/Icon";
import { Event } from "../../models/RTEvent";
import "./Chat.scss";
import { Messages } from "./Messages";


export interface ChatProps {
    messages: Array<Event>;
    currentUserId?: string;
    isCaptain?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (message: string) => void;
    fullScreen?: boolean
}

export const Chat: React.FunctionComponent<ChatProps> = ({ messages, currentUserId, isCaptain, sendMessage, fullScreen }) => {
    const localStorageKey = 'tournament-chat-position';
    const intl = useIntl();
    const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
    const [chatWasOpen, setChatWasOpen] = useState<boolean>(true);
    const [unread, setUnread] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [dragged, setDragged] = useState<boolean>();
    const [isMessageValid, setIsMessageValid] = useState<boolean>(false);
    const [boxPosition, setBoxPosition] = useState<{ x: number, y: number }>();
    const [boxPositionClass, setBoxPositionClass] = useState<string>('bottom-left');
    const draggableNodeRef = React.useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);


    const putInWindow = (x: number, y: number) => {
        const maxCoef = 125;
        const minCoef = -50;
        if (x > window.innerWidth - maxCoef) {
            x = window.innerWidth - maxCoef;
        }

        if (x < minCoef) {
            x = minCoef;
        }

        if (y > window.innerHeight - maxCoef) {
            y = window.innerHeight - maxCoef;
        }

        if (y < minCoef) {
            y = minCoef;
        }

        return { x: x, y: y };
    }

    const onDrag = () => {
        if (!dragged) {
            setDragged(true);
            setChatWasOpen(isChatOpen);
            setIsChatOpen(false);
        }
    }

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

    const onGlobalKeyDown = (e: KeyboardEvent): any => {
        if (e.ctrlKey && e.code === 'Space') {
            toggleChat();
        }
    }

    const onMouseClick = () => {
        if (!dragged || fullScreen) {
            toggleChat();
        }
        setDragged(false)
    }

    const toggleChat = () => {
        if (unread && !isChatOpen) {
            setUnread(false);
        }
        setIsChatOpen(!isChatOpen)
    }

    const onMessageChanged = (message: string) => {
        setMessage(message);
        setIsMessageValid(message.trim().length > 0);
    }

    const onSendMessage = () => {
        if (isMessageValid) {
            sendMessage(message);
            onMessageChanged('');
        }
    }

    const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    }

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
    }

    const onWindowResize = () => {
        if (boxPosition) {
            updateBoxPosition(boxPosition.x, boxPosition.y)
        }
    }

    useEffect(() => {
        if (isChatOpen && messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, [isChatOpen])

    useEffect(() => {
        const storedPosition = localStorage.getItem(localStorageKey);
        if (storedPosition) {
            const parsedStoredPosition = JSON.parse(storedPosition);
            if (parsedStoredPosition.x && parsedStoredPosition.y) {
                updateBoxPosition(parsedStoredPosition.x, parsedStoredPosition.y);
            }
        } else {
            updateBoxPosition(window.innerWidth, window.innerHeight);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', onGlobalKeyDown);
        return () => {
            window.removeEventListener('keydown', onGlobalKeyDown);
        }
    }, [toggleChat])

    useEffect(() => {
        if (fullScreen) {
            setBoxPosition({ x: 0, y: 0 });
        }
    }, [fullScreen]);

    useEffect(() => {
        window.addEventListener('resize', onWindowResize);
        return () => {
            window.removeEventListener('resize', onWindowResize);
        }
    }, [boxPosition]);

    useEffect(() => {
        if (!isChatOpen) {
            setUnread(true);
        }
    }, [messages])

    return (
        <React.Fragment>
            {boxPosition &&
                <Draggable nodeRef={draggableNodeRef} disabled={fullScreen} handle=".comments-icon" position={boxPosition} onDrag={onDrag} onStop={onDragStop}>
                    <div ref={draggableNodeRef} className={`chat position-fixed d-flex ${fullScreen ? 'fullscreen-chat flex-column-reverse align-items-end w-100' : ''}`} >
                        <div
                            onClick={() => onMouseClick()}
                            onTouchEnd={() => fullScreen ? null : onMouseClick()}
                            className={`icon-container  comments-icon d-flex align-items-center justify-content-center 
                                ${unread ? 'unread' : ''} 
                                ${fullScreen ? 'mt-1' : ''}`
                            }>
                            {unread &&
                                <div className="unread-icon"></div>
                            }
                            <Icon
                                styleName={`${isChatOpen || unread ? 'chat-open' : 'chat-closed'}`}
                                icon={IconType.Comments} width={unread ? 27 : 20} height={unread ? 28 : 21}
                            />
                        </div>
                        <div className={`box ${isChatOpen ? '' : 'closed'} ${fullScreen ? 'fullscreen-chat w-100 d-flex flex-column flex-fill' : boxPositionClass}`}>
                            <div className={'chat-shadow position-absolute w-100'}></div>
                            <div className="align-items-center d-flex header justify-content-around p-2 position-absolute w-100">
                                <span className="title"><FormattedMessage
                                    id="chat.chatbox"
                                    description="Chat - Chatbox"
                                /></span>
                                {!fullScreen && <span className="hint text-right">
                                    <FormattedMessage
                                        id="chat.shortcut"
                                        description="Chat - Chatbox"
                                        values={{ shortcutKey: 'ctrl+space' }}
                                    />
                                </span>}
                            </div>
                            <Messages fullScreen={fullScreen || false} messages={messages} currentUserId={currentUserId} />
                            <div className="footer mt-3 px-3 pb-2">
                                {isCaptain &&
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
                                                placeholder={intl.formatMessage({ id: "chat.write_message" })}
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
                                }
                            </div>
                        </div>
                    </div>
                </Draggable>
            }
        </React.Fragment>
    )
};
