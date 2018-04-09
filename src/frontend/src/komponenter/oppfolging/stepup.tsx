import * as React from 'react';
import Feilmelding from '../feilmeldinger/feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { VEILARBSTEPUP } from '../../ducks/api';
import { FormattedMessage } from 'react-intl';
import Knapperad from '../knapper/knapperad';

function StepUp() {
    return (
        <div className="stepup">
            <Feilmelding tekstId="stepup-melding" type="info"/>

            <Knapperad>
                <KnappBase type="hoved" onClick={() => document.location.href = VEILARBSTEPUP}>
                    <Normaltekst><FormattedMessage id="knapp-logg-inn"/></Normaltekst>
                </KnappBase>
            </Knapperad>
        </div>
    );
}

export default StepUp;
