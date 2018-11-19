import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../../brodsmuler/brodsmuler';

interface OwnProps {
    tittelId: string;
}

function Overskrift({tittelId}: OwnProps) {
    return (
        <div className="overskrift-veientilarbeid-container">
            <div className="overskrift-veientilarbeid">
                <Brodsmuler tittelId="overskrift-oppfolging"/>
                <Sidetittel className="overskrift-veientilarbeid__tittel">
                    <FormattedMessage id={tittelId}/>
                </Sidetittel>
            </div>
        </div>
    );
}

export default Overskrift;
