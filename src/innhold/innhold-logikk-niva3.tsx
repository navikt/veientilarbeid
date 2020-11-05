import * as React from 'react';
import { seVeientilarbeidNiva3 } from '../metrics/metrics';
import './innhold.less';
import InnholdView from './innhold-view';

const InnholdLogikkNiva3 = () => {
    React.useEffect(() => {
        seVeientilarbeidNiva3();
    }, []);

    return (
        <InnholdView
            erSykmeldtMedArbeidsgiver={false}
            skalViseEgenvurderingLenke={false}
            visRessurslenker={true}
            skalViseMotestotteLenke={false}
            skalViseIARBSPlaster={false}
            erPermittert={false}
            erPermittertEllerEndret={false}
        />
    );
};

export default InnholdLogikkNiva3;
