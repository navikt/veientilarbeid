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

function Sluttkort() {
    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortData = Meldekort.useMeldekortData();
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <>
                <div>
                    <Heading size="medium" className="blokk-xs">
                        {`Meldekort for uke 
                        ${hentISOUke(meldekortIkkeKlarForLevering.meldeperiode?.fra!!)} og ${hentISOUke(
                            meldekortIkkeKlarForLevering.meldeperiode?.til!!
                        )} blir tilgjengelig for innsending fra ${datoMedUkedag(
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering)
                        )}`}
                    </Heading>
                    <div>
                        <TemaLenkepanel
                            href={omMeldekortLenke}
                            amplitudeTema="meldekort"
                            amplitudeHandling="Går til innsending av meldekort"
                            tittel="Meldekort"
                            beskrivelse="Les om meldekort"
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
                        Du har {meldekortForLevering.length} meldekort som kan sendes inn.
                    </Heading>
                    <TemaLenkepanel
                        href={meldekortLenke}
                        amplitudeTema="meldekort"
                        amplitudeHandling="Går til innsending av meldekort"
                        tittel="Meldekort"
                        beskrivelse="Send inn"
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
                        tittel="Meldekort"
                        beskrivelse={`Send inn for uke 
                        ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} og ${hentISOUke(
                            foerstkommendeMeldekort.meldeperiode?.til!!
                        )}`}
                    />
                </div>
            </div>
        </>
    );
}

export default Sluttkort;
