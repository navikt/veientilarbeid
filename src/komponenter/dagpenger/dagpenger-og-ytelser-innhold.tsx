import React from 'react';
import { BankNoteIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useSWRImmutable } from '../../hooks/useSWR';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

import { Vedtak } from '../../contexts/dp-innsyn-vedtak';
import { DpInnsynSoknad } from '../../contexts/dp-innsyn-soknad';
import HarIkkeSokt from './dagpenger-har-ikke-sokt';
import HarPabegyntSoknad from './dagpenger-har-paabegynt-soknad';
import HarSokt from './dagpenger-har-sokt';
import MottarDagpenger from './dagpenger-faar';
import InnvilgetDagpenger from './dagpenger-innvilget';
import AvslagDagpenger from './dagpenger-avslag';
import beregnDagpengeStatus, { DagpengeStatus } from '../../lib/beregn-dagpenge-status';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ByttVisningLenke from './bytt-visning-lenke';
import Ytelser from './ytelser';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { DP_INNSYN_URL } from '../../ducks/api';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { useBesvarelse } from '../../contexts/besvarelse';
import DagpengerInfo from '../endre-situasjon/dagpenger-info';

function StansetDagpenger() {
    return <BodyShort>Stanset</BodyShort>;
}

function hentDagpengerInnhold(situasjon: DagpengeStatus) {
    if (situasjon === 'paabegynt') {
        return HarPabegyntSoknad;
    } else if (['sokt', 'soktogpaabegynt'].includes(situasjon)) {
        return HarSokt;
    } else if (situasjon === 'mottar') {
        return MottarDagpenger;
    } else if (situasjon === 'innvilget') {
        return InnvilgetDagpenger;
    } else if (situasjon === 'avslag') {
        return AvslagDagpenger;
    } else if (situasjon === 'stanset') {
        return StansetDagpenger;
    } else {
        return HarIkkeSokt;
    }
}

interface Props {
    valgtVisning: string;
    handleByttVisningKlikk: (e: React.MouseEvent) => void;
}

const TEKSTER = {
    nb: {
        tittel: 'Pengestøtte',
    },
    en: {
        tittel: 'Unemployment benefits',
    },
};

function DagpengerOgYtelserInnhold(props: Props) {
    const brukerInfoData = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
    const { data: innsendteSoknader = [] } = useSWRImmutable<DpInnsynSoknad[]>(`${DP_INNSYN_URL}/soknad`);
    const { data: dagpengeVedtak = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);
    const featureToggleData = useFeatureToggleData();
    const brukTabsDemo = featureToggleData['aia.bruk-tabs-demo'];
    const { besvarelse } = useBesvarelse();
    const { erBesvarelseEndret } = besvarelse || {};
    const dagpengerInfo = DagpengerInfo({
        valgtSituasjon: besvarelse?.besvarelse?.dinSituasjon?.verdi as any,
        tilleggsData: besvarelse?.besvarelse?.dinSituasjon?.tilleggsData,
    });

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
        arbeidssokerperioder,
    });

    const DagpengerInnhold = hentDagpengerInnhold(dagpengeStatus);

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <BankNoteIcon aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                {!brukTabsDemo && (
                    <Detail uppercase style={{ marginTop: '-1rem' }}>
                        {tekst('tittel')}
                    </Detail>
                )}
                {props.valgtVisning === 'ytelser' ? (
                    <>
                        <ErRendret loggTekst="Rendrer ytelser sluttkort" />
                        <Ytelser />
                        <InViewport loggTekst="Viser ytelser sluttkort i viewport" />
                    </>
                ) : (
                    <>
                        <ErRendret loggTekst="Rendrer dagpenger sluttkort" />
                        <DagpengerInnhold>
                            {erBesvarelseEndret && dagpengerInfo && (
                                <Panel className={spacingStyles.mb1} style={{ background: 'var(--a-blue-50)' }}>
                                    {dagpengerInfo}
                                </Panel>
                            )}
                        </DagpengerInnhold>
                        <InViewport loggTekst="Viser dagpenger sluttkort i viewport" />
                    </>
                )}
                <ByttVisningLenke
                    handleByttVisningKlikk={props.handleByttVisningKlikk}
                    valgtYtelserVisning={props.valgtVisning}
                />
            </div>
        </Panel>
    );
}

export default DagpengerOgYtelserInnhold;
