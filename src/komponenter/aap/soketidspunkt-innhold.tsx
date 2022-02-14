import { BodyShort, Label } from '@navikt/ds-react';

const SoketidspunktInnhold = () => {
    return (
        <>
            <BodyShort className="blokk-s">
                Du kan når som helst søke om arbeidsavklaringspenger hvis arbeidsevnen din er redusert med minst 50
                prosent. Du kan tidligst få utbetalt arbeidsavklaringspenger fra og med den dagen du søker.
            </BodyShort>

            <BodyShort className="blokk-s">Du kan være sykmeldt med sykepenger inntil ett år.</BodyShort>

            <BodyShort className="blokk-s">
                Hvis du fortsatt er syk ved slutten av dette sykepengeåret, kan arbeidsavklaringspenger være en aktuell
                ytelse.
            </BodyShort>

            <BodyShort className="blokk-s">
                Hvis du ikke har oversikt over hvor lenge du har vært sykmeldt, må du være oppmerksom på at sykepengene
                dine kan ta slutt før du tror.
            </BodyShort>

            <BodyShort className="blokk-s">
                Du må selv søke om arbeidsavklaringspenger i god tid før retten din til sykepenger går ut.
            </BodyShort>

            <div style={{ backgroundColor: 'var(--navds-semantic-color-feedback-info-background)' }}>
                <Label>Relatert innhold</Label>
            </div>

            <ul>
                <li>
                    <a
                        className="lenke"
                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV?kap=398578"
                    >
                        Se saksbehandlingstider.
                    </a>
                </li>
                <li>
                    <a
                        className="lenke"
                        href="https://www.nav.no/no/Bedrift/Oppfolging/Sykmeldt+arbeidstaker/Overgang+til+arbeidsavklaring"
                    >
                        Les mer om overgangen fra sykepenger til arbeidsavklaringspenger.
                    </a>
                </li>
            </ul>
        </>
    );
};

export default SoketidspunktInnhold;
