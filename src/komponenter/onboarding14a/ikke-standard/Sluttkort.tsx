import * as React from 'react';
import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';

interface EndStateProps {
    amplitudeData: AmplitudeData;

    lesIntroPaaNyttCB: () => void;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;

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
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                        Les om hva slags hjelp du kan få
                    </Lenke>
                </Normaltekst>
            </>
        );
    };

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Leser introduksjonen på nytt',
            ...amplitudeData,
        });
    };

    function handleLesIntroPaaNytt(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleKlikkLesIntro();
        props.lesIntroPaaNyttCB();
    }

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
