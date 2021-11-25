import { useBrukerregistreringData } from '../../../contexts/brukerregistrering';
import { Systemtittel } from 'nav-frontend-typografi';
import RegistrertTeller from '../registrert-teller';
import { dialogLenke } from '../../../innhold/lenker';
import Lenkepanel14A from '../lenkepanel-14a';
import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from '../egenvurderingIVURD';
import { kanViseIVURDEgenvurdering } from '../../../lib/kan-vise-IVURD-egenvurdering';
import { useFeatureToggleData } from '../../../contexts/feature-toggles';
import { useUnderOppfolgingData } from '../../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../../contexts/autentisering';
import { useEgenvurderingData } from '../../../contexts/egenvurdering';
import { useOppfolgingData } from '../../../contexts/oppfolging';
import { hentFraBrowserStorage } from '../../../utils/browserStorage-utils';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../../contexts/ulestedialoger';

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();

    const { antallUleste } = useUlesteDialogerData();

    const registrertDato = registreringData?.registrering?.opprettetDato;
    const kortTittel = 'Om du ønsker oppfølging må du gi oss beskjed';

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const skalViseEgenvurdering = kanViseIVURDEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const EgenVurderingMedLesLink = () => {
        return <EgenvurderingKort />;
    };

    const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);
    if (featuretoggleEgenvurderingAktivert && skalViseEgenvurdering && !harAvslattEgenvurdering)
        return <EgenVurderingMedLesLink />;

    return (
        <>
            <Systemtittel className={'blokk-xs'}>{kortTittel}</Systemtittel>
            <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
            <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
        </>
    );
}

export default Sluttkort;
