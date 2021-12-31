import { NCCardList, NCTrainingCard } from '@cactus/srm-component';

import React from "react";
import { createMockTraining } from '../../mock/TrainingCard/TrainingCard.mocl';

export const TrainingCardDemoPage: React.FunctionComponent = () => {
    const generateCards = (length: number) => {
        return [...Array(length)].map(() => {
            const training = createMockTraining();
            return [<NCTrainingCard key={training.id} name={training.name} image={training.image} />]
        });
    }

    const renderRow = (length: number) => {
        return (
            <div className="w-75 mb-3">
                <NCCardList cards={generateCards(length)}/>
            </div>
        );
    }

    return (
        <div>
            {renderRow(1)}
            {renderRow(2)}
            {renderRow(3)}
            {renderRow(5)}
            {renderRow(9)}
        </div>
    );

}
