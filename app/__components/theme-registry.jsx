'use client';
import createCache from '@emotion/cache';
import {useServerInsertedHTML} from 'next/navigation';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * 
 */
export default function ThemeRegistry(props) {
    const {theme, options, children} = props;

    const [{cache, flush}] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted = [];

        cache.insert = (...args) => {
            const serialized = args[1];
            if(cache.inserted[serialized.name] === undefined)
                inserted.push(serialized.name);

            return prevInsert(...args);
        };

        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };

        return {cache, flush};
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if(names.length === 0)
            return null;

        let styles = '';
        for(const name of names)
            styles += cache.inserted[name];

        return <style ket={cache.key} data-emotion={`${cache.key} ${names.join(' ')}`} dangerouslySetInnerHTML={{__html: styles}} />;
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}