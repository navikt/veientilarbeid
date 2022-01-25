import { Heading } from '@navikt/ds-react';
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
import TemaLenkepanel from '../tema/tema-lenkepanel';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        meldekortForUke: 'Meldekort for uke',
        blirTilgjengelig: 'blir tilgjengelig for innsending fra',
        meldekort: 'Meldekort',
        lesOm: 'Les om meldekort',
        sendesInn: 'Meldekort som kan sendes inn:',
        sendInn: 'Send inn',
        sendInnForUke: 'Send inn for uke',
    },
    en: {
        meldekortForUke: 'The employment status form for weeks',
        blirTilgjengelig: 'is available for submission from',
        meldekort: 'Employment status form',
        lesOm: 'Read about employment status form',
        sendesInn: 'Employment status forms ready for submission:',
        sendInn: 'Submit',
        sendInnForUke: 'Submit for weeks',
    },
};

function Sluttkort() {
    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortData = Meldekort.useMeldekortData();
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

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
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering)
                        )}`}
                    </Heading>
                    <div>
                        <TemaLenkepanel
                            href={omMeldekortLenke}
                            amplitudeTema="meldekort"
                            amplitudeHandling="Går til innsending av meldekort"
                            tittel={tekst('meldekort')}
                            beskrivelse={tekst('lesOm')}
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
                    <TemaLenkepanel
                        href={meldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel={tekst('meldekort')}
                        beskrivelse={tekst('sendInn')}
                    />
                </div>
            </>
        );
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    return (
        <>
            <div>
                <Meldekortstatus />
                <div>
                    <TemaLenkepanel
                        href={meldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel={tekst('meldekort')}
                        beskrivelse={`${tekst('sendInnForUke')}
                        ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} - ${hentISOUke(
                            foerstkommendeMeldekort.meldeperiode?.til!!
                        )}`}
                    />
                </div>
            </div>
        </>
    );
}

export default Sluttkort;
