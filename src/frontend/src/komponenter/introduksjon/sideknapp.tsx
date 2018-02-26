import * as React from 'react';

interface Props {
    onClick: () => any;
    erGjeldende: boolean;
}

export default function Sideknapp({onClick, erGjeldende}: Props) {
    const className = erGjeldende ? 'overlay__icon-circle-filled' : 'overlay__icon-circle-line';
    return (
        <button className='overlay__button'>
            <span className={className}/>
        </button>
    );
}