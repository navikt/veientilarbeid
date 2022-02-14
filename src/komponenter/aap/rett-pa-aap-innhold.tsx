import { BodyShort, Heading, Label } from '@navikt/ds-react';

const RettPaAapInnhold = () => {
    return (
        <>
            <BodyShort className="blokk-s">
                Her er de viktigste vilkårene du må oppfylle for å ha rett på arbeidsavklaringspenger:
            </BodyShort>

            <ul>
                <li>
                    <Heading size="small">Medlem i folketrygden</Heading>
                    <p>
                        Du må ha vært medlem i folketrygden i minst 3 år. Har du vært helt arbeidsfør, er det nok at du
                        har vært medlem i minst ett år.
                    </p>
                </li>
                <li>
                    <Heading size="small">Alder</Heading>
                    <p>Du må være mellom 18 og 67 år.</p>
                </li>
                <li>
                    <Heading size="small">Bo i Norge</Heading>
                    <p>Du må bo eller oppholde deg i Norge.</p>
                </li>
                <li>
                    <Heading size="small">Redusert arbeidsevne</Heading>
                    <p>Arbeidsevnen din må være redusert med minst 50 prosent.</p>
                </li>
                <li>
                    <Heading size="small">Behov for tiltak eller behandling</Heading>
                    <p>Du må ha behov for et arbeidsrettet tiltak eller aktiv behandling.</p>
                </li>
                <li>
                    <Heading size="small">Sende meldekort</Heading>
                    <p>Du må sende meldekort hver 14. dag.</p>
                </li>
            </ul>

            <div style={{ backgroundColor: 'var(--navds-semantic-color-feedback-info-background)' }}>
                <Label>Relatert innhold</Label>
            </div>
            <ul>
                <li>
                    <a
                        className="lenke"
                        href="https://www.nav.no/no/person/arbeid/arbeidsavklaringspenger/arbeidsavklaringspenger-aap"
                    >
                        Utfyllende informasjon om AAP
                    </a>
                </li>
                <li>
                    <a
                        className="lenke"
                        href="https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+fyller+du+ut+meldekortet+arbeidsavklaringspenger"
                    >
                        Hvordan du fyller ut meldekort når du har AAP
                    </a>
                </li>
            </ul>
        </>
    );
};

export default RettPaAapInnhold;
