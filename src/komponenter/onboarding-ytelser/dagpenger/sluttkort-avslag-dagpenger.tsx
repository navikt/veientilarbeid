import { BodyShort, Heading } from '@navikt/ds-react';
import { useDpInnsynVedtakData, Vedtak } from '../../../contexts/dp-innsyn-vedtak';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import LesOmYtelser from './les-om-ytelser';
import SeMerInfo from './se-mer-info';

const Sluttkort = () => {
    const vedtakData = useDpInnsynVedtakData();
    const nyesteVedtakMedAvslag = vedtakData
        .filter((vedtak) => vedtak.status === 'AVSLÅTT')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];
    if (!nyesteVedtakMedAvslag) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har fått et vedtak om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>
                Vedtaket ble fattet {prettyPrintDato(nyesteVedtakMedAvslag.datoFattet)} og status er{' '}
                <b>{nyesteVedtakMedAvslag.status.toLocaleLowerCase()}</b>.
            </BodyShort>
            <SeMerInfo amplitudeTemaNavn={'"dagpenger-tema - dagpenger avslått"'} />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - dagpenger avslått"' />
            <LesOmYtelser amplitudeTemaNavn={'"dagpenger-tema - dagpenger avslått"'} />
        </>
    );
};

export default Sluttkort;
