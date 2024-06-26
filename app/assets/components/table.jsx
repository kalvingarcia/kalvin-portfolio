import {Children, createContext, useContext} from "react";
import {tss} from "./themer";

// Table and Row component styles.
const useStyles = tss.withNestedSelectors().create(({theme}) => ({
    table: {
        textAlign: "left",
        "& .column": {
            verticalAlign: "top", // Aligning text to the top by default.
            padding: 10 // Giving cells padding to be more stylish.
        },
        // Giving the rows a seperation border on the bottom, except the last one.
        "& tr": {
            borderBottom: `1pt solid ${theme.primary.container.alpha(0.2).hexa()}`
        },
        "& tbody :last-child": {
            borderBottom: "none"
        },
        // For some reason, the table header refuses to be sticky.
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

/**
 * The Row component is used specifically for the Table component's rows.
 * Just like the HTML `tr` element, the columns are created and formatted
 * automatically.
 *
 * @param props The component takes 2 props:
 *  *   The `className` prop can be used to override styles.
 *  *   The `children` prop is each column of the Row. The children are mapped
 *  *   to the columns automatically.
 *
 * The component automatically passes forward props to the `tr` element.
 *
 * @returns A styled and formatted `tr` jsx element.
 */
export function Row({className, children, ...props}) {
    const {cx, classes} = useStyles({});
    return (
        <tr className={cx(classes.row, className)} {...props}>
            {Children.map(children, (child, index) => <td key={`column-${index}`} className={`column column-${index}`}>{child}</td>)}
        </tr>
    );
}

/**
 * The Table component is used to create a styled table. To make the process
 * simpler than using HTML's `table` element, the header and columns are
 * automatically formatted and given a unique class name for each column,
 * starting from 0. They're also given a shared class name, so that they can
 * be individually styled or styled together.
 *
 * @param props The component takes 3 props:
 *  *   The `className` prop is used to override styles using a class name.
 *  *   The `headers` props is a list given to the Table to generate the
 *      table's header row.
 *  *   The `children` prop is specifically used to give the table Row components.
 *
 * The component passes forward props to the `table` jsx element.
 *
 * @returns A styled and formatted `table` jsx element.
 */
export default function Table({className, headers, children, ...props}) {
    const {cx, classes} = useStyles({});
    return (
        <table className={cx(classes.table, className)} {...props}>
            {headers?
                <thead className={classes.header}>
                    <tr>{headers.map((name, index) => <th key={`column-${index}`} className={`column column-${index}`}>{name}</th>)}</tr>
                </thead>
                : 
                ""
            }
            <tbody>
                {children}
            </tbody>
        </table>
    );
}