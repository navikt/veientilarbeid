import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from '../EgenvurderingKort';
import { kanViseEgenvurdering } from '../../../lib/kan-vise-egenvurdering';
import * as Brukerregistrering from '../../../contexts/brukerregistrering';
import { AmplitudeData, amplitudeLogger } from '../../../metrics/amplitude-utils';
import { useUnderOppfolgingData } from '../../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../../contexts/autentisering';
import { useEgenvurderingData } from '../../../contexts/egenvurdering';
import { useOppfolgingData } from '../../../contexts/oppfolging';
import { useFeatureToggleData } from '../../../contexts/feature-toggles';
import RegistrertTeller from '../registrert-teller';
import Lenkepanel14A from '../lenkepanel-14a';
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
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const registrertDato = registreringData?.registrering?.opprettetDato;
    const registrertOver12Uker = ukerRegistrert > 12;
    const kortTittel = registrertOver12Uker
        ? 'Ta kontakt om du ønsker hjelp'
        : 'Om du ønsker oppfølging før 12 uker må du gi oss beskjed';

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const skalViseEgenvurdering = kanViseEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

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

    return (
        <div className={'sluttkort'}>
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
