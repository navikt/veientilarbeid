import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Oppgave from './oppgave';

function Overskrifter() {
    return (
        <div className="oppgaver__wrapper blokk-xl">
            <Innholdstittel className="blokk-l overskrift-oppgaver">
                <FormattedMessage id="overskrift-oppgaver"/>
            </Innholdstittel>
                <Oppgave
                    tittelId="overskrift-lenke-jobbsokerkompetanse"
                    beskrivelseId="beskrivelse-lenke-jobbsokerkompetanse"
                    lenkeId="lenke-din-jobbsokerkompetanse"
                />
                <Oppgave
                    tittelId="overskrift-lenke-cv"
                    beskrivelseId="beskrivelse-lenke-cv"
                    lenkeId="lenke-fyll-ut-cv"
                />
                <Oppgave
                    tittelId="overskrift-lenke-aktivitetsplan"
                    beskrivelseId="beskrivelse-lenke-aktivitetsplan"
                    lenkeId="lenke-aktivitetsplan"
                />
        </div>
    );
}

export default Overskrifter;