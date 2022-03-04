import { NCTypography } from '@cactus/srm-component';
import React from 'react';

export const TypographyDemoPage: React.FunctionComponent = () => {
    const variantList = [
        'hero',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'overtitle',
        'string',
    ];

    return (
        <div className='typography-demo-page' style={{ color: 'white' }}>
            {variantList.map((v, idx) => {
                return (
                    <div className='pb-3' key={idx}>
                        <NCTypography key={`typography-${v}-${idx}`} variant={v}>
                                [{v}] Lorem ipsum dolor sit amet
                        </NCTypography>
                    </div>
                );
            })}
            <div className='pb-3'>
                <NCTypography
                    key={'test-id-typography'}
                    variant='h1'
                    intlObj={{
                        id: 'test-id-typography',
                        description: 'test-description-typography',
                    }}
                >
                the text
                </NCTypography>
            </div>
            <div className='pb-3'>
                <NCTypography
                    variant='h2'
                    intlID='test.id.values'
                    intlValues={{ test: 'ouiii' }}
                >
                    {'the text with some {test}'}
                </NCTypography>
            </div>
        </div>
    );
};
