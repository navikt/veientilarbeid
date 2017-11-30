import * as React from 'react';
import Oppgave from './oppgave';

function Overskrifter() {
    return (
        <div className="oppgaver__wrapper row blokk-xl">
            <Oppgave
                tittelId="overskrift-lenke-jobbsokerkompetanse"
                beskrivelseId="beskrivelse-lenke-jobbsokerkompetanse"
                lenkeId="lenke-din-jobbsokerkompetanse"
                className="jobbsokerkompetanse-lenke col-md-4"
            />
            <Oppgave
                tittelId="overskrift-lenke-jobbsokerkompetanse"
                beskrivelseId="beskrivelse-lenke-jobbsokerkompetanse"
                lenkeId="lenke-din-jobbsokerkompetanse"
                className="jobbsokerkompetanse-lenke col-md-4"
            />
            <Oppgave
                tittelId="overskrift-lenke-jobbsokerkompetanse"
                beskrivelseId="beskrivelse-lenke-jobbsokerkompetanse"
                lenkeId="lenke-din-jobbsokerkompetanse"
                className="jobbsokerkompetanse-lenke col-md-4"
            />
        </div>
    );
}

export default Overskrifter;