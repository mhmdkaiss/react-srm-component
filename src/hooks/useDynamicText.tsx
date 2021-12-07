import { useState, useEffect } from 'react';

export const useDynamicText = (values: Array<string>, period?: number): string => {
    const _period = 2000 || period;

    const [ currentText, setCurrentText ] = useState<string>('');
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false);
    const [ loopNum, setLoopNum ] = useState<number>(0);
    const [ delta, setDelta ] = useState<number>(0);

    const typeText = () => {
        const i = loopNum % values.length;
        const fullTxt = values[i];

        if (isDeleting) {
            setCurrentText(fullTxt.substring(0, currentText.length - 1));
        } else {
            setCurrentText(fullTxt.substring(0, currentText.length + 1));
        }

        let newDelta = 300 - Math.random() * 100;

        if (isDeleting) { newDelta /= 2; }

        if (!isDeleting && currentText === fullTxt) {
            newDelta = _period;
            setIsDeleting(true);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            newDelta = 500;
        }
        setDelta(newDelta);
    };

    useEffect(() => {
        const timer = setTimeout(typeText, delta);
        return () => clearTimeout(timer);
    }, [delta]);

    return currentText;
};
