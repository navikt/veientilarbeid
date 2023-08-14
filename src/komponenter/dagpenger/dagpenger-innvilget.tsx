import { BodyShort, Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import prettyPrintDato from '../../utils/pretty-print-dato';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useSWRImmutable } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';
import { Vedtak } from '../../models/dagpenger';

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

const DagpengerInnvilget = (props: any) => {
    const { data: vedtakData = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);
    const nyesteInnvilgedeVedtak = vedtakData
        .filter((vedtak) => vedtak.status === 'INNVILGET')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!nyesteInnvilgedeVedtak) return null;

    return (
        <>
            <Heading size="medium" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            {props.children}
            <BodyShort className={spacingStyles.blokkXs}>
                {`${tekst('fattet')} ${prettyPrintDato(nyesteInnvilgedeVedtak.datoFattet, sprak)} ${tekst('status')} `}
                <b>{nyesteInnvilgedeVedtak.status.toLocaleLowerCase()}</b>.
            </BodyShort>
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - dagpenger innvilget"' />
        </>
    );
};

export default DagpengerInnvilget;
