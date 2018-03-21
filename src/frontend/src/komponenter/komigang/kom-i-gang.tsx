import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { FormattedMessage } from 'react-intl';

function Komigang() {
    return (
        <div className="kom-i-gang__wrapper">
            <Panel className="overskrift-komigang__panel blokk-xl">
                <div>
                    <Innholdstittel className="blokk-l overskrift-kom-i-gang">
                        <FormattedMessage id="overskrift-komigang"/>
                    </Innholdstittel>
                    <div className="beskrivelse-komigang blokk-s">
                        <FormattedMessage id="beskrivelse-komigang"/>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default Komigang;