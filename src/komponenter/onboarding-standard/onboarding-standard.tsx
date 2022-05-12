import { Heading, Panel, BodyLong } from '@navikt/ds-react';

import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { DinSituasjonSvar, useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import Feedback from '../feedback/feedback';

const TEKSTER = {
    nb: {
        header: 'Tre viktige ting fordi du nettopp har registrert deg',
        trinn1: 'Det kan være lurt å starte på en søknad om dagpenger i dag, slik at du finner ut når du må sende inn søknaden',
        trinn2: 'Les gjennom introduksjonen til meldekort',
        trinn3: 'Finn ut om du er enig i vurderingene NAV har gjort hva gjelder ditt behov for oppfølging',
    },
    en: {},
};

const OnboardingStandard = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon = registreringData?.registrering?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const harRettSituasjon = [
        DinSituasjonSvar.HAR_SAGT_OPP,
        DinSituasjonSvar.MISTET_JOBBEN,
        DinSituasjonSvar.ER_PERMITTERT,
    ].includes(dinSituasjon);
    const brukerErStandard = erStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const featuretoggleData = useFeatureToggleData();
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.vis-onboarding-standard'];

    if (brukerErStandard && harRettSituasjon && featuretoggleAktivert)
        return (
            <Panel border className="ramme blokk-s" id="standard-onboarding">
                <ErRendret loggTekst="Rendrer OnboardingStandard" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <BodyLong spacing>1. {tekst('trinn1')}</BodyLong>
                <BodyLong spacing>2. {tekst('trinn2')}</BodyLong>
                <BodyLong spacing>3. {tekst('trinn3')}</BodyLong>
                <Feedback id="standard-onboarding-info" />
                <InViewport loggTekst="Viser OnboardingStandard i viewport" />
            </Panel>
        );
    return null;
};

export default OnboardingStandard;
