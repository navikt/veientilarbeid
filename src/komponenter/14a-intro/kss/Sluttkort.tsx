import * as React from 'react';
import * as Brukerregistrering from '../../../ducks/brukerregistrering';
import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import RegistrertTeller from '../registrert-teller';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';

interface EndStateProps {
    amplitudeData: AmplitudeData;
    registreringData: Brukerregistrering.Data | null;

    lesIntroPaaNyttCB: () => void;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData, registreringData } = props;
    const { ukerRegistrert } = amplitudeData;
    const registrertDato = registreringData?.registrering?.opprettetDato;
    const registrertOver12Uker = ukerRegistrert > 12;
    const kortTittel = registrertOver12Uker
        ? 'Ta kontakt om du ønsker hjelp'
        : 'Om du ønsker oppfølging før 12 uker må du gi oss beskjed';

    const VeiledersOppgaver = () => {
        return (
            <Normaltekst>
                Veilederen kan besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på veien til arbeid.
            </Normaltekst>
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
            <Systemtittel className={'blokk-xs'}>{kortTittel}</Systemtittel>
            <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />

            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={props.antallUlesteDialoger} />
            {registrertOver12Uker ? (
                <VeiledersOppgaver />
            ) : (
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                        Les om hva slags hjelp du kan få
                    </Lenke>
                </Normaltekst>
            )}
        </div>
    );
}

export default Sluttkort;
