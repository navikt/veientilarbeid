import { BodyShort, Heading } from '@navikt/ds-react';
import { useDpInnsynVedtakData, Vedtak } from '../../../contexts/dp-innsyn-vedtak';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import SeMerInfo from './se-mer-info';

const Sluttkort = () => {
    const vedtakData = useDpInnsynVedtakData();
    const nyesteInnvilgedeVedtak = vedtakData
        .filter((vedtak) => vedtak.status === 'INNVILGET')
        .sort((a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime())[0];
    if (!nyesteInnvilgedeVedtak) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har fått et vedtak om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>
                Vedtaket ble fattet {prettyPrintDato(nyesteInnvilgedeVedtak.datoFattet)} og status er{' '}
                <b>{nyesteInnvilgedeVedtak.status.toLocaleLowerCase()}</b>.
            </BodyShort>
            <SeMerInfo amplitudeTemaNavn='"dagpenger-tema - dagpenger innvilget"' />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - dagpenger innvilget"' />
        </>
    );
};

export default Sluttkort;
