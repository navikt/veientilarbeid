import * as React from 'react';

interface Props {
    onClick: () => any;
    erGjeldende: boolean;
}

export default function Sideknapp({onClick, erGjeldende}: Props) {
    const className = erGjeldende ? 'icon-circle-filled' : 'icon-circle-line';
    return (
        <span className={className}/>
    );
}