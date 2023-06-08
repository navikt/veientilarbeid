import { Panel } from '@navikt/ds-react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBesvarelse } from '../../contexts/besvarelse';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import EndreSituasjon from '../endre-situasjon/min-situasjon';
import { visBesvarelser } from '../../lib/vis-besvarelse';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

function MinSituasjon(props: any) {
    const registreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const { besvarelse } = useBesvarelse();
    const oppfolgingData = useOppfolgingData();

    const beregnedeArbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { aktivPeriodeStart } = beregnedeArbeidssokerperioder;
    const { opprettetDato, manueltRegistrertAv } = registreringData?.registrering || {};
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;

    const visEndreSituasjon = visBesvarelser({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
        besvarelseData: besvarelse,
        arbeidssokerPeriodeData: beregnedeArbeidssokerperioder,
    });

    if (!kanViseKomponent) return null;

    if (visEndreSituasjon) {
        return <EndreSituasjon />;
    }

    return (
        <Panel className={`${flexStyles.flex}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                    width: '24px',
                }}
            ></span>
            <div className={spacingStyles.fullWidth}>
                <Sammendrag
                    startDato={opprettetDato || aktivPeriodeStart}
                    manueltRegistrertAv={manueltRegistrertAv}
                    amplitudeData={amplitudeData}
                />
                <InnsynLesMer />
            </div>
        </Panel>
    );
}

export default MinSituasjon;
