import * as React from 'react';
import './ressurslenker-jobbsok.less';
import StillingSok from './stillingsok';
import CV from './cv';
import Mia from './mia';
import Jobbsokertips from './jobbsokertips';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

class RessurslenkerJobbsok extends React.Component {
    render () {
        return (
            <section className="ressurslenker-jobbsok blokk-xl">
                <div className="limit">
                    <Systemtittel tag="h2" className="ressurslenker__heading blokk-m">
                        <FormattedMessage id="ressurslenker-jobbsok-overskrift"/>
                    </Systemtittel>

                    <div className="paneler">
                        <StillingSok/>
                        <CV/>
                        <Mia/>
                        <Jobbsokertips/>
                    </div>
                </div>
            </section>
        );
    }
}

export default RessurslenkerJobbsok;
