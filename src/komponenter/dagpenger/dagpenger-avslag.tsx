import { BodyShort, Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { Vedtak } from '../../contexts/dp-innsyn-vedtak';
import prettyPrintDato from '../../utils/pretty-print-dato';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import LesOmYtelser from './les-om-ytelser';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useSWRImmutable } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';

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

const DagpengerAvslag = (props: any) => {
    const { data: vedtakData = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);
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
            {props.children}
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
