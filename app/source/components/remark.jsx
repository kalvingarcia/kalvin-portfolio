import Image from "next/image";
import Markdown from "react-markdown";
import {Title, Subtitle, Heading, Subheading, Body, Label} from "./typography";

export default function Remark({children}) {
    return (
        <Markdown components={{
            h1({children}) {
                return <Title>{children}</Title>;
            },
            h2({children}) {
                return <Subtitle>{children}</Subtitle>;
            },
            h3({children}) {
                return <Heading>{children}</Heading>;
            },
            h4({children}) {
                return <Subheading>{children}</Subheading>;
            },
            p({children}) {
                return <Body>{children}</Body>;
            },
            code({children}) {
                return ""
            },
            img({src, alt}) {
                return src? <Image src={src} alt={alt} width={200} height={200} /> : "";
            },
        }}>
            {children}
        </Markdown>
    );
}