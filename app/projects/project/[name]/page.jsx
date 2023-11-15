import * as React from 'react';
import pages from './page-data.json';

export default function ProjectPage() {

    const generatePage = React.useMemo(name => {
        template = import(`./page-templates/${name}.kal`);
    }, [])

    return (
        <main className='project-page'>
            {generatePage(name)}
        </main>
    );
}