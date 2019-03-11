import * as React from 'react';
import OkonomiPanel from './okonomi-panel';
import './okonomi-rad.less';

import dagpengerBilde from './dagpenger.svg';
import nyRettTilSykepengerBilde from './ny-rett-til-sykepenger.svg';
import okonomiskSosialhjelpBilde from './okonomisk-sosialhjelp.svg';

const OkonomiRad = () => {
    return (
        <div className="okonomi-rad">
            <OkonomiPanel
                tittelId="okonomi-rad-stotte-arbeidsledig-tittel"
                lenkeTekstId="okonomi-rad-stotte-arbeidsledig-lenke-tekst"
                lenkeUrlId="okonomi-rad-stotte-arbeidsledig-lenke-url"
                bilde={dagpengerBilde}
            />
            <OkonomiPanel
                tittelId="okonomi-rad-nodsituasjon-tittel"
                lenkeTekstId="okonomi-rad-nodsituasjon-lenke-tekst"
                lenkeUrlId="okonomi-rad-nodsituasjon-lenke-url"
                bilde={okonomiskSosialhjelpBilde}
            />
            <OkonomiPanel
                tittelId="okonomi-rad-sykepenger-tittel"
                lenkeTekstId="okonomi-rad-sykepenger-lenke-tekst"
                lenkeUrlId="okonomi-rad-sykepenger-lenke-url"
                bilde={nyRettTilSykepengerBilde}
            />
        </div>
    );
};

export default OkonomiRad;
