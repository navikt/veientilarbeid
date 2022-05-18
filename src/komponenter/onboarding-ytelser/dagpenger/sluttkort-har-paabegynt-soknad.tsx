import { Heading, BodyShort } from '@navikt/ds-react';

import {
    useDpInnsynPaabegynteSoknaderData,
    DpInnsynPaabegyntSoknad,
} from '../../../contexts/dp-innsyn-paabegynte-soknader';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import TemaLenkepanel from '../../tema/tema-lenkepanel';
import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';
import { FORTSETT_DP_SOKNAD_URL } from '../../../utils/lenker';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har startet på en søknad om dagpenger',
        ingress: 'Du kan tidligst få dagpenger fra den dagen du har søkt.',
        ikkeSendt: 'Du har ikke sendt inn søknaden.',
        fortsett: 'Fortsett på søknaden',
        pabegynt: 'Påbegynt',
    },
    en: {
        heading: 'You have started on an application for unemployment benefits',
        ingress: 'You can receive unemployment benefits at the earliest from the day you have applied.',
        ikkeSendt: 'You have not submitted the application.',
        fortsett: 'Continue on the application',
        pabegynt: 'Started on',
    },
};

const Sluttkort = () => {
    const pabegynteSoknaderData = useDpInnsynPaabegynteSoknaderData();

    const sistePabegynteSoknad = pabegynteSoknaderData.sort(
        (a: DpInnsynPaabegyntSoknad, b: DpInnsynPaabegyntSoknad) =>
            new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime()
    )[0];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    if (!sistePabegynteSoknad) return null;

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {tekst('heading')}
            </Heading>
            <BodyShort className={'blokk-xs'}>{tekst('ingress')}</BodyShort>
            <BodyShort className={'blokk-xs'}>{tekst('ikkeSendt')}</BodyShort>

            <TemaLenkepanel
                href={`${FORTSETT_DP_SOKNAD_URL}/${sistePabegynteSoknad.behandlingsId}`}
                amplitudeHandling="Fortsetter påbegynt soknad"
                amplitudeTema="dagpenger"
                tittel={tekst('fortsett')}
                beskrivelse={`${tekst('pabegynt')} ${prettyPrintDato(sistePabegynteSoknad.sistEndret, sprak)}`}
            />
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - påbegynt søknad"' />
        </>
    );
};

export default Sluttkort;
