import React, { useEffect, useState } from 'react';
import { NCBubble } from '../../atoms/NCBubble/NCBubble';
import { getDaysOfWeek } from '../../utils/getDaysOfWeek';
import './NCWeeklyScheduling.scss';

export interface NCWeeklySchedulingProps {
    schedulingId: string;
    language?: string;
    selectedItems?: Array<string>;
    onClick?: (value: string, active: boolean) => void;
}

export const NCWeeklyScheduling: React.FunctionComponent<NCWeeklySchedulingProps> = (
    props: NCWeeklySchedulingProps
) => {
    const { selectedItems, language, schedulingId } = props;
    const [ selected, setSelected ] = useState<Array<string>>();
    const [ weekDays, setWeekDays ] = useState<Array<string>>([]);

    useEffect(() => {
        setSelected(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
        setWeekDays(getDaysOfWeek(language));
    }, [language]);

    return (
        <div className="nc-weekly-scheduling-container">
            {weekDays.map((day: string, index: number) => {
                return (
                    <NCBubble
                        key={`${schedulingId}-nc-bubble-${index}`}
                        isActive={selected?.includes(String(index))}
                        content={{ text: day, size: 12 }}
                        onClick={props.onClick}
                    />
                );
            })}
        </div>
    );
};
