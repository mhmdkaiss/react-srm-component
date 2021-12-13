import './NCSlider.scss';
import React, { useEffect, useState } from 'react';
import { NCSliderSelector } from './NCSliderSelector/NCSliderSelector';
import { NCSliderBackground } from './NCSliderBackground/NCSliderBackground';

export interface NCSliderProps {
    backgroundUrls: Array<string>;
    contentSelector?: Array<React.ReactNode>;
    contentBackground?: Array<React.ReactNode>;
    autoplay?: boolean;
    height?: number;
    slideTimer?: number;
}

export const NCSlider: React.FunctionComponent<NCSliderProps> = (props: NCSliderProps) => {
    const scrollableRef: React.RefObject<HTMLDivElement> = React.createRef();
    const [ bgUrls, setBgUrls ] = useState<Array<string>>();

    useEffect(() => {
        const max = Math.max(props.contentSelector?.length || 0, props.contentBackground?.length || 0);
        let images = props.backgroundUrls;
        if (max > images.length) {
            images = [ ...images, ...Array(max - images.length).fill('') ];
        }
        setBgUrls(images);
    }, [props]);

    return (
        bgUrls?.length ?
            <div className='nc-slider-component position-relative'>
                <NCSliderSelector
                    scrollableRef={scrollableRef}
                    slideCount={bgUrls.length}
                    content={props.contentSelector}
                    autoplay={props.autoplay}
                    height={props.height}
                    slideTimer={props.slideTimer}
                />
                <div className="nc-slider-background position-absolute w-100">
                    <NCSliderBackground
                        scrollableRef={scrollableRef}
                        backgroundUrls={bgUrls}
                        content={props.contentBackground}
                        height={props.height}
                    />
                </div>
            </div> :
            null
    );
};
