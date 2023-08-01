import { Panel } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useBesvarelse } from '../../contexts/besvarelse';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import BesvarelseLesMer from '../innsyn/besvarelse-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import AiAInViewport from '../aia-in-viewport/aia-in-viewport';
import ErRendret from '../er-rendret/er-rendret';

function MinSituasjon(props: any) {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();
    const { besvarelse } = useBesvarelse();
    const besvarelseData = besvarelse ? besvarelse.besvarelse : null;

    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv } = brukerregistreringData?.registrering || {};
    const { endretTidspunkt, endretAv, erBesvarelsenEndret } = besvarelse || {};
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;

    const endretStyle = erBesvarelsenEndret ? { background: 'var(--a-blue-50)' } : {};

    if (!kanViseKomponent) return null;
    console.log('amplitudeData: ', amplitudeData.endretSituasjon);

    return (
        <Panel style={{ paddingLeft: 0, paddingTop: 0, paddingRight: 0 }}>
            <ErRendret loggTekst="Rendrer endring av situasjon" />
            <Panel style={endretStyle}>
                <Sammendrag
                    startDato={opprettetDato || aktivPeriodeStart}
                    manueltRegistrertAv={manueltRegistrertAv}
                    amplitudeData={amplitudeData}
                    besvarelse={besvarelseData}
                    endretTidspunkt={endretTidspunkt}
                    endretAv={endretAv}
                    erBesvarelsenEndret={erBesvarelsenEndret}
                />
                <BesvarelseLesMer />
            </Panel>
            <AiAInViewport loggTekst="Viser endring av situasjon" />
        </Panel>
    );
}

export default MinSituasjon;
