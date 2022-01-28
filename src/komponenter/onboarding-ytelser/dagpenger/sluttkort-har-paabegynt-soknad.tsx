import { Heading, BodyShort } from '@navikt/ds-react';
import { usePaabegynteSoknaderData, Soknad } from '../../../contexts/paabegynte-soknader';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import TemaLenkepanel from '../../tema/tema-lenkepanel';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import SeMerInfo from './se-mer-info';

const Sluttkort = () => {
    const pabegynteSoknaderData = usePaabegynteSoknaderData();

    const sistePabegynteSoknad = pabegynteSoknaderData.soknader.sort(
        (a: Soknad, b: Soknad) => new Date(b.dato).getTime() - new Date(a.dato).getTime()
    )[0];

    if (!sistePabegynteSoknad) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                Du har startet på en søknad om dagpenger
            </Heading>

            <BodyShort className={'blokk-xs'}>Du kan tidligst få dagpenger fra den dagen du har søkt.</BodyShort>
            <BodyShort className={'blokk-xs'}>Du har ikke sendt inn søknaden.</BodyShort>

            <TemaLenkepanel
                href={sistePabegynteSoknad.lenke}
                amplitudeHandling="Fortsetter påbegynt soknad"
                amplitudeTema="dagpenger"
                tittel="Fortsett på søknad"
                beskrivelse={`Påbegynt ${prettyPrintDato(sistePabegynteSoknad.dato)}`}
            />
            <SeMerInfo amplitudeTemaNavn={'"dagpenger-tema - påbegynt søknad"'} />
            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - påbegynt søknad"' />
        </>
    );
};

export default Sluttkort;
