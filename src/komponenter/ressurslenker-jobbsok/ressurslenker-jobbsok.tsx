import * as React from 'react';
import './ressurslenker-jobbsok.less';
import Stillingsok from './stillingsok';
import CV from './cv';
import Mia from './mia';
import Jobbsokertips from './jobbsokertips';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';

class RessurslenkerJobbsok extends React.Component {
    render() {
        return (
            <section className="ressurslenker">
                <Systemtittel tag="h2" className="ressurslenker__heading blokk-m">
                    {tekster['ressurslenker-jobbsok-overskrift']}
                </Systemtittel>

                <div className="tokol">
                    <Stillingsok/>
                    <CV/>
                </div>
                <div className="tokol">
                    <Mia/>
                    <Jobbsokertips/>
                </div>
            </section>
        );
    }
}

export default RessurslenkerJobbsok;
