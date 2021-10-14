import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Element, Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import { OppfolgingContext, Servicegruppe } from '../../../ducks/oppfolging';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';
import { useContext } from 'react';
import Feedback from '../../feedback/feedback';

interface EndStateProps {
    amplitudeData: AmplitudeData;

    lesIntroPaaNyttCB: () => void;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;
    const { servicegruppe } = useContext(OppfolgingContext).data;
    console.log('sluttkort');
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
                    <Systemtittel>Hva slags hjelp kan du forvente å få?</Systemtittel>
                    <Undertekst className="blokk-xs">1 av 3</Undertekst>

                    <Normaltekst className={'blokk-xs'}>
                        {servicegruppe === Servicegruppe.IKVAL ? (
                            <>
                                Du har mottatt brevet{' '}
                                <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                    «NAV har vurdert dine muligheter»
                                </Lenke>
                                .
                            </>
                        ) : (
                            <>
                                Brevet får du sendt til
                                <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                    innboksen
                                </Lenke>
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
                </div>
                <Feedback id={'Introkort14A-01-ikke-standard'} />
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
                        «Skriv til oss»
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
                        «Chat»
                    </Lenke>
                    .
                </Normaltekst>
            </>
        );
    };

    return (
        <div className={'sluttkort'}>
            <Element tag={'h1'}>OPPFØLGING</Element>
            <Systemtittel className={'blokk-xs'}>Ta kontakt om du har spørsmål</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Har du spørsmål til veileder eller ting du vil fortelle til veileder kan du starte en dialog.
            </Normaltekst>
            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={props.antallUlesteDialoger} />
            <VeiledersOppgaver />
        </div>
    );
}

export default Sluttkort;
