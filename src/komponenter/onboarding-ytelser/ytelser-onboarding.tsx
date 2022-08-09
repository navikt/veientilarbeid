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
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import beregnDagpengeStatus from '../../lib/beregn-dagpenge-status';
import harIkkeStartetDagpengesoknad from '../../lib/har-ikke-startet-dagpengesoknad';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useDpInnsynSoknadData } from '../../contexts/dp-innsyn-soknad';
import { useDpInnsynVedtakData } from '../../contexts/dp-innsyn-vedtak';
import FotnoterYtelser from './fotnoter-ytelser';

const TEKSTER: Tekster<string> = {
    nb: {
        header: 'Spørsmål om ytelser',
        onboardingHeader: 'Dagpenger',
    },
    en: {
        header: 'Questions about benefits',
        onboardingHeader: 'Unemployment benefits',
    },
};

function YtelserOnboarding() {
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const paabegynteSoknader = useDpInnsynPaabegynteSoknaderData();
    const innsendteSoknader = useDpInnsynSoknadData();
    const dagpengeVedtak = useDpInnsynVedtakData();
    const amplitudeData = useAmplitudeData();
    const YTELSER_TEMA_VIS_KEY = 'ytelser_tema_vis_key';

    const kanViseDagpengerKomponent = kanViseOnboardingDagpenger({
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const [valgtYtelserVisning, setValgtYtelserVisning] = useState<string>(
        hentFraBrowserStorage(YTELSER_TEMA_VIS_KEY) || (kanViseDagpengerKomponent ? 'dagpenger' : 'ytelser')
    );

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleByttKortKlikk = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: 'ytelser',
            handling: `Avviser dagpenger-tema`,
            ...amplitudeData,
        });
        const valgtVisning = valgtYtelserVisning === 'dagpenger' ? 'ytelser' : 'dagpenger';
        setValgtYtelserVisning(valgtVisning);
        settIBrowserStorage(YTELSER_TEMA_VIS_KEY, valgtVisning);
    };

    const kanViseYtelserKomponent = kanViseOnboardingYtelser({
        amplitudeData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
    });

    if (!kanViseYtelserKomponent && !kanViseDagpengerKomponent) return null;

    if (featuretoggleData['veientilarbeid.ny-dagpengekomponent']) return null;

    const visOnboardingDagpenger = featuretoggleData['veientilarbeid.onboardingDagpenger'];

    if (!visOnboardingDagpenger || (kanViseYtelserKomponent && valgtYtelserVisning === 'ytelser')) {
        return (
            <Tema
                header={tekst('header')}
                innhold={[
                    <>
                        <SluttkortYtelser />
                    </>,
                ]}
                fotnoterInnhold={[
                    <>
                        <FotnoterYtelser
                            valgtYtelse={valgtYtelserVisning}
                            handleByttKortKlikk={handleByttKortKlikk}
                            kanViseDagpengerKomponent={kanViseDagpengerKomponent}
                            dagpengeStatus={dagpengeStatus}
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
                header={tekst('onboardingHeader')}
                innhold={[
                    <>
                        <SluttkortDagpenger />
                    </>,
                ]}
                fotnoterInnhold={[
                    <>
                        <FotnoterYtelser
                            valgtYtelse={valgtYtelserVisning}
                            handleByttKortKlikk={handleByttKortKlikk}
                            kanViseDagpengerKomponent={kanViseDagpengerKomponent}
                            dagpengeStatus={dagpengeStatus}
                        />
                    </>,
                ]}
                id="dagpenger"
                hoppOverPreState={false}
                amplitudeTemaTag="dagpenger"
                erStartkortOgSluttkort={harIkkeStartetDagpengesoknad(dagpengeStatus)}
            />
        );
    }
    return null;
}

export default YtelserOnboarding;
