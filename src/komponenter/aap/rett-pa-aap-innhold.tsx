import { BodyShort, Label } from '@navikt/ds-react';

const RettPaAapInnhold = () => {
    return (
        <div className="panel-innhold rett-pa-aap-innhold">
            <div className="hovedinnhold">
                <BodyShort className="blokk-s">
                    Her er de viktigste vilkårene du må oppfylle for å ha rett på arbeidsavklaringspenger:
                </BodyShort>
                <div className="sjekkboks-liste">
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Medlem i folketrygden</h3>
                        <p>
                            Du må ha vært medlem i folketrygden i minst 3 år. Har du vært helt arbeidsfør, er det nok at
                            du har vært medlem i minst ett år.
                        </p>
                    </div>
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Alder</h3>
                        <p>Du må være mellom 18 og 67 år.</p>
                    </div>
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Bo i Norge</h3>
                        <p>Du må bo eller oppholde deg i Norge.</p>
                    </div>
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Redusert arbeidsevne</h3>
                        <p>Arbeidsevnen din må være redusert med minst 50 prosent.</p>
                    </div>
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Behov for tiltak eller behandling</h3>
                        <p>Du må ha behov for et arbeidsrettet tiltak eller aktiv behandling.</p>
                    </div>
                    <div className="avsnitt">
                        <h3 className="typo-element blokk-null">Sende meldekort</h3>
                        <p>Du må sende meldekort hver 14. dag.</p>
                    </div>
                </div>
            </div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Label>Relatert innhold</Label>
                </div>
                <div className="relatert-innhold-lenkeliste">
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
                </div>
            </div>
        </div>
    );
};

export default RettPaAapInnhold;
