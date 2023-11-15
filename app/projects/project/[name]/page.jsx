'use client';
import * as React from 'react';
import {usePathname} from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Card, CardContent, Typography} from '@mui/material';

import SyntaxHighlighter from './__components/syntax-highlighter';

import pages from '../page-data.json';

const MUI_MAPPING = {
    h1: props => {
        const {node, ...rest} = props;
        return <Typography variant='h1' {...rest} />;
    },
    h2: props => {
        const {node, ...rest} = props;
        return <Typography variant='h2' {...rest} />;
    },
    h3: props => {
        const {node, ...rest} = props;
        return <Typography variant='h3' {...rest} />;
    },
    h4: props => {
        const {node, ...rest} = props;
        return <Typography variant='h4' {...rest} />;
    },
    p: props => {
        const {node, ...rest} = props;
        return <Typography variant='body' component="p" {...rest} />;
    },
    code: props => {
        const {node, className, ...rest} = props;
        const match = /language-(\w+)/.exec(className || '');
        return <SyntaxHighlighter language={match? match[0] : undefined} {...rest} />;
    },
    pre: props => {
        const {node, children, ...rest} = props;
        return (
            <Card {...rest}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        );
    },
    img: props => {
        const {node, src, alt, ...rest} = props;
        return <Image />
    },
}

// export async function generateMetadata() {
//     const router = useRouter();
//     const page = pages[router.query.name];

//     return {
//         title: `Kalvin's Portfolio - ${page.title}`,
//         description: page.description,
//     }
// }

export default function ProjectPage() {
    const page = pages[usePathname().split("/").pop()];

    const [markdown, setMarkdown] = React.useState("");
    React.useEffect(() => {
        (async () => {
            setMarkdown((await import(`../page-templates/${page.template}`)).default);
        })();
    }, []);

    return (
        <main className='project-page'>
            <Markdown remarkPlugins={[remarkGfm]} components={MUI_MAPPING}>
                {markdown}
            </Markdown>
        </main>
    );
}