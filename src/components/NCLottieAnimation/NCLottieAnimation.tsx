import React, { useEffect } from 'react';
import lottie from 'lottie-web';

import './NCLottieAnimation.scss';

export interface NCLottieAnimationProps {
    lottieUrl: string;
    animationDuration: number;
    marginTop?: number;
}

export const NCLottieAnimation: React.FunctionComponent<NCLottieAnimationProps> = (props: NCLottieAnimationProps) => {
    const animationRef = React.createRef<HTMLDivElement>();
    const animationOffsetStart = 0;
    const animationOffsetEnd = 30;

    useEffect(() => {
        if (!animationRef.current) {
            return;
        }
        const anim = lottie.loadAnimation({
            container: animationRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: props.lottieUrl,
        });

        const animateBodyMoving = (duration: number) => {
            const scrollPosition = window.scrollY;
            const maxFrames = anim.totalFrames - animationOffsetStart - animationOffsetEnd;
            const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
            anim.goToAndStop(animationOffsetStart + frame, true);
        };

        const onScroll = () => {
            animateBodyMoving(props.animationDuration);
        };

        document.addEventListener('scroll', onScroll);

        return () => {
            anim.destroy();
            document.removeEventListener('scroll', onScroll);
        };
    }, [animationRef.current]);

    return (
        <div className='nc-lottie-animation'>
            <div style={{ height: props.animationDuration + 500 }}>
                <div className='animation' style={{ top: props.marginTop ? props.marginTop : 0 }} ref={animationRef}/>
            </div>
        </div>
    );
};
