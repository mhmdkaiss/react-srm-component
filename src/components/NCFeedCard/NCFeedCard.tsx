import './NCFeedCard.scss';

import React, { useState } from 'react';
import { FeedModel } from '../../models/Feed';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

export interface NCFeedCardProps {
    data: FeedModel;
}

export const NCFeedCard: React.FunctionComponent<NCFeedCardProps> = (
    props: NCFeedCardProps,
) => {
    const [ shareMenuVisible, setShareMenuVisible ] = useState<boolean>();

    const renderIcon = () => {
        if (props.data.tweetId) {
            return <Icon icon={IconType.Twitter} width={18} height={18} />;
        }
        return <img className='icon' src={props.data.icon} alt='icon' />;
    };

    const renderAuthor = () => {
        return (
            <React.Fragment>
                <div className='d-flex text-elipsis'>
                    <div className='logo-container d-flex justify-content-center align-items-start'>
                        <img
                            className='logo'
                            src={props.data.logo}
                            alt='logo'
                        />
                    </div>
                    <div className='ml-3 text-elipsis d-flex flex-column'>
                        <div className='d-flex'>
                            <span className='title text-elipsis'>
                                {props.data.title}
                            </span>
                            {props.data.tweetId && (
                                <Icon
                                    styleName='px-3'
                                    icon={IconType.TwitterVerified}
                                    height={18}
                                    width={18}
                                />
                            )}
                        </div>
                        {props.data.username && (
                            <span className='username text-elipsis'>
                                {props.data.tweetId ? '@' : ''}
                                {props.data.username}
                            </span>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const renderShare = () => {
        if (props.data.tweetId) {
            return (
                <React.Fragment>
                    <div className='d-flex flex-row position-relative'>
                        <Icon
                            icon={IconType.Share}
                            width={24}
                            height={22}
                            onClick={() =>
                                setShareMenuVisible(!shareMenuVisible)
                            }
                        />
                        <a
                            href={`https://twitter.com/intent/like?tweet_id=${props.data.tweetId}&original_referer=${window.location.href}`}
                            target='_blank'
                            rel='noreferrer'
                            className='ml-4'
                        >
                            <Icon
                                icon={IconType.Heart}
                                width={24}
                                height={22}
                            />
                        </a>
                        {shareMenuVisible && (
                            <div className='share-menu position-absolute d-flex flex-column pl-2 pr-4 pt-2 pb-1'>
                                <FormattedMessage id="feed.share.on"/>
                                <a
                                    href={`https://twitter.com/intent/retweet?tweet_id=${props.data.tweetId}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Twitter
                                </a>
                                <a
                                    href={`https://facebook.com/dialog/share?app_id=361037704438612&display=popup&href=https://twitter.com/${props.data.username}/status/${props.data.tweetId}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Facebook
                                </a>
                                <a
                                    href={`https://linkedin.com/shareArticle?mini=true&url=https://twitter.com/${props.data.username}/status/${props.data.tweetId}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href={`https://tumblr.com/widgets/share/tool?canonicalUrl=https://twitter.com/${props.data.username}/status/${props.data.tweetId}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    Tumblr
                                </a>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            );
        }
        return;
    };

    const formatDate = () => {
        const now = moment.utc();
        const createdAt = moment(props.data.date);
        if (now.diff(createdAt, 'day')) {
            return `${now.diff(createdAt, 'day')}d`;
        } else if (now.diff(createdAt, 'hour')) {
            return `${now.diff(createdAt, 'hour')}h`;
        } else {
            return `${now.diff(createdAt, 'minute')}min`;
        }
    };

    return (
        <div className='nc-feed-card d-flex flex-column'>
            <div className='py-3 px-2 px-md-3 d-flex justify-content-between'>
                {props.data.tweetId ? (
                    <a
                        href={`https://twitter.com/${props.data.username}`}
                        target='_blank'
                        rel='noreferrer'
                        className='text-elipsis'
                    >
                        {renderAuthor()}
                    </a>
                ) : (
                    renderAuthor()
                )}
                <div className='icon-container'>{renderIcon()}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            <div className='d-flex justify-content-between py-3 px-2 px-md-3'>
                <div>{renderShare()}</div>
                <span className='date'>{formatDate()}</span>
            </div>
        </div>
    );
};
