import './NCSliderBackground.scss';
import React, { useEffect, useState } from 'react';

export interface NCSliderBackgroundProps {
    scrollableRef: React.RefObject<HTMLDivElement>;
    backgroundUrls?: Array<string>;
    content?: Array<React.ReactNode>;
    height?: number;
}

export const NCSliderBackground: React.FunctionComponent<NCSliderBackgroundProps> = (props: NCSliderBackgroundProps) => {
    const height = props.height || 480;
    const [ bgUrls, setBgUrls ] = useState<Array<string>>();

    useEffect(() => {
        let images = props.backgroundUrls || [];
        if (props.content?.length && (!images || props.content.length > images.length)) {
            images = [ ...images, ...Array(props.content.length - (images?.length || 0)).fill('') ];
        }
        setBgUrls(images);
    }, [ props.backgroundUrls, props.content ]);

    return (
        <div
            ref={props.scrollableRef}
            className="nc-slider-background"
        >
            {
                bgUrls && bgUrls.map((img, index) => {
                    return (
                        <div
                            key={img + index}
                            className="slide-background"
                            style={{ backgroundImage: `url(${img})`, height: `${height}px` }}
                        >
                            {
                                props.content && props.content[index] &&
                                <div key={index} className="w-100 h-100">
                                    {props.content[index]}
                                </div>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};
