import { Panel } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

import spacingStyles from '../../spacing.module.css';

/*
const situasjon = {
    MISTET_JOBBEN: 'Har mistet eller kommer til å miste jobben',
    ALDRI_HATT_JOBB: 'Har aldri vært i jobb',
    HAR_SAGT_OPP: 'Har sagt opp eller kommer til å si opp',
    VIL_BYTTE_JOBB: 'Har jobb, men vil bytte',
    ER_PERMITTERT: 'Er permittert eller kommer til å bli permittert',
    USIKKER_JOBBSITUASJON: 'Er usikker på jobbsituasjonen min',
    JOBB_OVER_2_AAR: 'Har ikke vært i jobb de siste 2 årene',
    VIL_FORTSETTE_I_JOBB: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    AKKURAT_FULLFORT_UTDANNING: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    DELTIDSJOBB_VIL_MER: 'Har deltidsjobb, men vil jobbe mer',
    DEFAULT: 'Min arbeidssøkersituasjon',
};
*/

function MinSituasjon(props: any) {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();

    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv } = brukerregistreringData?.registrering || {};
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;

    if (!kanViseKomponent) return null;

    return (
        <Panel className={`${spacingStyles.ml2_39} ${spacingStyles.mtn1_5}`}>
            <Sammendrag
                startDato={opprettetDato || aktivPeriodeStart}
                manueltRegistrertAv={manueltRegistrertAv}
                amplitudeData={amplitudeData}
            />
            <InnsynLesMer />
        </Panel>
    );
}

export default MinSituasjon;
