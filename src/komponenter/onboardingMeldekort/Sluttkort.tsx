import { Systemtittel } from 'nav-frontend-typografi';
import { omMeldekortLenke, meldekortLenke } from '../../innhold/lenker';
import { hentIDag } from '../../utils/chrono';
import { datoUtenTid, hentISOUke, datoMedUkedag } from '../../utils/date-utils';
import {
    hentMeldekortForLevering,
    hentFoerstkommendeMeldekortIkkeKlarForLevering,
    foersteSendedagForMeldekort,
} from '../../utils/meldekort-utils';
import * as Meldekort from '../../contexts/meldekort';
import LenkepanelMeldekort from './lenkepanel-Meldekort';
import Meldekortstatus from './meldekortstatus';
import { useAmplitudeData } from '../../contexts/amplitude-context';

function Sluttkort() {
    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortData = Meldekort.useMeldekortData();
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);
    const amplitudeData = useAmplitudeData();

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <>
                <div>
                    <Systemtittel className={'blokk-xs'}>
                        {`Meldekort for uke 
                        ${hentISOUke(meldekortIkkeKlarForLevering.meldeperiode?.fra!!)} og ${hentISOUke(
                            meldekortIkkeKlarForLevering.meldeperiode?.til!!
                        )} blir tilgjengelig for innsending fra ${datoMedUkedag(
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering)
                        )}`}
                    </Systemtittel>
                    <div>
                        <LenkepanelMeldekort amplitudeData={amplitudeData} href={omMeldekortLenke}>
                            Les om meldekort
                        </LenkepanelMeldekort>
                    </div>
                </div>
            </>
        );
    }

    if (meldekortForLevering.length > 1) {
        return (
            <>
                <div>
                    <Systemtittel className={'blokk-xs'}>
                        Du har {meldekortForLevering.length} meldekort som kan sendes inn.
                    </Systemtittel>
                    <LenkepanelMeldekort amplitudeData={amplitudeData} href={meldekortLenke}>
                        Send inn
                    </LenkepanelMeldekort>
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
                    <LenkepanelMeldekort amplitudeData={amplitudeData} href={meldekortLenke}>
                        {`Send inn for uke 
                        ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} og ${hentISOUke(
                            foerstkommendeMeldekort.meldeperiode?.til!!
                        )}`}
                    </LenkepanelMeldekort>
                </div>
            </div>
        </>
    );
}

export default Sluttkort;
