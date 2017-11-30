import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Tjeneste from './tjeneste';

function Tjenester() {
    return (
        <div className="tjenester__wrapper" >
            <div className="overskrift-tjenester"><FormattedMessage id="overskrift-tjenester"/></div>
            <Tjeneste
                lenkeId="lenke-bli-bedre"
                tekstId="beskrivelse-tjenester-bli-bedre"
                className="col-md-4"
            />
            <Tjeneste
                lenkeId="lenke-muligheter"
                tekstId="beskrivelse-tjenester-muligheter"
                className="col-md-4"
            />
            <Tjeneste
                lenkeId="lenke-dagpenger"
                tekstId="beskrivelse-tjenester-dagpenger"
                className="col-md-4"
            />
        </div >
    );
}

export default Tjenester;