import * as React from 'react';
import OkonomiPanel from './okonomi-panel';
import './okonomi-rad.less';

const OkonomiRad = () => {
    return (
        <div className="okonomi-rad">
            <OkonomiPanel
                tittelId="okonomi-rad-stotte-arbeidsledig-tittel"
                lenkeTekstId="okonomi-rad-stotte-arbeidsledig-lenke-tekst"
                lenkeUrlId="okonomi-rad-stotte-arbeidsledig-lenke-url"
                renderTittelAsHtml={true}
            />
            <OkonomiPanel
                tittelId="okonomi-rad-nodsituasjon-tittel"
                lenkeTekstId="okonomi-rad-nodsituasjon-lenke-tekst"
                lenkeUrlId="okonomi-rad-nodsituasjon-lenke-url"
                renderTittelAsHtml={true}
            />
            <OkonomiPanel
                tittelId="okonomi-rad-sykepenger-tittel"
                lenkeTekstId="okonomi-rad-sykepenger-lenke-tekst"
                lenkeUrlId="okonomi-rad-sykepenger-lenke-url"
                renderTittelAsHtml={true}
            />
        </div>
    );
};

export default OkonomiRad;