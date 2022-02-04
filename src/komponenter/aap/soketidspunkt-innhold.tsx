import { Label } from '@navikt/ds-react';

const SoketidspunktInnhold = () => {
    return (
        <div className="panel-innhold">
            <div className="hovedinnhold">
                <p>
                    Du kan når som helst søke om arbeidsavklaringspenger hvis arbeidsevnen din er redusert med minst 50
                    prosent. Du kan tidligst få utbetalt arbeidsavklaringspenger fra og med den dagen du søker.
                </p>
                <p>Du kan være sykmeldt med sykepenger inntil ett år.</p>
                <p>
                    Hvis du fortsatt er syk ved slutten av dette sykepengeåret, kan arbeidsavklaringspenger være en
                    aktuell ytelse.
                </p>
                <p>
                    Hvis du ikke har oversikt over hvor lenge du har vært sykmeldt, må du være oppmerksom på at
                    sykepengene dine kan ta slutt før du tror.
                </p>
                <p>Du må selv søke om arbeidsavklaringspenger i god tid før retten din til sykepenger går ut.</p>
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
                </div>
            </div>
        </div>
    );
};

export default SoketidspunktInnhold;
