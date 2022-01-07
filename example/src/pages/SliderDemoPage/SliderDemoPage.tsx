import { NCSlider, NCSliderBackground, NCSliderSelector } from '@cactus/srm-component';
import React from 'react';
import './SliderDemoPage.scss';

export const SliderDemoPage: React.FunctionComponent = () => {
    const scrollableRef1: React.RefObject<HTMLDivElement> = React.createRef();
    const scrollableRef2: React.RefObject<HTMLDivElement> = React.createRef();

    const backgroundImages = [
        `${process.env.REACT_APP_S3_URL}/media/assets/homepage-banner.png`,
        `${process.env.REACT_APP_S3_URL}/media/carousel/header-mlegends-gcc.jpg`,
        `${process.env.REACT_APP_S3_URL}/homepage/carousel/backgroundMobile/RocketLeague.jpg`,
        `${process.env.REACT_APP_S3_URL}/homepage/carousel/backgroundMobile/PUBG.jpg`,
        `${process.env.REACT_APP_S3_URL}/homepage/carousel/backgroundMobile/LoL.jpg`,
    ];

    const backgroundContent = [];
    for (let i = 0; i < 6; ++i) {
        backgroundContent.push(
            <div key={`background-${i}`} className="w-100 h-100 d-flex">
                <div className="m-auto white">Background content (Slide ${i+1})</div>
            </div>
        );
    }

    const slideContent = [];
    for (let i = 0; i < 6; ++i) {
        slideContent.push(
            <div key={`selector-${i}`} className="w-100 h-100 d-flex">
                <div className="m-auto white">Selector content (Slide ${i+1})</div>
            </div>,
        );
    }

    return (
        <div className='slider-demo-page d-flex flex-column'>
            <div>
                <h1>NCSlider</h1>
                <div>Main Inputs:</div>
                <ul>
                    <li>
                        <span className="font-weight-bold">backgroundUrls: </span>
                        <span>array of background url</span>
                    </li>
                    <li>
                        <span className="font-weight-bold">contentSelector: </span>
                        <span>array of html content for slides selector</span>
                    </li>
                    <li>
                        <span className="font-weight-bold">contentBackground: </span>
                        <span>array of html content used for slides background</span>
                    </li>
                </ul>
                <div>You can use one to all of thoses inputs depending of needs.</div>
                <div>Number of slide while be based on the longest input.</div>
            </div>
            <div className='slider-demo-container'>
                <div className="my-5">
                    <div className="mb-2">NCSlider (Background only)</div>
                    <NCSlider backgroundUrls={backgroundImages} />
                </div>
                <div className="my-5">
                    <div className="mb-2">NCSlider (Background and content)</div>
                    <NCSlider
                        backgroundUrls={backgroundImages}
                        contentSelector={slideContent}
                    />
                </div>
                <div className="my-5">
                    <div className="mb-2">NCSlider (Background, content and autoplay)</div>
                    <NCSlider
                        backgroundUrls={backgroundImages}
                        contentSelector={slideContent}
                        autoplay
                    />
                </div>
            </div>
            <div className="mt-4">
                <h1>Separate calls</h1>
                <div>Slider and background components works by pair but can be call separatly.</div>
                <div>It will be used when background position is not relative to selector.</div>
            </div>
            <div className='slider-demo-container'>
                <div className="d-flex my-5">
                    <div className="col-6 selector-demo">
                        <div className="mb-2">NCSliderSelector(content)</div>
                        <NCSliderSelector
                            scrollableRef={scrollableRef1}
                            slideCount={backgroundImages.length}
                            content={slideContent}
                        />
                    </div>
                    <div className="col-6">
                        <div className="mb-2">NCSliderBackground (content)</div>
                        <NCSliderBackground
                            scrollableRef={scrollableRef1}
                            backgroundUrls={backgroundImages}
                            content={backgroundContent}
                        />
                    </div>
                </div>
            </div>
            <div className='slider-demo-container'>
                <div className="d-flex my-5">
                    <div className="col-6 selector-demo">
                        <div className="mb-2">NCSliderSelector(content and autoplay)</div>
                        <NCSliderSelector
                            scrollableRef={scrollableRef2}
                            slideCount={backgroundImages.length}
                            content={slideContent}
                            autoplay
                        />
                    </div>
                    <div className="col-6">
                        <div className="mb-2">NCSliderBackground (content and autoplay)</div>
                        <NCSliderBackground
                            scrollableRef={scrollableRef2}
                            backgroundUrls={backgroundImages}
                            content={backgroundContent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
