import * as React from 'react';
import './ressurslenker-jobbsok.less';
import Stillingsok from './stillingsok';
import CV from './cv';
import Jobbsokertips from './jobbsokertips';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const RessurslenkerJobbsok = (props: AmplitudeAktivitetsProps) => {
    const { amplitudeAktivitetsData } = props;
    
    return (
        <section className="ressurslenker">
            <Systemtittel tag="h2" className="ressurslenker__heading blokk-s">
                {tekster['ressurslenker-jobbsok-overskrift']}
            </Systemtittel>

            <div className="tokol">
                <Stillingsok amplitudeAktivitetsData={amplitudeAktivitetsData} />
                <CV amplitudeAktivitetsData={amplitudeAktivitetsData} />
            </div>
            <div className="tokol">
                <Jobbsokertips amplitudeAktivitetsData={amplitudeAktivitetsData} />
            </div>
        </section>
    );
}

export default RessurslenkerJobbsok;
