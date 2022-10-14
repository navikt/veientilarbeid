import React from 'react';
import { Money } from '@navikt/ds-icons';
import { Detail, Panel } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { DpInnsynSoknad } from '../../contexts/dp-innsyn-soknad';
import { Vedtak } from '../../contexts/dp-innsyn-vedtak';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';

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
import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useSWR } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';

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
    const { data: innsendteSoknader = [] } = useSWR<DpInnsynSoknad[]>(`${DP_INNSYN_URL}/soknad`);
    const { data: dagpengeVedtak = [] } = useSWR<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);

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
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Money />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('tittel')}
                </Detail>
                {props.valgtVisning === 'ytelser' ? (
                    <>
                        <ErRendret loggTekst="Rendrer ytelser sluttkort" />
                        <Ytelser />
                        <InViewport loggTekst="Viser ytelser sluttkort i viewport" />
                    </>
                ) : (
                    <>
                        <ErRendret loggTekst="Rendrer dagpenger sluttkort" />
                        <DagpengerInnhold />
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
