import { useEffect, useState } from 'react';
import { Heading, Panel, BodyLong, Link } from '@navikt/ds-react';

import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { fetchToJson } from '../../ducks/api-utils';
import { GJELDER_FRA_DATO_URL, requestConfig } from '../../ducks/api';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useSprakValg } from '../../contexts/sprak';
import { useBrukerregistreringData, DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { skalViseOnboardingStandard } from '../../lib/skal-vise-onboarding-standard';
import { useArbeidsledigDato } from '../../contexts/arbeidsledig-dato';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import Feedback from '../feedback/feedback';
import TallSirkel from '../tall/tall';
import hentTekstnokkelForOnboardingTrinn1 from '../../lib/hent-tekstnokkel-for-onboarding-trinn1';

const TEKSTER = {
    nb: {
        header: 'Tre viktige ting i din første uke som registrert arbeidssøker',
        trinn1: 'Start på en søknad om dagpenger i dag, slik at du finner ut når du må sende inn søknaden',
        trinn1Fortid:
            'Du bør sende inn søknad om dagpenger i dag. Om du mangler dokumentasjon, bør du heller ettersende disse senere. Det viktige nå er at du får sendt inn søknaden så raskt som mulig.',
        trinn1Idag:
            'Du bør sende inn søknad om dagpenger senest i morgen. Hvis du sender inn søknaden senere vil du få mindre i dagpenger på din første utbetaling',
        trinn1Imorgen:
            'Du bør sende inn søknad om dagpenger i dag. Hvis du sender inn søknaden senere vil du få mindre i dagpenger på din første utbetaling',
        trinn1Fremtid:
            'Du bør sende søknaden om dagpenger tidligst 10. juni og senest 20 juni. Det er lurt starte på søknaden allerede nå, sånn at du finner ut hvilke dokumenter du må få tak i', // TODO: fiks datoer i teksten
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

function beregnUtforteTrinn(
    dagpengestatus: string | undefined,
    harSettMeldekortIntro: string | null,
    harSettOppfolgingIntro: string | null
) {
    const trinn = [];
    if (dagpengestatus && ['sokt', 'paabegynt'].includes(dagpengestatus)) {
        trinn.push(1);
    }
    if (harSettMeldekortIntro && harSettMeldekortIntro === 'true') {
        trinn.push(2);
    }
    if (harSettOppfolgingIntro && harSettOppfolgingIntro === 'true') {
        trinn.push(3);
    }
    return trinn;
}

function beregnNesteTrinn(utforteTrinn: Number[]) {
    let nesteTrinn = 0;
    if (!utforteTrinn.includes(1)) {
        nesteTrinn = 1;
    }
    if (utforteTrinn.includes(1) && !utforteTrinn.includes(2)) {
        nesteTrinn = 2;
    }
    if (utforteTrinn.includes(1) && utforteTrinn.includes(2) && !utforteTrinn.includes(3)) {
        nesteTrinn = 3;
    }
    return nesteTrinn;
}

const OnboardingStandard = () => {
    const [gjelderFraDato, settGjelderFraDato] = useState<string | null>(null);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const { dagpengestatus } = useAmplitudeData();
    const { settVisModal: settVisArbeidsledigDatoModal } = useArbeidsledigDato();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon = brukerregistreringData?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const harMistetJobben = dinSituasjon === DinSituasjonSvar.MISTET_JOBBEN;
    const visArbeidsLedigDatoLenke = featuretoggleData['veientilarbeid.vis-arbeidsledig-dato'] && harMistetJobben;

    const hentGjelderFraDato = async () => {
        try {
            const { dato } = await fetchToJson(GJELDER_FRA_DATO_URL, requestConfig());
            settGjelderFraDato(dato);
        } catch (error) {
            console.error(error);
        }
    };

    const kanViseKomponent = skalViseOnboardingStandard({
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });

    const harSettMeldekortIntro = hentFraBrowserStorage('meldekortintro');
    const harSettOppfolgingIntro = hentFraBrowserStorage('14a-intro');
    const utforteTrinn = beregnUtforteTrinn(dagpengestatus, harSettMeldekortIntro, harSettOppfolgingIntro);
    const nesteTrinn = beregnNesteTrinn(utforteTrinn);

    useEffect(() => {
        if (kanViseKomponent && visArbeidsLedigDatoLenke) {
            hentGjelderFraDato();
        }
    }, [kanViseKomponent, visArbeidsLedigDatoLenke]);

    if (kanViseKomponent)
        return (
            <Panel border className="ramme blokk-s" id="standard-onboarding">
                <ErRendret loggTekst="Rendrer OnboardingStandard" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <BodyLong spacing className={`flex${utforteTrinn.includes(1) ? ' inaktiv' : ''}`}>
                    <TallSirkel tall={1} aktiv={nesteTrinn === 1} inaktiv={utforteTrinn.includes(1)} />{' '}
                    {tekst(hentTekstnokkelForOnboardingTrinn1(gjelderFraDato))}
                </BodyLong>
                <BodyLong spacing className={`flex${utforteTrinn.includes(2) ? ' inaktiv' : ''}`}>
                    <TallSirkel tall={2} aktiv={nesteTrinn === 2} inaktiv={utforteTrinn.includes(2)} />{' '}
                    {tekst('trinn2')}
                </BodyLong>
                <BodyLong spacing className={`flex${utforteTrinn.includes(3) ? ' inaktiv' : ''}`}>
                    <TallSirkel tall={3} aktiv={nesteTrinn === 3} inaktiv={utforteTrinn.includes(3)} />{' '}
                    {tekst('trinn3')}
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
