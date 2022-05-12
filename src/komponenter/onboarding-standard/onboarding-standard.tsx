import { Heading, Panel } from '@navikt/ds-react';

import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

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
    const brukerErStandard = erStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const featuretoggleData = useFeatureToggleData();
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.vis-onboarding-standard'];

    if (brukerErStandard && featuretoggleAktivert)
        return (
            <Panel border className="ramme blokk-s" id="standard-onboarding">
                <ErRendret loggTekst="Rendrer OnboardingStandard" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <ol className="blokk-s">
                    {tekst('description')}
                    <li>{tekst('trinn1')}</li>
                    <li>{tekst('trinn2')}</li>
                    <li>{tekst('trinn3')}</li>
                </ol>
                <InViewport loggTekst="Viser OnboardingStandard i viewport" />
            </Panel>
        );
    return null;
};

export default OnboardingStandard;
