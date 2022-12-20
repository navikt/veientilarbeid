import { Alert, BodyLong, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useReaktivering } from '../../contexts/reaktivering';
import { useMeldekortData } from '../../hooks/use-meldekortdata';

import { omMeldekortLenke, meldekortLenke } from '../../innhold/lenker';
import { hentIDag } from '../../utils/chrono';
import { datoUtenTid, hentISOUke, datoMedUkedag } from '../../utils/date-utils';
import {
    hentMeldekortForLevering,
    hentFoerstkommendeMeldekortIkkeKlarForLevering,
    foersteSendedagForMeldekort,
} from '../../utils/meldekort-utils';
import Meldekortstatus from './meldekortstatus';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import MeldekortKnapp from './meldekort-knapp';
import { vilUtmeldes } from '../../lib/vil-utmeldes';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        meldekortForUke: 'Meldekort for uke',
        blirTilgjengelig: 'blir tilgjengelig for innsending fra',
        meldekort: 'Meldekort',
        lesOm: 'Les om meldekort',
        sendesInn: 'Meldekort som kan sendes inn:',
        sendInn: 'Send inn meldekort',
        sendInnForUke: 'Send inn meldekort for uke',
        feilmelding: 'Vi får ikke hentet informasjon om dine meldekort akkurat nå.',
        utmelding:
            'Dersom du ikke lenger ønsker å være registrert må du svare "Nei" på spørsmålet "Ønsker du fortsatt å være registrert hos NAV de neste 14 dagene?" i meldekortet.',
    },
    en: {
        meldekortForUke: 'The employment status form for weeks',
        blirTilgjengelig: 'is available for submission from',
        meldekort: 'Employment status form',
        lesOm: 'Read about employment status form',
        sendesInn: 'Employment status forms ready for submission:',
        sendInn: 'Submit employment status form',
        sendInnForUke: 'Submit employment status form for weeks',
        feilmelding: 'Vi får ikke hentet informasjon om dine meldekort akkurat nå.',
        utmelding:
            'Dersom du ikke lenger ønsker å være registrert må du svare "Nei" på spørsmålet "Ønsker du fortsatt å være registrert hos NAV de neste 14 dagene?" i meldekortet.',
    },
};

function MeldekortHovedInnhold() {
    const { meldekortData = null, isError } = useMeldekortData();
    const { reaktivering } = useReaktivering();
    const visUtmelding = vilUtmeldes(reaktivering);

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    function Utmeldingsinformasjon({ visUtmeldingsInformasjon }: { visUtmeldingsInformasjon: boolean }) {
        if (!visUtmeldingsInformasjon) return null;
        return (
            <BodyLong spacing className={spacingStyles.mt1}>
                {tekst('utmelding')}
            </BodyLong>
        );
    }

    if (isError) {
        return (
            <>
                <ErRendret loggTekst="Rendrer feilmelding for meldekort" />
                <Alert variant={'warning'} className={`${spacingStyles.mb1} ${spacingStyles.mt1}`} fullWidth={false}>
                    <BodyLong>{tekst('feilmelding')}</BodyLong>
                </Alert>
                <Utmeldingsinformasjon visUtmeldingsInformasjon={visUtmelding} />
                <div>
                    <MeldekortKnapp
                        href={omMeldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel={tekst('lesOm')}
                        variant="secondary"
                    />
                </div>
            </>
        );
    }

    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <>
                <div>
                    <Heading size="medium" className={spacingStyles.blokkXs}>
                        {`${tekst('meldekortForUke')} 
                        ${hentISOUke(meldekortIkkeKlarForLevering.meldeperiode?.fra!!)} - ${hentISOUke(
                            meldekortIkkeKlarForLevering.meldeperiode?.til!!
                        )} ${tekst('blirTilgjengelig')}  ${datoMedUkedag(
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering),
                            sprak
                        )}`}
                    </Heading>
                    <Utmeldingsinformasjon visUtmeldingsInformasjon={visUtmelding} />
                    <div>
                        <MeldekortKnapp
                            href={omMeldekortLenke}
                            amplitudeTema="meldekort"
                            amplitudeHandling="Går til innsending av meldekort"
                            tittel={tekst('lesOm')}
                            variant="secondary"
                        />
                    </div>
                </div>
            </>
        );
    }

    if (meldekortForLevering.length > 1) {
        return (
            <>
                <div>
                    <Heading size="medium" className={spacingStyles.blokkXs}>
                        {tekst('sendesInn')} {meldekortForLevering.length}
                    </Heading>
                    <Utmeldingsinformasjon visUtmeldingsInformasjon={visUtmelding} />
                    <MeldekortKnapp
                        href={meldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel={tekst('sendInn')}
                        variant="primary"
                    />
                </div>
            </>
        );
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort sluttkort" />
            <div>
                <Meldekortstatus />
                <Utmeldingsinformasjon visUtmeldingsInformasjon={visUtmelding} />
                <div>
                    <MeldekortKnapp
                        href={meldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel={`${tekst('sendInnForUke')}
                        ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} - ${hentISOUke(
                            foerstkommendeMeldekort.meldeperiode?.til!!
                        )}`}
                        variant="primary"
                    />
                </div>
            </div>
            <InViewport loggTekst="Viser meldekort sluttkort i viewport" />
        </>
    );
}

export default MeldekortHovedInnhold;
