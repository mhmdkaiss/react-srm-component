import './FeedCardDemoPage.scss';
import { NCFeedCard } from '@cactus/srm-component';

import React from 'react';
import {
    createBOMockFeedModel,
    createTwiterMockFeedModel,
} from '../../mock/FeedCard/FeedCard.mock';

export const FeedCardDemoPage: React.FunctionComponent = () => {
    return (
        <div className='feed-card-demo-page d-flex flex-column'>
            <div>
                <h2>Twitter</h2>
                <div className='row'>
                    <div className='col-5'>
                        <NCFeedCard data={createTwiterMockFeedModel()} />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h2>Back Office</h2>
                <div className='row'>
                    <div className='col-5'>
                        <NCFeedCard data={createBOMockFeedModel()} />
                    </div>
                </div>
            </div>
        </div>
    );
};
