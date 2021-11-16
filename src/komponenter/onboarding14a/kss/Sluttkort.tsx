import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from '../EgenvurderingKort';
import { kanViseEgenvurdering } from '../../../lib/kan-vise-egenvurdering';
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

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const { antallUleste } = useUlesteDialogerData();

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
