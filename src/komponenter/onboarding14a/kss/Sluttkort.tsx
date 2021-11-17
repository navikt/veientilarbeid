import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import EgenvurderingUke0, { AVSLAATT_EGENVURDERING } from '../egenvurdering-uke0';
import { kanViseIVURDEgenvurdering } from '../../../lib/kan-vise-IVURD-egenvurdering';
import { useUnderOppfolgingData } from '../../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../../contexts/autentisering';
import { useEgenvurderingData } from '../../../contexts/egenvurdering';
import { useOppfolgingData } from '../../../contexts/oppfolging';
import { useFeatureToggleData } from '../../../contexts/feature-toggles';
import RegistrertTeller from '../registrert-teller';
import Lenkepanel14A from '../lenkepanel-14a';
import { hentFraBrowserStorage } from '../../../utils/browserStorage-utils';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useBrukerregistreringData } from '../../../contexts/brukerregistrering';
import { useUlesteDialogerData } from '../../../contexts/ulestedialoger';
import EgenvurderingUke12, { INTRO_KEY_12UKER } from '../egenvurdering-uke12';
import { kanVise12UkerEgenvurdering } from '../../../lib/kan-vise-12-uker-egenvurdering';
import { useBrukerinfoData } from '../../../contexts/bruker-info';

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const brukerInfoData = useBrukerinfoData();
    const featuretoggleData = useFeatureToggleData();
    const { antallUleste } = useUlesteDialogerData();

    const registrertDato = registreringData?.registrering?.opprettetDato;
    const registrertOver12Uker = ukerRegistrert > 12;
    const kortTittel = registrertOver12Uker
        ? 'Ta kontakt om du ønsker hjelp'
        : 'Om du ønsker oppfølging før 12 uker må du gi oss beskjed';

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const skalViseIVUREgenvurdering = kanViseIVURDEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;
    const visEgenvurderingsUke12 = kanVise12UkerEgenvurdering({
        brukerInfoData,
        egenvurderingData,
        oppfolgingData,
        registreringData,
        amplitudeData,
        featuretoggleData,
        sistVistFraLocalstorage: sistSettEgenvurdering,
    });

    const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);
    if (featuretoggleEgenvurderingAktivert && skalViseIVUREgenvurdering && !harAvslattEgenvurdering)
        return <EgenvurderingUke0 />;

    if (visEgenvurderingsUke12) {
        return <EgenvurderingUke12 />;
    }

    return (
        <>
            <Systemtittel className={'blokk-xs'}>{kortTittel}</Systemtittel>
            <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />

            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={antallUleste} />
            {registrertOver12Uker && (
                <Normaltekst>
                    Veilederen kan besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på veien til
                    arbeid.
                </Normaltekst>
            )}
        </>
    );
}

export default Sluttkort;
