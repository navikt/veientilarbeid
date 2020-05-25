import * as React from 'react';
import './ressurslenker-jobbsok.less';
import Stillingsok from './stillingsok';
import CV from './cv';
import Jobbsokertips from './jobbsokertips';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
}

const RessurslenkerJobbsok = (props: OwnProps) => {
    const { poaGruppe } = props;
    
    return (
        <section className="ressurslenker">
            <Systemtittel tag="h2" className="ressurslenker__heading blokk-s">
                {tekster['ressurslenker-jobbsok-overskrift']}
            </Systemtittel>

            <div className="tokol">
                <Stillingsok poaGruppe={poaGruppe} />
                <CV poaGruppe={poaGruppe} />
            </div>
            <div className="tokol">
                <Jobbsokertips poaGruppe={poaGruppe} />
            </div>
        </section>
    );
}

export default RessurslenkerJobbsok;
