import React, { useEffect, useState } from 'react';
import { NCSliderBackground } from '../NCSliderBackground/NCSliderBackground';

export interface NCSliderSelectorProps {
    scrollableRef: React.RefObject<HTMLDivElement>;
    slideCount: number;
    content?: Array<React.ReactNode>;
    autoplay?: boolean;
    height?: number;
    slideTimer?: number;
    selectedSlide?: number;
    goToSlide?: (index: number) => void;
    color?: string;
    style? :string;
}

export const NCSliderSelector: React.FunctionComponent<NCSliderSelectorProps> = (
    props: NCSliderSelectorProps
) => {
    const scrollableSliderRef: React.RefObject<HTMLDivElement> = React.createRef();

    const [ isMouseDown, setIsMouseDown ] = useState<boolean>();
    const [ selectedSlide, setSelectedSlide ] = useState<number>(0);
    const [ initScroll, setInitScroll ] = useState<number>();
    const [ previousTouch, setPreviousTouch ] = useState<number>();
    const [ autoplayTimer, setAutoplayTimer ] = useState<NodeJS.Timeout>();
    const [ isMouseIn, setIsMouseIn ] = useState<boolean>(false);
    const [ hoverSelectorIndex, setHoverSelectorIndex ] = useState<number>();

    const height = props.height || 480;
    const slideTimer = props.slideTimer || 2000;

    useEffect(() => {
        setSelectedSlide(props.selectedSlide ?? 0);
    }, [props.selectedSlide]);

    useEffect(() => {
        if (isMouseIn || !props.autoplay) {
            return;
        }

        clearSliderTimeout();
        setSliderTimeout();
    }, [selectedSlide]);

    useEffect(() => {
        scrollRefToSelected(props.scrollableRef);
        scrollRefToSelected(scrollableSliderRef);
        props.goToSlide?.(selectedSlide);
    }, [selectedSlide]);

    useEffect(() => {
        if (isMouseDown && props.scrollableRef.current) {
            if (props.scrollableRef.current.scrollLeft !== selectedSlide * props.scrollableRef.current.clientWidth) {
                setInitScroll(selectedSlide * props.scrollableRef.current.clientWidth);
            }
        }
        if (!isMouseDown && props.scrollableRef.current) {
            const containerWidth = props.scrollableRef.current.clientWidth;
            const containerScroll = props.scrollableRef.current.scrollLeft;
            const scrollDiff = (initScroll || 0) - containerScroll;
            if (Math.abs(scrollDiff) > containerWidth * 0.2) {
                clearSliderTimeout();
                setSelectedSlide(selectedSlide - Math.sign(scrollDiff));
            } else {
                scrollRefToSelected(props.scrollableRef);
                scrollRefToSelected(scrollableSliderRef);
            }
        }
    }, [isMouseDown]);

    useEffect(() => {
        return () => {
            clearTimeout();
        };
    }, []);

    const scrollRefToSelected = (ref: React.RefObject<HTMLDivElement>) =>
        ref.current?.scrollTo({
            left: selectedSlide * ref.current.clientWidth,
            behavior: 'smooth'
        });

    const scrollRefBy = (ref: React.RefObject<HTMLDivElement>, scroll: number) =>
        ref.current?.scrollBy({ left: scroll });

    const mouseMove = (e: React.MouseEvent) => {
        if (isMouseDown) {
            scrollRefBy(props.scrollableRef, -e.movementX);
            scrollRefBy(scrollableSliderRef, -e.movementX);
        }
    };

    const touchMove = (e: React.TouchEvent) => {
        if (!props.scrollableRef.current || !isMouseIn) {
            return;
        }

        if (!previousTouch) {
            setPreviousTouch(e.touches[0].pageX);
            return;
        }

        const event = e.touches[0];
        if (event) {
            const refSizes = props.scrollableRef.current.getBoundingClientRect();
            if (
                (event.clientX < refSizes.left || event.clientX > refSizes.left + refSizes.width) ||
                (event.clientY < refSizes.top || event.clientY > refSizes.top + refSizes.height)
            ) {
                leaveSlider();
                return;
            }
        }

        if (previousTouch) {
            scrollRefBy(props.scrollableRef, previousTouch - event.pageX);
            scrollRefBy(scrollableSliderRef, previousTouch - event.pageX);
        }
        setPreviousTouch(event.pageX);
    };

    const enterSlider = () => {
        clearSliderTimeout();
        setIsMouseIn(true);
    };

    const leaveSlider = () => {
        setPreviousTouch(undefined);
        setIsMouseDown(false);
        setIsMouseIn(false);
        if (props.autoplay) {
            clearSliderTimeout();
            setSliderTimeout();
        }
    };

    const clearSliderTimeout = () => {
        if (autoplayTimer) {
            clearTimeout(autoplayTimer);
        }
    };

    const setSliderTimeout = () => {
        const timer = setTimeout(() => {
            if (selectedSlide + 1 < props.slideCount) {
                setSelectedSlide(selectedSlide + 1);
            } else {
                setSelectedSlide(0);
            }
        }, slideTimer);
        setAutoplayTimer(timer);
    };

    return (
        <div
            className="nc-slider-selector d-flex position-relative"
            onMouseDown={() => {
                setInitScroll(props.scrollableRef.current?.scrollLeft);
                setIsMouseDown(true);
            }}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseLeave={() => leaveSlider()}
            onMouseEnter={() => enterSlider()}
            onMouseMove={(e) => mouseMove(e)}
            onTouchStart={() => {
                setInitScroll(props.scrollableRef.current?.scrollLeft);
                enterSlider();
                setIsMouseDown(true);
            }}
            onTouchMove={(e) => touchMove(e)}
            onTouchEnd={() => leaveSlider()}
            onDragStart={(e) => e.preventDefault()}
            style={{ height: `${height}px` }}
        >
            {
                props.content && !!props.content.length &&
                <NCSliderBackground
                    scrollableRef={scrollableSliderRef}
                    content={props.content}
                    height={props.height}
                />
            }

            <div className="slide-selector-container position-absolute mb-4 d-flex">
                {[...Array(props.slideCount)].fill(1).map((_, index) =>
                    <div
                        key={index}
                        className={
                            'slide-selector-wrapper cursor-pointer' +
                            ` ${index === selectedSlide ? 'active' : ''}` +
                            ` ${props.style ?? ''}`
                        }
                        onMouseEnter={() => {
                            if (props.color) {
                                setHoverSelectorIndex(index);
                            }
                        }}
                        onMouseLeave={() => {
                            if (props.color) {
                                setHoverSelectorIndex(undefined);
                            }
                        }}
                        onClick={() => {
                            clearSliderTimeout();
                            setSelectedSlide(index);
                        }}
                    >
                        <div
                            className='slide-selector mx-1 my-2'
                            style={(index === selectedSlide || hoverSelectorIndex === index)
                                ? { background: props.color } : {}
                            }
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};
