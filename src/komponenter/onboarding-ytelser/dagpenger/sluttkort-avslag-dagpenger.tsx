import { BodyShort, Heading } from '@navikt/ds-react';
import { useDpInnsynVedtakData, Vedtak } from '../../../contexts/dp-innsyn-vedtak';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import LesOmYtelser from './les-om-ytelser';
import SeMerInfo from './se-mer-info';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

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

const Sluttkort = () => {
    const vedtakData = useDpInnsynVedtakData();
    const nyesteVedtakMedAvslag = vedtakData
        .filter((vedtak) => vedtak.status === 'AVSLÅTT')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!nyesteVedtakMedAvslag) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {tekst('heading')}
            </Heading>

            <BodyShort className={'blokk-xs'}>
                {`${tekst('fattet')} ${prettyPrintDato(nyesteVedtakMedAvslag.datoFattet, sprak)} ${tekst('status')} `}
                <b>{nyesteVedtakMedAvslag.status.toLocaleLowerCase()}</b>.
            </BodyShort>
            <SeMerInfo amplitudeTemaNavn={'"dagpenger-tema - dagpenger avslått"'} />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - dagpenger avslått"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - dagpenger avslått"'} />
        </>
    );
};

export default Sluttkort;
