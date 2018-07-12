import * as React from 'react';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';
import Ressurslenker from '../ressurslenker/ressurslenker';
import Dagpenger from '../informasjonsmoduler/dagpenger/dagpenger';
import Meldekort from '../meldekort/meldekort';

function Innhold() {
    return (
        <div className="innhold__wrapper">
            <div className="innhold">
                <Aktivitetsplan/>
                <Meldekort/>
                <Ressurslenker/>
                <Dagpenger/>
            </div>
        </div>
    );
}

export default Innhold;