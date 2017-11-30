import * as React from 'react';
import { FormattedMessage } from 'react-intl';

function Overskrift() {
    return (
        <div>
            <div className="overskrift-veientilarbeid__wrapper blokk-m">
                <h1 className="typo-innholdstittel"><FormattedMessage id="overskrift-veientilarbeid"/></h1>
                <div><FormattedMessage id="beskrivelse-veientilarbeid"/></div>
            </div>
            <div className="overskrift-komigang__wrapper blokk-xl">
                <h1><FormattedMessage id="overskrift-komigang"/></h1>
                <div className="beskrivelse-komigang"><FormattedMessage id="beskrivelse-komigang"/></div>
            </div>
        </div>
    );
}

export default Overskrift;