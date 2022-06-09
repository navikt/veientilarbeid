import { Heading, Panel, BodyLong, Link } from '@navikt/ds-react';

import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { skalViseOnboardingStandard } from '../../lib/skal-vise-onboarding-standard';
import Feedback from '../feedback/feedback';
import TallSirkel from '../tall/tall';
import { useArbeidsledigDato } from '../../contexts/arbeidsledig-dato';

const TEKSTER = {
    nb: {
        header: 'Tre viktige ting i din første uke som registrert arbeidssøker',
        trinn1: 'Start på en søknad om dagpenger i dag, slik at du finner ut når du må sende inn søknaden',
        trinn2: 'Les gjennom introduksjonen til meldekort',
        trinn3: 'Finn ut om du er enig i hvordan NAV har vurdert ditt behov for hjelp og støtte',
        feedbackSporsmal: 'Er denne oversikten nyttig?',
    },
    en: {
        header: 'Three important steps in your first week as registered job seeker',
        trinn1: 'Start your application for unemployment benefits today to find out when you need to send the application',
        trinn2: 'Read the introduction for the employment status form',
        trinn3: 'Find out if you agree with how NAV has assessed your need for help and support',
        feedbackSporsmal: 'Is this list of any use to you?',
    },
};

const OnboardingStandard = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const { settVisModal: settVisArbeidsledigDatoModal } = useArbeidsledigDato();
    const visArbeidsLedigDatoLenke = featuretoggleData['veientilarbeid.vis-arbeidsledig-dato'];

    const kanViseKomponent = skalViseOnboardingStandard({
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });

    if (kanViseKomponent)
        return (
            <Panel border className="ramme blokk-s" id="standard-onboarding">
                <ErRendret loggTekst="Rendrer OnboardingStandard" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <BodyLong spacing className="flex">
                    <TallSirkel tall={1} /> {tekst('trinn1')}
                </BodyLong>
                <BodyLong spacing className="flex">
                    <TallSirkel tall={2} /> {tekst('trinn2')}
                </BodyLong>
                <BodyLong spacing className="flex">
                    <TallSirkel tall={3} /> {tekst('trinn3')}
                </BodyLong>
                <Feedback id="standard-onboarding-info" sporsmal={tekst('feedbackSporsmal')} />
                <InViewport loggTekst="Viser OnboardingStandard i viewport" />
                {visArbeidsLedigDatoLenke && (
                    <Link
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            settVisArbeidsledigDatoModal();
                        }}
                    >
                        Velg dato
                    </Link>
                )}
            </Panel>
        );
    return null;
};

export default OnboardingStandard;
