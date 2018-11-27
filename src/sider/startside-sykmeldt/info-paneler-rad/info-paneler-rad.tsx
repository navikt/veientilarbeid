import * as React from 'react';
import './info-paneler-rad.less';
import InfoPanel from './info-panel';
import sykefravaerBilde from './sykefravaer.svg';
import hjelpTilJobbBilde from './hjelp-til-jobb.svg';

const InfoPanelerRad: React.SFC = () => {

    return (
        <div className="info-paneler-rad">
            <InfoPanel
                tittelId="info-paneler-rad-hjelp-til-jobb-tittel"
                tekstId="info-paneler-rad-hjelp-til-jobb-tekst"
                lenkeTekstId="info-paneler-rad-hjelp-til-jobb-lenke-tekst"
                lenkeUrlId="info-paneler-rad-hjelp-til-jobb-lenke-url"
                bilde={hjelpTilJobbBilde}
            />
            <InfoPanel
                tittelId="info-paneler-rad-ditt-sykefravaer-tittel"
                tekstId="info-paneler-rad-ditt-sykefravaer-tekst"
                lenkeTekstId="info-paneler-rad-ditt-sykefravaer-lenke-tekst"
                lenkeUrlId="info-paneler-rad-ditt-sykefravaer-lenke-url"
                bilde={sykefravaerBilde}
            />
        </div>
    );
};

export default InfoPanelerRad;