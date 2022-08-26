import { useProfil } from '../../contexts/profil';
import * as React from 'react';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';
import ErRendret from '../er-rendret/er-rendret';
import { Alert, BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import InViewport from '../in-viewport/in-viewport';
import { JaEllerNei } from '../../profil';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke, reaktiveringLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';

function valgAvVisningErUtdatert(valgtVisning: JaEllerNei): boolean {
    // Hvis man velger at man ikke har behov for å være registrert lenger, skal dette bare være gyldig i 28 dager,
    // sånn at det gamle valget ikke blir stående hvis man havner i den samme situasjonen på nytt senere.
    const valgtVisningDato = new Date(new Date(valgtVisning.oppdatert).toISOString().substr(0, 10));
    const datoNaa = new Date(new Date().toISOString().substr(0, 10));
    const millis = datoNaa.getMilliseconds() - valgtVisningDato.getMilliseconds();
    const dagerSidenValg = millis > 0 ? Math.floor(millis / 86400000) : 1;

    return dagerSidenValg >= 28;
}

function bestemReaktiveringVisning(valgtVisning: JaEllerNei): string {
    return valgAvVisningErUtdatert(valgtVisning) ? 'ja' : valgtVisning.valg;
}

const Reaktivering = () => {
    const { profil, lagreProfil } = useProfil();

    const valgtReaktiveringVisning: JaEllerNei = profil?.['aiaReaktiveringVisning'] ?? {
        oppdatert: new Date().toISOString(),
        valg: 'ja',
    };

    const reaktiveringVisning = bestemReaktiveringVisning(valgtReaktiveringVisning);
    const [visReaktiveringAdvarsel, setVisReaktiveringAdvarsel] = React.useState(reaktiveringVisning);

    const amplitudeData = useAmplitudeData();
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { securityLevel } = useAutentiseringData();
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const kanViseKomponent = isLevel4 && kanReaktiveres;

    const handleReaktivering = (aktivitet: string) => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeData });
        window.location.assign(reaktiveringLenke);
    };

    const handleDialog = (aktivitet: string) => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeData });
        window.location.assign(dialogLenke);
    };

    const handleIkkeReaktivering = (event: React.SyntheticEvent) => {
        event.preventDefault();
        loggAktivitet({ aktivitet: 'Velger ikke vis reaktivering', ...amplitudeData });

        const reaktiveringsvalg = { oppdatert: new Date().toISOString(), valg: 'nei' } as JaEllerNei;

        lagreProfil({ aiaReaktiveringVisning: reaktiveringsvalg });
        setVisReaktiveringAdvarsel(reaktiveringsvalg.valg);
    };

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <section className="blokk-m">
            <ErRendret loggTekst="Rendrer tema: kan reaktiveres" />
            <Alert variant={visReaktiveringAdvarsel === 'ja' ? 'warning' : 'info'}>
                <Heading size="small" level="2" className="blokk-xs">
                    Du er ikke lenger registrert som arbeidssøker hos NAV
                </Heading>
                {visReaktiveringAdvarsel === 'ja' ? (
                    <div>
                        <BodyShort className="blokk-xs">
                            Har du mottatt dagpenger vil utbetalingene nå være stoppet. Du må registrere deg på nytt og
                            sende inn ny søknad om dagpenger.
                        </BodyShort>
                        <BodyShort className="blokk-xs">
                            Dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker.
                        </BodyShort>
                        <BodyShort className="blokk-xs">
                            Dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker.
                        </BodyShort>
                        <BodyShort className="blokk-s">
                            <Button variant="secondary" onClick={() => handleReaktivering('Går til reaktivering')}>
                                Registrer deg som arbeidssøker
                            </Button>
                        </BodyShort>
                        <BodyShort>
                            Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
                        </BodyShort>
                        <BodyShort className="blokk-xs">
                            <Link
                                href={dialogLenke}
                                onClick={() => handleDialog('Går til dialog fra reaktiveringskortet')}
                            >
                                Ta kontakt med veilederen din i dialogtjenesten
                            </Link>
                        </BodyShort>
                        <BodyShort className="blokk-xs">
                            <Link href={dialogLenke} onClick={handleIkkeReaktivering}>
                                Jeg har ikke lenger behov for å være registrert som arbeidssøker hos NAV
                            </Link>
                        </BodyShort>
                    </div>
                ) : (
                    <div>
                        <BodyShort className="blokk-s">
                            <Button
                                variant="secondary"
                                onClick={() => handleReaktivering('Går til reaktivering fra reaktivering ikke aktuelt')}
                            >
                                Registrer deg som arbeidssøker
                            </Button>
                        </BodyShort>
                        <BodyShort>
                            Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
                        </BodyShort>
                        <BodyShort className="blokk-xs">
                            <Link
                                href={dialogLenke}
                                onClick={() => handleDialog('Går til dialog fra reaktivering ikke aktuelt')}
                            >
                                Ta kontakt med veilederen din i dialogtjenesten
                            </Link>
                        </BodyShort>
                        <InViewport loggTekst="Reaktivering ikke aktuelt" />
                    </div>
                )}
                <InViewport loggTekst="Viser tema i viewport: kan reaktiveres" />
            </Alert>
        </section>
    );
};

export default Reaktivering;
