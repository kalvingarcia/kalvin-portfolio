import Markdown from "react-markdown";
import {Display, Title, Subtitle, Heading, Subheading, Body, Label} from "./typography";
import Image from "next/image";

export default function Remark({children}) {
    return (
        <Markdown components={{
            h1({children}) {
                return <Display>{children}</Display>;
            },
            h2({children}) {
                return <Title>{children}</Title>;
            },
            h3({children}) {
                return <Subtitle>{children}</Subtitle>;
            },
            h4({children}) {
                return <Heading>{children}</Heading>;
            },
            h5({children}) {
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