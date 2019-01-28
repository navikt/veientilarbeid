import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import './stilling-sok.less';
import { Panel } from 'nav-frontend-paneler';

// export const STILLINGSOK_URL = 'https://stillingsok.nav.no'; // tslint:disable-line

class StillingSok extends React.Component {
    render() {
        return (
            <Panel className="stilling-sok">
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="mia-overskrift" />
                </Innholdstittel>
                <Input label='123abc'/>

            </Panel>
        );
    }
}

export default StillingSok;