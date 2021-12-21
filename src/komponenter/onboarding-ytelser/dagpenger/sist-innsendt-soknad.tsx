import { BodyShort, Link } from '@navikt/ds-react';
import { sorterEtterNyesteDatoInnsendt } from '../../../lib/beregn-dagpenge-status';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { datoForForventetSvar } from '../../../utils/date-utils';
import prettyPrintDato from '../../../utils/pretty-print-dato';
import { loggAktivitet } from '../../../metrics/metrics';
import { useAmplitudeData } from '../../../contexts/amplitude-context';

const SistInnsendtSoknad = ({ dato, komponent }: { dato?: string; komponent: string }) => {
    const soknader = useDpInnsynSoknadData();
    const amplitudeData = useAmplitudeData();

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
                Den siste søkaden NAV har mottatt ble sendt inn {prettyPrintDato(sisteInnsendteSoknad.datoInnsendt)}.
            </BodyShort>

            <BodyShort className={'blokk-xs'}>
                Du kan forvente svar innen{' '}
                {prettyPrintDato(datoForForventetSvar(new Date(sisteInnsendteSoknad.datoInnsendt)).toISOString())}
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
                Les mer om saksbehandlingstider
            </Link>
        </>
    );
};

export default SistInnsendtSoknad;
