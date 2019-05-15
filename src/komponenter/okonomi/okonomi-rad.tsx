import * as React from 'react';
import OkonomiPanel from './okonomi-panel';
import './okonomi-rad.less';

import DagpengerBilde from './dagpenger';
import NyRettTilSykepengerBilde from './ny-rett-til-sykepenger';
import OkonomiskSosialhjelpBilde from './okonomisk-sosialhjelp';
import lenker from '../../innhold/lenker';

const OkonomiRad = () => {
    return (
        <div className="okonomi-rad">
            <OkonomiPanel
                tittelId="okonomi-rad-stotte-arbeidsledig-tittel"
                lenkeTekstId="okonomi-rad-stotte-arbeidsledig-lenke-tekst"
                lenkeUrl={lenker.dagpenger_lesmer}
            >
                <DagpengerBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-nodsituasjon-tittel"
                lenkeTekstId="okonomi-rad-nodsituasjon-lenke-tekst"
                lenkeUrl={lenker.sosialhjelp}
            >
                <OkonomiskSosialhjelpBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-sykepenger-tittel"
                lenkeTekstId="okonomi-rad-sykepenger-lenke-tekst"
                lenkeUrl={lenker.sykepenger}
            >
                <NyRettTilSykepengerBilde className="okonomi-panel--bilde blokk-s"/>
            </OkonomiPanel>
        </div>
    );
};

export default OkonomiRad;
