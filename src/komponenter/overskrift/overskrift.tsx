import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';

function Overskrift() {
    return (
        <div className="overskrift-veientilarbeid-container">
            <div className="overskrift-veientilarbeid">
                <Brodsmuler/>
                <Sidetittel className="overskrift-veientilarbeid__tittel">
                    <FormattedMessage id="overskrift-veientilarbeid"/>
                </Sidetittel>
            </div>
        </div>
    );
}

export default Overskrift;