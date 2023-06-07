import { Panel } from '@navikt/ds-react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { DinSituasjonSvar, useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import EndreSituasjon from '../endre-situasjon/min-situasjon';

import spacingStyles from '../../spacing.module.css';

function MinSituasjon(props: any) {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();

    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv } = brukerregistreringData?.registrering || {};
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;

    const erPermitert =
        brukerregistreringData?.registrering?.besvarelse.dinSituasjon === DinSituasjonSvar.ER_PERMITTERT;
    const featureToggles = useFeatureToggleData();
    const brukTabsDemo = featureToggles['aia.bruk-tabs-demo'];
    const visEndreSituasjon = brukTabsDemo && erPermitert;

    if (!kanViseKomponent) return null;

    if (visEndreSituasjon) {
        return <EndreSituasjon />;
    }

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
