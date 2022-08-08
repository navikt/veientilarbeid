import { Money } from '@navikt/ds-icons';
import { Panel } from '@navikt/ds-react';

import HarIkkeSokt from './sluttkort-har-ikke-sokt';
import HarPabegyntSoknad from './sluttkort-har-paabegynt-soknad';
import HarSokt from './sluttkort-har-sokt';
import MottarDagpenger from './sluttkort-faar-dagpenger';
import InnvilgetDagpenger from './sluttkort-innvilget-dagpenger';
import AvslagDagpenger from './sluttkort-avslag-dagpenger';
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
import SluttkortYtelser from './sluttkort-ytelser';

function hentAktueltSluttkort(situasjon: DagpengeStatus) {
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

function Sluttkort(props: Props) {
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

    const AktueltSluttkort = hentAktueltSluttkort(dagpengeStatus);

    return (
        <Panel className="flex mb-2">
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
            <div>
                <ErRendret loggTekst="Rendrer dagpenger sluttkort" />
                {props.valgtVisning === 'ytelser' ? <SluttkortYtelser /> : <AktueltSluttkort />}
                <ByttKortLenke
                    handleByttKortKlikk={props.handleByttKortKlikk}
                    valgtYtelserVisning={props.valgtVisning}
                />
                <InViewport loggTekst="Viser dagpenger sluttkort i viewport" />
            </div>
        </Panel>
    );
}

export default Sluttkort;
