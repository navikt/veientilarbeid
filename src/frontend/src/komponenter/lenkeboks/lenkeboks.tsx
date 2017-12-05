import * as React from 'react';

interface Props {
    children: {};
    href: string;
}

function Leneboks({children, href}: Props) {
    return (
        <a href={href} className="lenkeboks">
            {children}
            <span className="lenkeboks__indikator"/>
        </a>
    );
}

export default Leneboks;