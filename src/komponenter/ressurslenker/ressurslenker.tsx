import * as React from 'react';
import BliBedreJobbsoker from './bli-bedre-jobbsoker';
import HvordanSokeJobber from './hvordan-soke-jobber';
import MuligheterIArbeidsmarkedet from './muligheter-i-arbeidsmarkedet';
import Meldekort from './meldekort';

export default function Ressurslenker() {
    // TODO I overskrift-blibedrejobbsoker brukes det nobreakspace implisitt. Burde bruke &nbsp; i alle
    // TODO mellomrom etter tankestreken.
    return (
        <div className="ressurslenker__container">
            <div className="ressurslenker">
                <Meldekort />
                <MuligheterIArbeidsmarkedet />
                <HvordanSokeJobber />
                <BliBedreJobbsoker />
            </div>
        </div>
    );
}