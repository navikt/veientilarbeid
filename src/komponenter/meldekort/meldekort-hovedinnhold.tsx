import { Alert, BodyLong, Heading } from '@navikt/ds-react';

import { omMeldekortLenke, meldekortLenke } from '../../innhold/lenker';
import { hentIDag } from '../../utils/chrono';
import { datoUtenTid, hentISOUke, datoMedUkedag } from '../../utils/date-utils';
import {
    hentMeldekortForLevering,
    hentFoerstkommendeMeldekortIkkeKlarForLevering,
    foersteSendedagForMeldekort,
} from '../../utils/meldekort-utils';
import * as Meldekort from '../../contexts/meldekort';
import Meldekortstatus from './meldekortstatus';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import MeldekortKnapp from './meldekort-knapp';

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
    },
};

function MeldekortHovedInnhold() {
    const meldekortData = Meldekort.useMeldekortData();
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (meldekortData === null) {
        return (
            <>
                <ErRendret loggTekst="Rendrer feilmelding for meldekort" />
                <Alert variant={'warning'} className={'mb-1 mt-1'} fullWidth={false}>
                    <BodyLong>{tekst('feilmelding')}</BodyLong>
                </Alert>
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
                    <Heading size="medium" className="blokk-xs">
                        {`${tekst('meldekortForUke')} 
                        ${hentISOUke(meldekortIkkeKlarForLevering.meldeperiode?.fra!!)} - ${hentISOUke(
                            meldekortIkkeKlarForLevering.meldeperiode?.til!!
                        )} ${tekst('blirTilgjengelig')}  ${datoMedUkedag(
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering),
                            sprak
                        )}`}
                    </Heading>
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
                    <Heading size="medium" className="blokk-xs">
                        {tekst('sendesInn')} {meldekortForLevering.length}
                    </Heading>
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
