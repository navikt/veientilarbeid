import { BodyLong, BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { dokumentasjon_url } from '../../url';

import MeldekortInfo from './meldekort-info';
import DagpengerInfo from './dagpenger-info';
import { PermittertSvar } from '../../models/endring-av-situasjon';
import { DinSituasjonSvar } from '../../contexts/brukerregistrering';

import Feedback from '../feedback/feedback-profil';

import spacing from '../../spacing.module.css';

type SituasjonSvar = PermittertSvar | DinSituasjonSvar;

export interface VeiledningsProps {
    valgtSituasjon: SituasjonSvar;
    tilleggsData?: any;
}

function kreverDokumentasjon(valgtSituasjon: SituasjonSvar): boolean {
    const dokumentasjonsSituasjoner: SituasjonSvar[] = [
        PermittertSvar.TILBAKE_TIL_JOBB,
        PermittertSvar.OPPSIGELSE,
        PermittertSvar.ENDRET_PERMITTERINGSPROSENT,
        PermittertSvar.SAGT_OPP,
    ];
    return dokumentasjonsSituasjoner.includes(valgtSituasjon);
}

const GENERELL_VEILEDNING_MED_DOKUMENTASJON = () => {
    return (
        <>
            <h2 className={spacing.mbn}>Hva betyr endringen for meg?</h2>
            <BodyShort>Vi baserer denne veiledningen på de opplysningene du har oppgitt.</BodyShort>
            <h3 className={spacing.mbn}>Hva må jeg gjøre nå?</h3>
            <BodyShort>
                Du må sende oss dokumentasjon om endringen dersom du ikke har gjort det allerede.
                <br />
                Du kan gå direkte til innsendingen når du lukker dette vinduet.
            </BodyShort>
            <ReadMore header="Hva skjer nå om jeg har søkt eller mottar dagpenger?" className={spacing.mt1}>
                <BodyShort className={spacing.mb1}>
                    Når vi får behandlet dokumentasjonen du sender oss, vil du få et brev om saken din og hva du skal
                    gjøre.
                </BodyShort>
                <BodyShort className={spacing.mb1}>
                    Frem til du mottar dette brevet bør du fortsette å sende inn meldekortene.
                </BodyShort>
                <BodyShort>Du finner informasjon om saksbehandlingstider på NAV.no.</BodyShort>
            </ReadMore>
            <ReadMore header="Skal jeg fortsatt være registrert som arbeidssøker?" className={spacing.mt1}>
                <BodyShort className={spacing.mb1}>
                    Ett av kravene for å få innvilget pengestøtte (dagpenger, tiltakspenger eller kommunal ytelse) er at
                    du må være registrert som arbeidssøker i hele perioden du søker om pengestøtten for.
                </BodyShort>
                <BodyLong>
                    Om du er usikker på når du har rett på pengestøtte, må du derfor huske å sende inn alle meldekortene
                    fremover og å svare 'Ja' på spørsmålet om du ønsker å være registrert som arbeidssøker for de neste
                    14 dagene.
                </BodyLong>
            </ReadMore>
            <Feedback id="endring-veiledning-generell" />
        </>
    );
};

const GENERELL_VEILEDNING_UTEN_DOKUMENTASJON = () => {
    return (
        <>
            <h2 className={spacing.mbn}>Hva betyr endringen for meg?</h2>
            <BodyShort>Vi baserer denne veiledningen på de opplysningene du har oppgitt.</BodyShort>
            <h3 className={spacing.mbn}>Hva må jeg gjøre nå?</h3>
            <BodyShort>
                Vi har mottatt endringen i din situasjon så du trenger i utgangspunktet ikke gjøre mer rundt denne
                saken.
            </BodyShort>
            <ReadMore header="Skal jeg fortsatt være registrert som arbeidssøker?" className={spacing.mt1}>
                <BodyShort className={spacing.mb1}>
                    Ett av kravene for å få innvilget pengestøtte (dagpenger, tiltakspenger eller kommunal ytelse) er at
                    du må være registrert som arbeidssøker i hele perioden du søker om pengestøtten for.
                </BodyShort>
                <BodyLong>
                    Om du er usikker på når du har rett på pengestøtte, må du derfor huske å sende inn alle meldekortene
                    fremover og å svare 'Ja' på spørsmålet om du ønsker å være registrert som arbeidssøker for de neste
                    14 dagene.
                </BodyLong>
            </ReadMore>
            <Feedback id="endring-veiledning-generell" />
        </>
    );
};

const OPPSIGELSE = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>

            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må laste opp oppsigelsen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                <DagpengerInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV, kan du svare nei på det siste spørsmålet
                i meldekortet.
                <br />
                Før du søker dagpenger på nytt, må du huske å registrere deg igjen.
            </p>
            <Feedback id="endring-veiledning-oppsigelse" />
        </>
    );
};

const ENDRET_PERMITTERINGSPROSENT = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss det nye permitteringsvarselet</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <Feedback id="endring-veiledning-endret-permittering" />
        </>
    );
};

const TILBAKE_TIL_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV etter å ha sendt inn det siste
                meldekortet, kan du svare nei på det siste spørsmålet i meldekortet.
            </p>
            <Feedback id="endring-veiledning-tilbake-til-jobb" />
        </>
    );
};

const NY_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                <DagpengerInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV etter å ha sendt inn det siste
                meldekortet, kan du svare nei på det siste spørsmålet i meldekortet.
            </p>
            <Feedback id="endring-veiledning-ny-jobb" />
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss den nye arbeidsavtalen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                <DagpengerInfo {...props} />
            </p>
            <p>Gi oss beskjed om noe endrer seg.</p>
            <Feedback id="endring-veiledning-midlertidig-jobb" />
        </>
    );
};

const KONKURS = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss meldingen om konkursen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                <DagpengerInfo {...props} />
            </p>
            <p>
                Dersom du ønsker dagpenger etter forskuddet må du krysse av for at du også søker dagpenger for etter
                lønnsgarantiperioden er over, så slipper du to dagpengesøknader.
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Dersom du fortsatt ønsker å stå registrert som arbeidssøker må du fortsette å sende inn meldekort.
            </p>
            <Feedback id="endring-veiledning-konkurs" />
        </>
    );
};

const SAGT_OPP = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                <MeldekortInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                <DagpengerInfo {...props} />
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV, kan du svare nei på det siste spørsmålet
                i meldekortet.
                <br />
                Før du søker dagpenger på nytt, må du huske å registrere deg igjen.
            </p>
            <Feedback id="endring-veiledning-sagt-opp" />
        </>
    );
};

const ANNET = (props: VeiledningsProps) => {
    return <GENERELL_VEILEDNING_MED_DOKUMENTASJON />;
};

const MISTET_JOBBEN = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-mistet-jobben" />
        </>
    );
};

const DELTIDSJOBB_VIL_MER = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-deltidsjobb" />
        </>
    );
};

const ALDRI_HATT_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-aldri-hatt-jobb" />
        </>
    );
};

const VIL_BYTTE_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-vil-bytte-jobb" />
        </>
    );
};

const JOBB_OVER_2_AAR = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-jobb-over-to-aar" />
        </>
    );
};

const USIKKER_JOBBSITUASJON = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-usikker-jobb" />
        </>
    );
};

const AKKURAT_FULLFORT_UTDANNING = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-utdanning" />
        </>
    );
};

const VIL_FORTSETTE_I_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
            <Feedback id="endring-veiledning-fortsette-jobb" />
        </>
    );
};

const Veiledning = (props: VeiledningsProps) => {
    const { valgtSituasjon } = props;

    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE {...props} />;
    } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.KONKURS) {
        return <KONKURS {...props} />;
    } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
        return <NY_JOBB {...props} />;
    } else if (
        valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT ||
        valgtSituasjon === DinSituasjonSvar.ER_PERMITTERT
    ) {
        return <ENDRET_PERMITTERINGSPROSENT {...props} />;
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.MISTET_JOBBEN) {
        return <MISTET_JOBBEN {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.DELTIDSJOBB_VIL_MER) {
        return <DELTIDSJOBB_VIL_MER {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.ALDRI_HATT_JOBB) {
        return <ALDRI_HATT_JOBB {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.VIL_BYTTE_JOBB) {
        return <VIL_BYTTE_JOBB {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.JOBB_OVER_2_AAR) {
        return <JOBB_OVER_2_AAR {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.USIKKER_JOBBSITUASJON) {
        return <USIKKER_JOBBSITUASJON {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING) {
        return <AKKURAT_FULLFORT_UTDANNING {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.VIL_FORTSETTE_I_JOBB) {
        return <VIL_FORTSETTE_I_JOBB {...props} />;
    } else if (kreverDokumentasjon(valgtSituasjon)) {
        return <GENERELL_VEILEDNING_MED_DOKUMENTASJON />;
    } else if (!kreverDokumentasjon(valgtSituasjon)) {
        return <GENERELL_VEILEDNING_UTEN_DOKUMENTASJON />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Veiledning;
