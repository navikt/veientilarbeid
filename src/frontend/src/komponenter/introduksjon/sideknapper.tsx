import * as React from 'react';
import Sideknapp from "./sideknapp";

interface Props {
    antallKnapper: number;
    gjeldendeKnapp: number;
}

export default function Sideknapper({antallKnapper, gjeldendeKnapp}: Props) {
    let knapper = [];
    for (let i = 0; i < antallKnapper; i++) {
        knapper.push(
            <Sideknapp onClick={() => null} erGjeldende={i === gjeldendeKnapp} key={i}/>
        );
    }

    return (
        <div className="overlay__sideknapper">
            {...knapper}
        </div>
    );
}