import React from 'react';
import { BodyShort, Detail, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import HarIkkeSokt from './dagpenger-har-ikke-sokt';
import HarPabegyntSoknad from './dagpenger-har-paabegynt-soknad';
import HarSokt from './dagpenger-har-sokt';
import MottarDagpenger from './dagpenger-faar';
import InnvilgetDagpenger from './dagpenger-innvilget';
import AvslagDagpenger from './dagpenger-avslag';
import { DagpengeStatus } from '../../lib/beregn-dagpenge-status';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import ByttVisningLenke from './bytt-visning-lenke';
import Ytelser from './ytelser';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';
import { useBeregnDagpengestatus } from '../../hooks/use-beregn-dagpengestatus';

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
    const brukTabsDemo = useSkalBrukeTabs();
    const dagpengeStatus = useBeregnDagpengestatus();

    const DagpengerInnhold = hentDagpengerInnhold(dagpengeStatus);

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <Panel>
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
                    <DagpengerInnhold />
                    <InViewport loggTekst="Viser dagpenger sluttkort i viewport" />
                </>
            )}
            <ByttVisningLenke
                handleByttVisningKlikk={props.handleByttVisningKlikk}
                valgtYtelserVisning={props.valgtVisning}
            />
        </Panel>
    );
}

export default DagpengerOgYtelserInnhold;
