import { useState } from 'react';
import { Box, Detail, Heading, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';

import RegistrertTeller from './registrert-teller';
import { dialogLenke } from '../../innhold/lenker';
import DialogKnapp from './dialog-knapp';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import InViewport from '../in-viewport/in-viewport';
import Forklaring from './forklaring';

import spacingStyles from '../../spacing.module.css';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
import { useUlesteDialoger } from '../../hooks/use-uleste-dialoger';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

const TEKSTER = {
    nb: {
        heading: 'Om du ønsker hjelp fra oss må du gi beskjed',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function HjelpOgStotte() {
    const [clickedLesMer, setClickedLesMer] = useState(false);
    const { amplitudeData } = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const { antallUleste } = useUlesteDialoger();

    const registrertDato = registreringData?.registrering?.opprettetDato;

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const brukTabsDemo = useSkalBrukeTabs();

    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Åpner forklaringen for hjelp og støtte', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    const DefaultInnhold = () => {
        return (
            <>
                <Heading size="small" className={spacingStyles.blokkXs}>
                    {tekst('heading')}
                </Heading>
                <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
                <DialogKnapp amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
            </>
        );
    };

    return (
        <Box>
            {!brukTabsDemo && (
                <Detail uppercase className={spacingStyles.mt1}>
                    Hjelp og støtte
                </Detail>
            )}
            <DefaultInnhold />
            <ReadMore size="medium" header={tekst('readMoreHeading')} onClick={handleClickLesMer}>
                <Forklaring />
            </ReadMore>
            <InViewport loggTekst="Viser hjelp og støtte-komponent i viewport" />
        </Box>
    );
}

export default HjelpOgStotte;
