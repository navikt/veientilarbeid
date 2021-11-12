import * as React from 'react';
import * as Brukerregistrering from '../../../contexts/brukerregistrering';
import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import RegistrertTeller from '../registrert-teller';
import Lenkepanel14A from '../lenkepanel-14a';
import Lenke from 'nav-frontend-lenker';
import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from '../EgenvurderingKort';
import { kanViseEgenvurdering } from '../../../lib/kan-vise-egenvurdering';
import { useFeatureToggleData } from '../../../contexts/feature-toggles';
import { useUnderOppfolgingData } from '../../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../../contexts/autentisering';
import { useEgenvurderingData } from '../../../contexts/egenvurdering';
import { useOppfolgingData } from '../../../contexts/oppfolging';
import { hentFraBrowserStorage } from '../../../utils/browserStorage-utils';

interface EndStateProps {
    amplitudeData: AmplitudeData;
    registreringData: Brukerregistrering.Data | null;

    lesIntroPaaNyttCB: () => void;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData, registreringData } = props;
    const { ukerRegistrert } = amplitudeData;

    const featuretoggleData = useFeatureToggleData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();

    const registrertDato = registreringData?.registrering?.opprettetDato;
    const kortTittel = 'Om du ønsker oppfølging må du gi oss beskjed';

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const skalViseEgenvurdering = kanViseEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const EgenVurderingMedLesLink = () => {
        return (
            <div className="sluttkort">
                <EgenvurderingKort />
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                        Les om hva slags hjelp du kan få
                    </Lenke>
                </Normaltekst>
            </div>
        );
    };

    const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);
    if (featuretoggleEgenvurderingAktivert && skalViseEgenvurdering && !harAvslattEgenvurdering)
        return <EgenVurderingMedLesLink />;

    const VeiledersOppgaver = () => {
        return (
            <Normaltekst>
                <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                    Les om hva slags hjelp du kan få
                </Lenke>
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
            <Systemtittel className={'blokk-xs'}>{kortTittel}</Systemtittel>
            <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={props.antallUlesteDialoger} />
            <VeiledersOppgaver />
        </div>
    );
}

export default Sluttkort;
