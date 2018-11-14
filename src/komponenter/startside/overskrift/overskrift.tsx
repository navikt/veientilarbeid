import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../../brodsmuler/brodsmuler';

import './overskrift.less';

interface OwnProps {
    sideTittelId: string;
}

function Overskrift({sideTittelId}: OwnProps) {
    return (
        <div className="overskrift-veientilarbeid-container">
            <div className="overskrift-veientilarbeid">
                <Brodsmuler tittelId={sideTittelId}/>
                <Sidetittel className="overskrift-veientilarbeid__tittel">
                    <FormattedMessage id={sideTittelId}/>
                </Sidetittel>
            </div>
        </div>
    );
}

export default Overskrift;
