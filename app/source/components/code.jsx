"use client"
import {useEffect, useState} from 'react';
import hljs from 'highlight.js'
import {tss} from './themer';

const lightness = {
    background: 10,
    onBackground: 90,
    keyword: 60,
    entity: 70,
    constant: 60,
    string: 60,
    variable: 90,
    comment: 20,
    tag: 50
};

const useStyles = tss.create(({theme}) => ({
    codeContainer: {
        width: "100%",
        overflowX: "scroll",
        padding: 20,
        borderRadius: 20,
        backgroundColor: theme.primary.container.lightness(lightness.background).hex(),
        color: theme.primary.accent.lightness(lightness.onBackground).hex(),
        [`
            & .hljs-doctag,
            & .hljs-keyword,
            & .hljs-meta .hljs-keyword,
            & .hljs-template-tag,
            & .hljs-template-variable,
            & .hljs-type,
            & .hljs-variable.language_ 
        `]: {
            color: theme.primary.accent.lightness(lightness.keyword).hex(),
        },
        [`
            & .hljs-title,
            & .hljs-title.class_,
            & .hljs-title.class_.inherited__,
            & .hljs-title.function_ 
        `]: {
            color: theme.secondary.accent.lightness(lightness.entity).hex(),
        },
        [`
            .hljs-attr,
            .hljs-attribute,
            .hljs-literal,
            .hljs-meta,
            .hljs-number,
            .hljs-operator,
            .hljs-variable,
            .hljs-selector-attr,
            .hljs-selector-class,
            .hljs-selector-id
        `]: {
            color: theme.secondary.accent.lightness(lightness.constant).hex(),
        },
        [`
            & .hljs-regexp,
            & .hljs-string,
            & .hljs-meta .hljs-string
        `]: {
            color: theme.tertiary.accent.lightness(lightness.string).hex(),
        },
        [`
            & .hljs-built_in,
            & .hljs-symbol
        `]: {
            color: theme.tertiary.accent.lightness(lightness.variable).hex(),
        },
        [`
            & .hljs-comment
        `]: {
            color: theme.primary.accent.lightness(lightness.comment).hex(),
        },
        [`
            & .hljs-subst,
            & .hljs-punctuation
        `]: {
            color: theme.tertiary.accent.lightness(lightness.comment).hex(),
        }
    }
}));

export default function Code({className, language, children}) {
    const [code, setCode] = useState(undefined);
    useEffect(() => {
        if(code)
            code.innerHTML = hljs.highlight(children, {language}).value;
    }, [code]);

    const {cx, classes} = useStyles();
    return (
        <pre className={cx(classes.codeContainer, className)}>
            <code ref={element => setCode(element)} />
        </pre>
    )
}