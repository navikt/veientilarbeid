import * as React from 'react';

interface Props {
    antallKnapper: number;
    gjeldendeKnapp: number;
}

export default function Sideknapper({antallKnapper, gjeldendeKnapp}: Props) {
    let knapper = [];
    let erGjeldende: boolean;
    for (let i = 0; i < antallKnapper; i++) {
        erGjeldende = i === gjeldendeKnapp;
        knapper.push((
            <span className="overlay__button" key={i}>
                <span className={erGjeldende ? 'overlay__icon-circle-filled' : 'overlay__icon-circle-line'}/>
            </span>
        ));
    }

    return (
        <div className="overlay__sideknapper">
            {...knapper}
        </div>
    );
}