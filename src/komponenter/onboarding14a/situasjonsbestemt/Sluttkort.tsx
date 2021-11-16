import { amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Servicegruppe, useOppfolgingData } from '../../../contexts/oppfolging';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../../contexts/ulestedialoger';

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { antallUleste } = useUlesteDialogerData();
    const { servicegruppe } = useOppfolgingData();

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    return (
        <>
            <Systemtittel className={'blokk-xs'}>
                {servicegruppe === Servicegruppe.BFORM
                    ? 'Ta kontakt om du har spørsmål'
                    : 'Du vil motta et brev som forteller hva NAV kan hjelpe deg med'}
            </Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                {servicegruppe === Servicegruppe.BFORM ? (
                    <>
                        Du har mottatt brevet{' '}
                        <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                            «NAV har vurdert mulighetene dine på arbeidsmarkedet»
                        </Lenke>
                        .
                    </>
                ) : (
                    <>
                        Brevet får du sendt til{' '}
                        <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                            innboksen
                        </Lenke>{' '}
                        din innen én uke.
                    </>
                )}
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Du kan stille spørsmål til veileder ved å henvende deg via dialogen.
            </Normaltekst>
            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={antallUleste} />
        </>
    );
}

export default Sluttkort;
