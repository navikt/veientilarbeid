import * as React from 'react';
import { seVeientilarbeidNiva3 } from '../metrics/metrics';
import './innhold.less';
import InnholdView from './innhold-view';
import getPoaGroup from '../utils/get-poa-group'

const generertPoaGruppe = getPoaGroup({
    dinSituasjon: 'MISTET_JOBBEN',
    innsatsgruppe: 'STANDARD_INNSATS',
    formidlingsgruppe: 'ARBS',
    alder: 32,
    servicegruppe: 'IVURD',
    opprettetRegistreringDato: new Date('2020-01-13')
})

const amplitudeAktivitetsData = {
    gruppe: generertPoaGruppe,
    geografiskTilknytning: 'INGEN_VERDI',
    isKSSX: 'nei',
    isKSSK: 'nei',
    ukerRegistrert: 0
}

const InnholdLogikkNiva3 = () => {

    React.useEffect(() => {
        seVeientilarbeidNiva3();
    }, []);

    return (
        <InnholdView
            erSykmeldtMedArbeidsgiver={false}
            skalViseKrrMelding={false}
            skalViseEgenvurderingLenke={false}
            visRessurslenker={true}
            skalViseMotestotteLenke={false}
            skalViseIARBSPlaster={false}
            skalViseRegistrert={false}
            erPermittert={false}
            erPermittertEllerEndret={false}
            amplitudeAktivitetsData={amplitudeAktivitetsData}
        />
    );
};

export default InnholdLogikkNiva3;
