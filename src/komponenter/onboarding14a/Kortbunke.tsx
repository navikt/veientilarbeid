import * as React from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { fjernFraBrowserStorage, hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { kanVise12UkerEgenvurdering } from '../12uker-egenvurdering/12uker-egenvurdering';
import EgenVurdering from '../12uker-egenvurdering/12uker-egenvurdering';
import { KssStartkort, KssKortliste, KssSluttkort } from './kss';
import { StandardStartkort, StandardKortliste, StandardSluttkort } from './standardinnsats';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Onboarding from '../onboarding/onboarding';
import './14a-intro.less';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';

const INTRO_KEY_14A = '14a-intro';
const INTRO_KEY_12UKER = '12uker-egenvurdering';

interface IntroProps {
    visKvittering?: string;
}

function Intro14AWrapper(props: IntroProps) {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const brukerInfoData = useBrukerinfoData();
    const featuretoggleData = useFeatureToggleData();

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;
    const erNyregistrert = amplitudeData.ukerRegistrert === 0;

    const [visEgenvurderingsKomponent, setVisEgenvurderingsKomponent] = React.useState<boolean>(
        kanVise12UkerEgenvurdering({
            brukerInfoData,
            egenvurderingData,
            oppfolgingData,
            registreringData,
            amplitudeData,
            featuretoggleData,
            sistVistFraLocalstorage: sistSettEgenvurdering,
        })
    );

    const ikkeStandardToggle = featuretoggleData['veientilarbeid.onboarding14a.situasjonsbestemt'];

    const skalViseKssKort = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseKomponent =
        (erStandardInnsatsgruppe && !visEgenvurderingsKomponent) ||
        (ikkeStandardToggle && !erStandardInnsatsgruppe && !visEgenvurderingsKomponent);

    const [Startkort, Kortliste, Sluttkort] = skalViseKssKort
        ? [KssStartkort, KssKortliste, KssSluttkort]
        : [StandardStartkort, StandardKortliste, StandardSluttkort];

    if (visEgenvurderingsKomponent) {
        fjernFraBrowserStorage(INTRO_KEY_14A);
        return <EgenVurdering setVisEgenvurderingsKomponent={setVisEgenvurderingsKomponent} />;
    }

    if (!kanViseKomponent) {
        fjernFraBrowserStorage(INTRO_KEY_14A);
        return null;
    }

    const innhold = (
        <Onboarding
            innhold={[<Startkort />, ...Kortliste, <Sluttkort />]}
            header="Hjelp og støtte"
            hoppOverPreState={false}
            hoppRettTilSluttkort={!erNyregistrert}
            id={INTRO_KEY_14A}
            lesPaaNyttLnkeTekst="Les om hva slags hjelp du kan få"
        />
    );

    return innhold;
}

export default Intro14AWrapper;
