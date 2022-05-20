import raw from 'raw.macro';
import React from 'react';
import { NCExampleIntroProps } from '../../components/NCExample/NCExampleIntro';
import { NCExampleItemProps } from '../../components/NCExample/NCExampleItem';
import { NCExamplePage } from '../../components/NCExample/NCExamplePage';
import { PropsExampleExample } from './examples/props.example';
import { StandaloneExampleExample } from './examples/standalone.example';

const PropsExampleRaw = raw('./examples/props.example.tsx');
const StandaloneExampleRaw = raw('./examples/standalone.example.tsx');

export const WelcomePage: React.FunctionComponent = () => {
    const exampleIntro: NCExampleIntroProps = {
        title: 'React Shared Library',
        description: '',
        links: [],
    };

    const exampleProps: Array<NCExampleItemProps> = [
        {
            name: 'NCExamplePage',
            description: <p>
                NCExample is a little framework to help dev make generic testing about any component easily. <br />
                You can make two different test, one based on specific component with a list of props and an other based on an example file
            </p>,
            exampleList: [
                {
                    name: 'Props iteration',
                    description: <p>
                        In exampleProps array you should defined an item by component you need to test <br />
                        You need to put your component as &apos;component&apos; field and in exampleList you can now defined the name of your actual test and the props object you want to pass to your component
                    </p>,
                    raw: PropsExampleRaw,
                    component: PropsExampleExample,
                },
                {
                    name: 'Standalone test',
                    description: <p>
                        For standalone test things are many different <br />
                        You can pass entire file directly if you need to test more complex things <br />
                        So we will use raw.macro library that permit us to take a snapshot of a component file as string to display it as example <br />
                        When you raw file you need to give the path with the extention type like &apos;.tsx&apos; because we doesn&apos;t import module here but a file  <br />
                    </p>,
                    raw: StandaloneExampleRaw,
                    component: StandaloneExampleExample,
                },
            ]
        },
    ];

    return <NCExamplePage intro={exampleIntro} examples={exampleProps} />;
};
