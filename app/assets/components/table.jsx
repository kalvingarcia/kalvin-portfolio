import { Children, createContext, useContext } from "react";
import { tss } from "./themer";

const useStyles = tss.withNestedSelectors().create(({theme}) => ({
    table: {
        textAlign: "left",
        "& .column": {
            verticalAlign: "top",
            padding: 10
        },
        "& tr": {
            borderBottom: `1pt solid ${theme.primary.container.alpha(0.2).hexa()}`
        },
        "& tbody :last-child": {
            borderBottom: "none"
        },
        "& thead": {
            position: "sticky",
            top: 0
        }
    },
    header: {
        fontWeight: "bold",
        color: theme.secondary.accent.hex()
    },
    row: {
        position: "relative"
    }
}));

export function Row({className, children, ...props}) {
    const {cx, classes} = useStyles({});
    return (
        <tr className={cx(classes.row, className)} {...props}>
            {Children.map(children, (child, index) => <td key={`column-${index}`} className={`column column-${index}`}>{child}</td>)}
        </tr>
    );
}

export default function Table({className, headers, children, ...props}) {
    const {cx, classes} = useStyles({});
    return (
        <table className={cx(classes.table, className)} {...props}>
            <thead className={classes.header}>
                <tr>{headers.map((name, index) => <th key={`column-${index}`} className={`column column-${index}`}>{name}</th>)}</tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    );
}