import { Accordion, AccordionDetails, AccordionSummary, MuiThemeProvider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { ThemePlatform } from '../../styles/Themes';

import './NCAccordion.scss';

export interface NCAccordionData {
    title: string;
    content: string;
}

export interface NCAccordionProps {
    data: Array<NCAccordionData>;
}

export const NCAccordion: React.FunctionComponent<NCAccordionProps> = ({ data }: NCAccordionProps) => {
    const createMarkup = (content: string) => {
        return {
           __html: content
        };
     };

    const renderAccordion = (index: number, title: string, content: string) => {
        const ref = React.createRef();

        return (
            <Accordion key={index} ref={ref} classes={ { root: 'nc-accordion-root' } }>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={ { content: 'nc-accordion-summary' } }
                >
                    <span className="title">{title}</span>
                </AccordionSummary>
                <AccordionDetails classes={ { root: 'nc-accordion-details' } }>
                    <div className="content" dangerouslySetInnerHTML={createMarkup(content)}></div>
                </AccordionDetails>
            </Accordion>
            );
    }

    return (
        <React.Fragment >
            <div className={"nc-accordion"}>
                <MuiThemeProvider theme={ThemePlatform}>
                    {data.map((d, idx) => {
                        return renderAccordion(idx, d.title, d.content);
                    })}
                </MuiThemeProvider>
            </div>
        </React.Fragment>
    );
}