import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Tjeneste from './tjeneste';
import { Innholdstittel } from 'nav-frontend-typografi';

function Tjenester() {
    return (
        <div className="tjenester__wrapper" >
            <Innholdstittel className="blokk-l overskrift-tjenester">
                <FormattedMessage id="overskrift-tjenester"/>
            </Innholdstittel>
            <Tjeneste
                lenkeId="lenke-bli-bedre"
                tekstId="beskrivelse-tjenester-bli-bedre"
            />
            <Tjeneste
                lenkeId="lenke-muligheter"
                tekstId="beskrivelse-tjenester-muligheter"
            />
            <Tjeneste
                lenkeId="lenke-dagpenger"
                tekstId="beskrivelse-tjenester-dagpenger"
            />
        </div >
    );
}

export default Tjenester;