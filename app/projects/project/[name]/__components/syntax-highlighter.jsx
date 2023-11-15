'use client';
import * as React from 'react';
import {styled} from '@mui/system';

const Code = styled('code')(({theme}) => ({
    "&.prettyprint": {
        font: theme.typography.code
    },
    "& .str": {color: theme.palette.code.string},
    "& .kwd": {color: theme.palette.code.keyword, fontWeight: "bold"},
    "& .com": {color: theme.palette.code.comment},
    "& .typ": {color: theme.palette.code.type},
    "& .lit": {color: theme.palette.code.literal},
    "& .pun": {color: theme.palette.code.punctuation},
    "& .pln": {color: theme.palette.code.plaintext},
    "& .tag": {color: theme.palette.code.tag, fontWeight: "bold"},
    "& .atn": {color: theme.palette.code.attribute_name, fontWeight: "bold"},
    "& .atv": {color: theme.palette.code.attribute_value},
    "& .dec": {color: theme.palette.code.decimal}
}));

export default function SyntaxHighlighter({className, language, children}) {
    return (
        <Code className={`${className? className + " " : ""}prettyprint${language? " " + language : ""}`}>{children}</Code>
    );
}