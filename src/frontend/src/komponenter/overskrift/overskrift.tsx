import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';

function Overskrift() {
    return (
        <div className="overskrift-veientilarbeid__wrapper">
            <Sidetittel><FormattedMessage id="overskrift-veientilarbeid"/></Sidetittel>
            <div><FormattedMessage id="beskrivelse-veientilarbeid"/></div>
        </div>
    );
}

export default Overskrift;