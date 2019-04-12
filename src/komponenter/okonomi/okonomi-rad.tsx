import * as React from 'react';
import OkonomiPanel from './okonomi-panel';
import './okonomi-rad.less';

import DagpengerBilde from './dagpenger';
import NyRettTilSykepengerBilde from './ny-rett-til-sykepenger';
import OkonomiskSosialhjelpBilde from './okonomisk-sosialhjelp';

const OkonomiRad = () => {
    return (
        <div className="okonomi-rad">
            <OkonomiPanel
                tittelId="okonomi-rad-stotte-arbeidsledig-tittel"
                lenkeTekstId="okonomi-rad-stotte-arbeidsledig-lenke-tekst"
                lenkeUrlId="okonomi-rad-stotte-arbeidsledig-lenke-url"
            >
                <DagpengerBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-nodsituasjon-tittel"
                lenkeTekstId="okonomi-rad-nodsituasjon-lenke-tekst"
                lenkeUrlId="okonomi-rad-nodsituasjon-lenke-url"
            >
                <OkonomiskSosialhjelpBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-sykepenger-tittel"
                lenkeTekstId="okonomi-rad-sykepenger-lenke-tekst"
                lenkeUrlId="okonomi-rad-sykepenger-lenke-url"
            >
                <NyRettTilSykepengerBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
        </div>
    );
};

export default OkonomiRad;
