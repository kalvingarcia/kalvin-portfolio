import * as React from 'react';
import timelines from './timeline-data.json';

/**
 * 
 *
 */
export default function ProjectTimeline() {

    const generateTimeline = React.useMemo(group => {

    }, []);

    return (
        <main className='project-timeline-page'>

            {generateTimeline(group)}
        </main>
    );
}