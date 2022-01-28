import { BodyShort, Link } from '@navikt/ds-react';

import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { datoForForventetSvar } from '../../../utils/date-utils';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import { loggAktivitet } from '../../../metrics/metrics';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER = {
    nb: {
        siste: 'Den siste søknaden NAV har mottatt ble sendt inn',
        svar: 'Du kan forvente svar innen',
        saksbehandlingstider: 'Les mer om saksbehandlingstider',
    },
    en: {
        siste: 'The last application NAV has received was submitted',
        svar: 'You can expect a reply within',
        saksbehandlingstider: 'Read more about case processing times',
    },
};

const SistInnsendtSoknad = ({ dato, komponent }: { dato?: string; komponent: string }) => {
    const soknader = useDpInnsynSoknadData();
    const amplitudeData = useAmplitudeData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!dato) {
        return null;
    }

    const sisteInnsendteSoknad = soknader?.sort(sorterEtterNyesteDatoInnsendt)[0];

    if (!sisteInnsendteSoknad) {
        return null;
    }

    if (new Date(sisteInnsendteSoknad.datoInnsendt).getTime() < new Date(dato).getTime()) {
        return null;
    }

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <>
            <BodyShort className={'blokk-xs'}>
                {tekst('siste')} {prettyPrintDato(sisteInnsendteSoknad.datoInnsendt, sprak)}
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                {tekst('svar')}{' '}
                {prettyPrintDato(
                    datoForForventetSvar(new Date(sisteInnsendteSoknad.datoInnsendt)).toISOString(),
                    sprak
                )}
            </BodyShort>

            <Link
                className={'blokk-xs'}
                onClick={() => {
                    loggLenkeKlikk(
                        `'Går til saksbehandlingstider fra "dagpenger-tema - ${komponent}"`,
                        'https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav'
                    );
                }}
                href="https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav"
            >
                {tekst('saksbehandlingstider')}
            </Link>
        </>
    );
};

export default SistInnsendtSoknad;
