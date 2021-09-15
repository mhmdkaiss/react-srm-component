import "./Tabs.scss";

import React, { useEffect, useRef, useState } from "react";

export interface TabParameter {
    name: string;
    body?: any;
    disabled?: boolean;
    children?: Array<TabParameter>;
}

export interface TabSettings {
    uppercase: boolean;
}

interface TabsProps {
    tabs: Array<TabParameter>;
}

export const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
    const [ currentTab, setCurrentTab ] = useState<TabParameter>(props.tabs[0]);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const scrollableContainer = useRef<HTMLDivElement | null>(null);
    const scrollableItems = useRef<HTMLDivElement | null>(null);

    const [ arrowShowed, setArrowShowed ] = useState<boolean>(false);
    const [ disableLeft, setDisableLeft ] = useState<boolean>(false);
    const [ disableRight, setDisableRight ] = useState<boolean>(false);


    useEffect(() => {
        setupArrows();
    }, [scrollableItems, headerRef]);

    useEffect(() => {
        window.addEventListener("resize", setupArrows);
    }, []);

    const onTabChange = (t: TabParameter) => {
        setCurrentTab(t);
    };

    const setupArrows = () => {
        if(!scrollableItems.current || !headerRef.current) {
            return;
        }
        setArrowShowed(scrollableItems.current.offsetWidth > headerRef.current.offsetWidth);
        updateArrows();
    }

    const updateArrows = () => {
        if (!scrollableContainer.current || !scrollableItems.current || !headerRef.current) {
            return;
        }

        setDisableLeft(scrollableContainer.current.scrollLeft === 0 ? true : false);
        setDisableRight(scrollableItems.current.clientWidth - scrollableContainer.current.scrollLeft < headerRef.current?.clientWidth)
    }

    const scrollContainer = (right: boolean) => {
        if (!scrollableContainer.current || !headerRef.current) {
            return;
        }
        scrollableContainer.current.scrollBy(right ? headerRef.current.clientWidth : -headerRef.current.clientWidth || 0, 0)
        updateArrows();
    }

    const renderPaginationButton = (disabled: boolean, right: boolean = false) => {
        return arrowShowed ?
            <div
                className={`mask-icon pagination-button mt-2 ${right ? 'right ml-2' : 'mr-2'} ${disabled? 'disabled' : ''}`}
                style={{
                    maskImage: `url(${process.env.REACT_APP_S3_PUBLIC_URL}/media/icons/goToPreviousPage.svg`,
                    WebkitMaskImage: `url(${process.env.REACT_APP_S3_PUBLIC_URL}/media/icons/goToPreviousPage.svg`,
                }}
                onClick={() => scrollContainer(right)}
            ></div>
            : null;
    };

    return (
        <div className="tabs w-100">
            <div ref={headerRef} className="tabs-header d-flex mt-3 mb-2">
                {renderPaginationButton(disableLeft)}
                <div
                    ref={scrollableContainer}
                    className="scrollable-container"
                    onScroll={() => updateArrows()}
                >
                    <div ref={scrollableItems} className="scrollable-items d-flex">
                        {props.tabs.length > 0 &&
                            props.tabs.map((t) => {
                                return (
                                    <div
                                        key={t.name}
                                        className={`tab-container d-flex justify-content-center align-items-center mx-3 ${
                                            t.name === currentTab.name ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            onTabChange(t);
                                        }}
                                    >
                                        <div className="tab-name text-uppercase">{t.name}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {renderPaginationButton(disableRight, true)}
            </div>
            <div className="tabs-body">{currentTab.body}</div>
        </div>
    );
};
