import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { OppfolgingContext, Servicegruppe } from '../../../context/oppfolging';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';
import { useContext } from 'react';
import Feedback from '../../feedback/feedback';

interface EndStateProps {
    amplitudeData: AmplitudeData;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;
    const { servicegruppe } = useContext(OppfolgingContext).data;

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            brukergruppe: 'Standard innsats',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };
    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    const VeiledersOppgaver = () => {
        return (
            <>
                <div>
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
                    <Lenkepanel14A
                        amplitudeData={amplitudeData}
                        href={''}
                        antallUlesteDialoger={props.antallUlesteDialoger}
                    />
                </div>
                <Normaltekst className={'blokk-m'}>
                    Har du spørsmål om dagpenger, eller andre søknader, må du bruke{' '}
                    <Lenke
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra 14a sluttkort',
                                'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                            )
                        }
                    >
                        skriv til oss
                    </Lenke>{' '}
                    eller{' '}
                    <Lenke
                        href="https://www.nav.no/person/kontakt-oss/chat/"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til Chat fra 14a sluttkort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        chat
                    </Lenke>
                    .
                </Normaltekst>
                <Feedback id={'Introkort14A-01-ikke-standard'} />
            </>
        );
    };

    return (
        <div className={'sluttkort'}>
            <VeiledersOppgaver />
        </div>
    );
}

export default Sluttkort;
