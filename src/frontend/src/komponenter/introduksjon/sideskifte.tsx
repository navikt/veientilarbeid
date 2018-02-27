import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';

interface Props {
    onClick: () => {};
    skalVises: boolean;
    synkende?: boolean;
}

export default function Sideskifte({onClick, skalVises, synkende = false}: Props) {
    const type = synkende ? 'venstre' : 'høyre';
    const sideskifteKnapp = skalVises ? (
        <button className="overlay__button" onClick={() => onClick()}>
            <NavFrontendChevron type={type} stor={true}/>
        </button>
    ) : (null);

    return (
        <div className="overlay__sideskifte">
            {sideskifteKnapp}
        </div>
    );
}