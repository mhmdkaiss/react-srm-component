import React from 'react';
import './PartnerCardDemoPage.scss';
import { NCCardList, NCPartnerCard } from '@cactus/srm-component';
import { createMockPartner } from '../../mock/PartnerCard/PartnerCard.mock';

export const PartnerCardDemoPage: React.FunctionComponent = () => {
    const generateCards = () => {
        return [...Array(10)].map(() => {
            const partner = createMockPartner();
            return [<NCPartnerCard key={partner.id} partner={partner} />];
        });
    };

    return (
        <div className='d-flex flex-column partner-card-demo-page'>
            <div>
                <h2>Single</h2>
                <NCPartnerCard partner={createMockPartner()} />
            </div>
            <div className='w-25 mt-5'>
                <h2>List</h2>
                <NCCardList cards={generateCards()}/>
            </div>
        </div>
    );
};
