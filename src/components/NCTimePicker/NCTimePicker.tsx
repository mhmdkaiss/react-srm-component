import { TextField } from '@material-ui/core';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Icon, IconType } from '../../atoms/Icon/Icon';
import './NCTimePicker.scss';

export interface NCTimePickerProps {
    label: string;
    value?: string;
    onChange: (time: string) => void;
}

export const NC_TIME_PICKER_DEFAULT_LABEL = '--:--';

export const NCTimePicker: React.FunctionComponent<NCTimePickerProps> = (
    props: NCTimePickerProps
) => {
    const [ time, setTime ] = useState<moment.Moment>(moment());
    const [ value, setValue ] = useState<string>(NC_TIME_PICKER_DEFAULT_LABEL);
    const [ caretPosition, setCaretPosition ] = useState<number>(5);
    const [ style, setStyle ] = useState<string>('');
    const [ invalid, setInvalid ] = useState<string>('');

    useEffect(() => {
        if (props.value) {
            if (props.value === NC_TIME_PICKER_DEFAULT_LABEL) {
                setValue(NC_TIME_PICKER_DEFAULT_LABEL);
            } else {
                const t = moment(props.value, 'HH:mm');
                setTime(t);
                setValue(t.format('HH:mm'));
            }
        }
    }, [props.value]);

    const handleKeyDown = (e: any) => {
        if ([ 'Control', 'Shift', 'Tab', 'Esc' ].includes(e.key)) {
            return;
        }
        setStyle('caret-transparent');
        const isNumber = /^[0-9]$/i.test(e.key);
        if (isNumber) {
            setInvalid('');
            let input;
            if (value.length === 5 && value[caretPosition] === ':') {
                input = value.slice(0, caretPosition+1)+e.key+value.slice(caretPosition+1);
                const nextCaret = e.target.selectionStart+1;
                e.target.setSelectionRange(nextCaret, nextCaret);
            } else if (value.length === 1 && value[caretPosition] === ':') {
                input = e.key+'0:';
            } else if (value.length < 4 && value[caretPosition] === ':') {
                if (value[0] === ':' && e.key > 2) {
                    input = '0'+e.key+value.slice(caretPosition);
                    const newTime = moment(input, 'HH:mm');
                    setTime(newTime);
                    setValue(newTime.format('HH:mm'));
                    return;
                } else {
                    input = value.slice(0, caretPosition+1)+e.key+value.slice(caretPosition+1);
                }
            } else if (value.length === caretPosition) {
                if (value[0] === ':') {
                    input = '00:'+e.key+value.slice(caretPosition);
                } else {
                    input = value.slice(0, caretPosition)+e.key+'0';
                }
            } else {
                input = value.slice(0, caretPosition)+e.key+value.slice(caretPosition);
            }
            const newTime = moment(input, 'HH:mm');
            setTime(newTime);
            setValue(newTime.format('HH:mm'));

            const nextCaret = e.target.selectionStart+1;
            if (nextCaret < 6) {
                e.target.setSelectionRange(nextCaret, nextCaret);
                setCaretPosition(nextCaret);
            }
            return;
        }
        e.preventDefault();

        if ([ 'ArrowUp', 'ArrowDown' ].includes(e.key)) {
            let update;
            if (caretPosition > 2) {
                update = { minutes: caretPosition === 3 ? 10 : 1 };
            } else {
                let shift = 1;
                if (caretPosition === 0) {
                    shift = 10;
                    const nextHours = time.hours() + 10;
                    if (e.key === 'ArrowUp') {
                        if (nextHours >= 30) {
                            shift = 4;
                        } else if (nextHours >= 24) {
                            shift = 14;
                        }
                    } else {
                        if (nextHours <= 13) {
                            shift = 4;
                        } else if (nextHours < 20) {
                            shift = 14;
                        }
                    }
                }
                update = { hours: shift };
            }
            setInvalid('');
            e.target.setSelectionRange(caretPosition, caretPosition);

            if (e.key === 'ArrowUp') {
                setTime(time.add(update));
            } else {
                setTime(time.subtract(update));
            }
            setValue(time.format('HH:mm'));
            return;
        }

        switch (e.key) {
            case 'ArrowLeft' : {
                if (invalid !== '') {
                    break;
                }
                const nextCaret = e.target.selectionStart-1;
                if (nextCaret >= 0) {
                    e.target.setSelectionRange(nextCaret, nextCaret);
                    setCaretPosition(nextCaret);
                }
                break;
            }
            case 'ArrowRight' : {
                if (invalid !== '') {
                    break;
                }
                const nextCaret = e.target.selectionStart+1;
                if (nextCaret < 6) {
                    e.target.setSelectionRange(nextCaret, nextCaret);
                    setCaretPosition(nextCaret);
                }
                break;
            }
            case 'Backspace' : {
                if (invalid !== '') {
                    break;
                }
                const nextCaret = e.target.selectionStart-1;
                if (nextCaret < 0) {
                    break;
                }
                e.target.setSelectionRange(nextCaret, nextCaret);
                setCaretPosition(nextCaret);

                if (value[caretPosition-1] === ':') {
                    const caret = e.target.selectionStart-1;
                    e.target.setSelectionRange(caret, caret);
                    setCaretPosition(caret);
                    setValue(value.slice(0, caretPosition-2)+':'+value.slice(caretPosition));
                } else {
                    setValue(value.slice(0, caretPosition-1)+value.slice(caretPosition));
                }
                break;
            }
            case 'Delete' : {
                if (invalid !== '') {
                    break;
                }
                if (value[caretPosition] === ':') {
                    const nextCaret = e.target.selectionStart+1;
                    e.target.setSelectionRange(nextCaret, nextCaret);
                    setCaretPosition(nextCaret);
                    setValue(value.slice(0, caretPosition)+':'+value.slice(caretPosition+2));
                } else {
                    setValue(value.slice(0, caretPosition)+value.slice(caretPosition+1));
                }
                break;
            }
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        (e.target as HTMLInputElement).setSelectionRange(caretPosition, caretPosition);
        setStyle('');
        props.onChange(value);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const caret = (e.target as HTMLInputElement).selectionStart;
        if (caret !== null && caret >= 0) {
            setCaretPosition(caret);
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes('Invalid date')) {
            setInvalid('invalid-time');
            setCaretPosition(0);
            setTime(moment());
        }
        props.onChange(e.target.value);
    };

    const handleOnBlur = () => {
        const newTime = moment(value, 'HH:mm');
        if (newTime.format('HH:mm') === 'Invalid date') {
            if (value === NC_TIME_PICKER_DEFAULT_LABEL){
                setValue('00:00');
            } else {
                setInvalid('invalid-time');
                setValue('invalid date');
                setCaretPosition(0);
                setTime(moment());
            }
        } else {
            if (newTime !== time) {
                setTime(newTime);
                setValue(newTime.format('HH:mm'));
            }
        }
        props.onChange(value);
    };

    return (
        <div className={`nc-time-picker-container ${style} ${invalid}`} >
            <TextField
                type="time-local"
                className='time-picker-input nicecactus-input'
                value={value}
                label={props.label}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                onKeyUp={handleKeyUp}
                onBlur={handleOnBlur}
                InputLabelProps={{ shrink: true }}
            />
            <Icon icon={IconType.Clock} width={16} height={16} />
        </div>
    );
};
