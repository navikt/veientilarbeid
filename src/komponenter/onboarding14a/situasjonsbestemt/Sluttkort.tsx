import { Normaltekst, Systemtittel, Element } from 'nav-frontend-typografi';
import { Servicegruppe, useOppfolgingData } from '../../../contexts/oppfolging';
import Lenkepanel14A from '../lenkepanel-14a';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../../contexts/ulestedialoger';
import { behovsvurderingLenke, dialogLenke } from '../../../innhold/lenker';
import { hentEllerSettFraBrowserStorage } from '../../../utils/browserStorage-utils';
import { HAR_MOTTATT_EGENVURDERING_KVITTERING } from '../../kvitteringer/behovsvurdering';
import TemaLenkepanel from '../../tema/tema-lenkepanel';

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { antallUleste } = useUlesteDialogerData();
    const { servicegruppe } = useOppfolgingData();

    const har_mottatt_egenvurdering_kvittering = hentEllerSettFraBrowserStorage(
        HAR_MOTTATT_EGENVURDERING_KVITTERING,
        ''
    );

    if (servicegruppe === Servicegruppe.BFORM) {
        return (
            <>
                <Systemtittel className={'blokk-xs'}>Du har rett på å få hjelp og støtte fra en veileder</Systemtittel>

                <Normaltekst className={'blokk-xs'}>
                    Du kan stille spørsmål til veileder ved å henvende deg via dialogen.
                </Normaltekst>
                <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
            </>
        );
    } else if (!har_mottatt_egenvurdering_kvittering) {
        return (
            <>
                <Systemtittel className={'blokk-xs'}>
                    Du vil motta et brev som forteller hva NAV kan tilby deg av hjelp
                </Systemtittel>

                <Normaltekst className={'blokk-xs'}>
                    Til vanlig sender vi brevet innen noen uker. Tar det lengre tid vil vi ta kontakt.
                </Normaltekst>
                <Normaltekst className={'blokk-xs'}>
                    Du kan når som helst ta kontakt og fortelle oss hva du ønsker at vi hjelper deg med.
                </Normaltekst>
                <TemaLenkepanel
                    href={`${behovsvurderingLenke}/hvilken-veiledning-trengs`}
                    amplitudeTema={'14a'}
                    amplitudeTilstand="sluttkort"
                    amplitudeHandling={'går til egenvurdering fra '}
                >
                    <Element>Hva trenger du hjelp til?</Element>
                    <Normaltekst>Svar oss her</Normaltekst>
                </TemaLenkepanel>
            </>
        );
    }
    return (
        <>
            <Systemtittel className={'blokk-xs'}>
                Du vil motta et brev som forteller hva NAV kan tilby deg av hjelp
            </Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Du får tilsendt brevet i løpet av noen uker. Tar det lengre tid vil vi ta kontakt.
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Du kan stille spørsmål til veileder ved å henvende deg via dialogen.
            </Normaltekst>

            <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
        </>
    );
}

export default Sluttkort;
