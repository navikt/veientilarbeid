import { useState } from 'react';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { kanViseOnboardingYtelser } from '../../lib/kan-vise-ytelser';
import SluttkortYtelser from './ytelser/sluttkort';
import SluttkortDagpenger from './dagpenger/sluttkort';
import Tema from '../tema/tema';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { kanViseOnboardingDagpenger } from '../../lib/kan-vise-onboarding-dagpenger';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import ByttKortLenke from './bytt-kort-lenke';

function YtelserOnboarding() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();
    const YTELSER_TEMA_VIS_KEY = 'ytelser_tema_vis_key';

    const [valgtYtelserVisning, setValgtYtelserVisning] = useState<string>(
        hentFraBrowserStorage(YTELSER_TEMA_VIS_KEY) || 'ytelser'
    );

    const handleByttKortKlikk = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: 'ytelser',
            handling: `Avviser dagpenger-tema`,
            amplitudeData,
        });
        const valgtVisning = valgtYtelserVisning === 'dagpenger' ? 'ytelser' : 'dagpenger';
        setValgtYtelserVisning(valgtVisning);
        settIBrowserStorage(YTELSER_TEMA_VIS_KEY, valgtVisning);
    };

    const kanViseYtelserKomponent = kanViseOnboardingYtelser({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseDagpengerKomponent = kanViseOnboardingDagpenger({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    if (!kanViseYtelserKomponent && !kanViseDagpengerKomponent) return null;

    const visOnboardingDagpenger = featuretoggleData['veientilarbeid.onboardingDagpenger'];

    if (!visOnboardingDagpenger || (kanViseYtelserKomponent && valgtYtelserVisning === 'ytelser')) {
        return (
            <Tema
                header="Spørsmål om ytelser"
                innhold={[
                    <>
                        <SluttkortYtelser />
                        <ByttKortLenke
                            handleByttKortKlikk={handleByttKortKlikk}
                            valgtYtelserVisning={valgtYtelserVisning}
                        />
                    </>,
                ]}
                id="ytelser"
                hoppOverPreState={false}
                amplitudeTemaTag="ytelser"
            />
        );
    }
    if (visOnboardingDagpenger && kanViseDagpengerKomponent && valgtYtelserVisning === 'dagpenger') {
        return (
            <Tema
                header="Dagpenger"
                innhold={[
                    <>
                        <SluttkortDagpenger />
                        <ByttKortLenke
                            handleByttKortKlikk={handleByttKortKlikk}
                            valgtYtelserVisning={valgtYtelserVisning}
                        />
                    </>,
                ]}
                id="dagpenger"
                hoppOverPreState={false}
                amplitudeTemaTag="ytelser"
            />
        );
    }
    return null;
}

export default YtelserOnboarding;
