import * as React from 'react';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';
import Ressurslenker from '../ressurslenker/ressurslenker';
import Dagpenger from '../informasjonsmoduler/dagpenger/dagpenger';
import Meldekort from '../meldekort/meldekort';
import ReaktiveringMelding from '../reaktivering-melding/reaktivering-melding';

function Innhold() {
    return (
        <div className="innhold__wrapper">
            <div className="innhold">
                <ReaktiveringMelding/>
                <Aktivitetsplan/>
                <Meldekort/>
                <Ressurslenker/>
                <Dagpenger/>
            </div>
        </div>
    );
}

export default Innhold;