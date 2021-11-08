import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { omMeldekortLenke, meldekortLenke } from '../../innhold/lenker';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
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
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';

interface EndStateProps {
    meldekortData: Meldekort.Data | null;
    amplitudeData: AmplitudeData;
    lesIntroPaaNyttCB: () => void;
}

function Sluttkort(props: EndStateProps) {
    const { meldekortData, amplitudeData } = props;
    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);

    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerregistreringData = registreringData?.registrering ?? null;

    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: erSituasjonsbestemtInnsatsgruppe ? 'meldekort - situasjonsbestemt' : 'meldekort',
            handling: 'Leser introduksjonen på nytt',
            ...amplitudeData,
        });
    };

    const handleLesIntroPaaNytt = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        handleKlikkLesIntro();
        props.lesIntroPaaNyttCB();
    };

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <div className={'kortflate'}>
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
                <Normaltekst>
                    <Lenke href={''} onClick={handleLesIntroPaaNytt}>
                        Vis introduksjon til meldekort
                    </Lenke>
                </Normaltekst>
            </div>
        );
    }

    if (meldekortForLevering.length > 1) {
        return (
            <div className={'kortflate'}>
                <div>
                    <Systemtittel className={'blokk-xs'}>
                        Du har {meldekortForLevering.length} meldekort som kan sendes inn.
                    </Systemtittel>
                    <LenkepanelMeldekort amplitudeData={amplitudeData} href={meldekortLenke}>
                        Send inn
                    </LenkepanelMeldekort>
                </div>
                <Normaltekst>
                    <Lenke href={''} onClick={handleLesIntroPaaNytt}>
                        Vis introduksjon til meldekort
                    </Lenke>
                </Normaltekst>
            </div>
        );
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    return (
        <div className={'kortflate'}>
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
            <Normaltekst>
                <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                    Vis introduksjon til meldekort
                </Lenke>
            </Normaltekst>
        </div>
    );
}

export default Sluttkort;
