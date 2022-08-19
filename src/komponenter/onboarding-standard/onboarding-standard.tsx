import { useEffect, useState } from 'react';
import { Heading, Panel, BodyLong, Link, BodyShort } from '@navikt/ds-react';
import ukerFraDato from '@alheimsins/uker-fra-dato';

import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useSprakValg } from '../../contexts/sprak';
import { useBrukerregistreringData, DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { erStandardTilknyttetArbeid } from '../../lib/er-standard-tilknyttet-arbeid';
import { useGjelderFraDatoModal } from '../../contexts/gjelder-fra-dato-modal';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import Feedback from '../feedback/feedback-legacy';
import TallSirkel from '../tall/tall';
import hentTekstnokkelForOnboardingTrinn1 from '../../lib/hent-tekstnokkel-for-onboarding-trinn1';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { datoUtenTid, plussDager } from '../../utils/date-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { useGjelderFraDato } from '../../contexts/gjelder-fra-dato';

const TEKSTER = {
    nb: {
        header: 'Tre viktige ting i din første uke som registrert arbeidssøker',
        trinn1: 'Start på søknaden om dagpenger, slik at du finner ut når du må sende inn søknaden.',
        trinn1Fortid:
            'Du bør sende inn søknad om dagpenger i dag.<br />Om du mangler dokumentasjon, bør du ettersende disse så snart du har fått tak i dokumentasjonen. Det viktige nå er at du får sendt inn søknaden så raskt som mulig.',
        trinn1Idag:
            'Du bør sende inn søknad om dagpenger senest i morgen, {{datoSenest}}.<br />Hvis du sender inn søknaden senere vil du få mindre i dagpenger på din første utbetaling.',
        trinn1Imorgen:
            'Du bør sende inn søknad om dagpenger i dag.<br />Hvis du sender inn søknaden senere vil du få mindre i dagpenger på din første utbetaling.',
        trinn1Fremtid: `Du bør sende søknaden om dagpenger tidligst {{datoTidligst}} og senest {{datoSenest}}.<br />Det er lurt starte på søknaden allerede nå, sånn at du finner ut hvilke dokumenter du må få tak i.`,
        trinn2: 'Les gjennom introduksjonen til meldekort.',
        trinn3: 'Finn ut om du er enig i hvordan NAV har vurdert ditt behov for hjelp og støtte.',
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

const LeggTilEllerEndreDato = ({
    kanViseKomponent,
    dato,
}: {
    kanViseKomponent: boolean | undefined;
    dato: string | null;
}) => {
    const { settVisModal: settVisGjelderFraDatoModal } = useGjelderFraDatoModal();
    const amplitudeData = useAmplitudeData();
    if (!kanViseKomponent) return null;
    return (
        <div className="flex blokk-xs my-1">
            {dato && (
                <BodyShort>
                    Siste dag med lønn: <b>{prettyPrintDato(dato)}</b>
                </BodyShort>
            )}
            {dato && <div className="mr-05 ml-05">|</div>}
            <Link
                href={'#'}
                onClick={(event) => {
                    event.preventDefault();
                    dato
                        ? loggAktivitet({
                              aktivitet: 'Arbeidssøker vil endre dato for siste dag med lønn',
                              ...amplitudeData,
                          })
                        : loggAktivitet({
                              aktivitet: 'Arbeidssøker vil registrere dato for siste dag med lønn',
                              ...amplitudeData,
                          });
                    settVisGjelderFraDatoModal();
                }}
            >
                {dato ? 'Endre dato' : 'Trenger du veiledning om når du bør sende inn søknad om dagpenger?'}
            </Link>
        </div>
    );
};

const OnboardingStandard = () => {
    const [datoTidligst, settDatoTidligst] = useState<string>('');
    const [datoSenest, settDatoSenest] = useState<string>('');
    const [kanViseKomponent, settKanViseKomponent] = useState<boolean>(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const registreringData = useBrukerregistreringData();
    const oppfolgingData = useOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const { dagpengestatus } = useAmplitudeData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon = brukerregistreringData?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const harMistetJobben = dinSituasjon === DinSituasjonSvar.MISTET_JOBBEN;
    const visGjelderFraDatoLenke = featuretoggleData['veientilarbeid.vis-gjelder-fra-dato'] && harMistetJobben;
    const opprettetRegistreringDatoString = brukerregistreringData?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : 'INGEN_DATO';

    const erStandardAvRettType = erStandardTilknyttetArbeid({
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });

    const harSettMeldekortIntro = hentFraBrowserStorage('meldekortintro');
    const harSettOppfolgingIntro = hentFraBrowserStorage('14a-intro');
    const utforteTrinn = beregnUtforteTrinn(dagpengestatus, harSettMeldekortIntro, harSettOppfolgingIntro);
    const nesteTrinn = beregnNesteTrinn(utforteTrinn);
    const gjelderFraDato = useGjelderFraDato().dato;
    const brukerNyVisningForStandard = featuretoggleData['veientilarbeid.ny-standardvisning'];

    useEffect(() => {
        if (gjelderFraDato) {
            const tidligsteDatoForSoknad = prettyPrintDato(plussDager(new Date(gjelderFraDato), -7).toISOString());
            const senesteDatoForSoknad = prettyPrintDato(plussDager(new Date(gjelderFraDato), 1).toISOString());
            settDatoTidligst(tidligsteDatoForSoknad);
            settDatoSenest(senesteDatoForSoknad);
        }
    }, [gjelderFraDato]);

    useEffect(() => {
        if (erStandardAvRettType && !brukerNyVisningForStandard) {
            const erFremdelesIArbeid = gjelderFraDato ? datoUtenTid(gjelderFraDato) > new Date(Date.now()) : false;
            settKanViseKomponent(ukerRegistrert === 0 || erFremdelesIArbeid);
        }
    }, [gjelderFraDato, erStandardAvRettType, ukerRegistrert, brukerNyVisningForStandard]);

    if (kanViseKomponent)
        return (
            <Panel border className="ramme blokk-s mt-1" id="standard-onboarding">
                <ErRendret loggTekst="Rendrer OnboardingStandard" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <LeggTilEllerEndreDato
                    kanViseKomponent={visGjelderFraDatoLenke && erStandardAvRettType}
                    dato={gjelderFraDato}
                />
                <BodyLong spacing className={`flex${utforteTrinn.includes(1) ? ' inaktiv' : ''}`}>
                    <TallSirkel tall={1} aktiv={nesteTrinn === 1} inaktiv={utforteTrinn.includes(1)} />{' '}
                    <span
                        dangerouslySetInnerHTML={{
                            __html: tekst(hentTekstnokkelForOnboardingTrinn1(gjelderFraDato))
                                .replace('{{datoSenest}}', datoSenest)
                                .replace('{{datoTidligst}}', datoTidligst),
                        }}
                    ></span>
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
            </Panel>
        );
    return null;
};

export default OnboardingStandard;
