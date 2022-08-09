import { Money } from '@navikt/ds-icons';
import { Panel } from '@navikt/ds-react';

import HarIkkeSokt from './dagpenger-har-ikke-sokt';
import HarPabegyntSoknad from './dagpenger-har-paabegynt-soknad';
import HarSokt from './dagpenger-har-sokt';
import MottarDagpenger from './dagpenger-faar';
import InnvilgetDagpenger from './dagpenger-innvilget';
import AvslagDagpenger from './dagpenger-avslag';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useDpInnsynSoknadData } from '../../contexts/dp-innsyn-soknad';
import { useDpInnsynVedtakData } from '../../contexts/dp-innsyn-vedtak';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import beregnDagpengeStatus, { DagpengeStatus } from '../../lib/beregn-dagpenge-status';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ByttKortLenke from './bytt-kort-lenke';
import React from 'react';
import Ytelser from './ytelser';

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
    handleByttKortKlikk: (e: React.MouseEvent) => void;
}

function DagpengerOgYtelserInnhold(props: Props) {
    const brukerInfoData = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const paabegynteSoknader = useDpInnsynPaabegynteSoknaderData();
    const innsendteSoknader = useDpInnsynSoknadData();
    const dagpengeVedtak = useDpInnsynVedtakData();

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
    });

    const DagpengerInnhold = hentDagpengerInnhold(dagpengeStatus);

    return (
        <Panel className="flex">
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
            <div className="full-width">
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
                <ByttKortLenke
                    handleByttKortKlikk={props.handleByttKortKlikk}
                    valgtYtelserVisning={props.valgtVisning}
                />
            </div>
        </Panel>
    );
}

export default DagpengerOgYtelserInnhold;
