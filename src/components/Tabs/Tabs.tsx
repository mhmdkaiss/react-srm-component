import "./Tabs.scss";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface TabParameter {
    basePath?: string;

    name: string;
    body?: any;

    path: string;
    redirect?: string;
    internalLink?: string;

    component?: any;

    children?: Array<TabParameter>;

    disabled?: boolean;
    hide?: boolean;
}

export interface TabSettings {
    uppercase: boolean;
}

interface TabsProps {
    basename: string;
    tabs: Array<TabParameter>;

    NcRouterLink: typeof Link;
}

export const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
    const [currentTab, setCurrentTab] = useState<TabParameter>(props.tabs[0]);
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [currentTabPos, setCurrentTabPos] = useState<number>(0);
    const tabsRef = useRef<Array<HTMLDivElement | null>>([]);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const scrollableContainer = useRef<HTMLDivElement | null>(null);
    const scrollableItems = useRef<HTMLDivElement | null>(null);

    const [arrowShowed, setArrowShowed] = useState<boolean>(false);
    const [disableLeft, setDisableLeft] = useState<boolean>(false);
    const [disableRight, setDisableRight] = useState<boolean>(false);

    useEffect(() => {
        tabsRef.current = tabsRef.current.slice(0, props.tabs.length);
    }, []);

    useEffect(() => {
        setupArrows();
    }, [scrollableItems, headerRef]);

    useEffect(() => {
        window.addEventListener("resize", setupArrows);
    }, []);

    const onTabChange = (tab: TabParameter, index: number, pos: number | undefined) => {
        setCurrentTab(tab);
        setCurrentTabIndex(index)
        if (pos) {
            setCurrentTabPos(pos);
        }
        return (<props.NcRouterLink to={tab.path}>Root</props.NcRouterLink>)
    };

    const cleanTab = () => {
        setCurrentTab(props.tabs[currentTabIndex]);
        setCurrentTabIndex(0)
        setCurrentTabPos(0);
    }

    const setupArrows = () => {
        if (!scrollableItems.current || !headerRef.current) {
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
                className={`mask-icon pagination-button mt-2 ${right ? 'right ml-2' : 'mr-2'} ${disabled ? 'disabled' : ''}`}
                style={{
                    maskImage: `url(${process.env.REACT_APP_S3_PUBLIC_URL}/media/icons/goToPreviousPage.svg`,
                    WebkitMaskImage: `url(${process.env.REACT_APP_S3_PUBLIC_URL}/media/icons/goToPreviousPage.svg`,
                }}
                onClick={() => scrollContainer(right)}
            ></div>
            : null;
    };

    const renderSubTabs = () => {
        return (
            <div className="sub-tabs position-absolute" style={{ left: currentTabPos }}>
                {props.tabs[currentTabIndex] && props.tabs[currentTabIndex].children && props.tabs[currentTabIndex].children?.map((tab, index) => {
                    return !tab.hide && (
                        <props.NcRouterLink key={index} className={`sub-tab ${tab.disabled ? 'disabled' : ''}`} onClick={() => { !tab.disabled ? cleanTab() : {} }} to={tab.disabled ? "#" : (props.tabs[currentTabIndex].path + tab.path)}>{tab.name}</props.NcRouterLink>
                    )
                })
                }
            </div>
        )
    }

    return (
        <div className="tabs">
            <div className="tabs-body w-100">
                <div ref={headerRef} className="tabs-header d-flex mt-3 mb-2">
                    {renderPaginationButton(disableLeft)}
                    <div
                        ref={scrollableContainer}
                        className="scrollable-container"
                        onScroll={() => updateArrows()}
                    >
                        <div ref={scrollableItems} className="scrollable-items d-flex">
                            {props.tabs.length > 0 &&
                                props.tabs.map((tab, index) => {
                                    if (tab.hide) {
                                        return;
                                    }
                                    return (
                                        <div
                                            key={tab.name}
                                            ref={(element) => tabsRef.current[index] = element}
                                            className={`tab-container d-flex justify-content-center align-items-center position-relative ${tab.name === currentTab.name ? "active" : ""
                                                }`}
                                            onClick={() => {
                                                onTabChange(tab, index, tabsRef.current[index]?.offsetLeft);
                                            }}
                                        >
                                        {(!tab.children && 
                                            <props.NcRouterLink to={tab.path}>
                                                <div className="tab-name text-uppercase">{tab.name}</div>
                                            </props.NcRouterLink>
                                        )}
                                        {(tab.children && 
                                            <div className="tab-name text-uppercase">{tab.name}</div>
                                        )}
                                        </div>
                                    );
                                })}
                            {renderSubTabs()}
                        </div>
                    </div>
                    {renderPaginationButton(disableRight, true)}
                </div>
            </div>
        </div>
    );
};
