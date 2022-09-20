import { BodyShort, Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useDpInnsynVedtakData, Vedtak } from '../../contexts/dp-innsyn-vedtak';
import prettyPrintDato from '../../utils/pretty-print-dato';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import LesOmYtelser from './les-om-ytelser';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har fått et vedtak om dagpenger',
        fattet: 'Vedtaket ble fattet',
        status: 'og status er',
    },
    en: {
        heading: 'You have received a decision on unemployment benefits',
        fattet: 'The decision was made on',
        status: 'and the status is',
    },
};

const DagpengerAvslag = () => {
    const vedtakData = useDpInnsynVedtakData();
    const nyesteVedtakMedAvslag = vedtakData
        .filter((vedtak) => vedtak.status === 'AVSLÅTT')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!nyesteVedtakMedAvslag) return null;

    return (
        <>
            <Heading size="medium" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>

            <BodyShort className={spacingStyles.blokkXs}>
                {`${tekst('fattet')} ${prettyPrintDato(nyesteVedtakMedAvslag.datoFattet, sprak)} ${tekst('status')} `}
                <b>{nyesteVedtakMedAvslag.status.toLocaleLowerCase()}</b>.
            </BodyShort>
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - dagpenger avslått"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - dagpenger avslått"'} />
        </>
    );
};

export default DagpengerAvslag;
