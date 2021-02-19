import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering'
import { MeldekortContext, Data as MeldekortData } from '../../ducks/meldekort';
import { OppfolgingContext } from '../../ducks/oppfolging'
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe'
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import './meldekort.less';

function Kort1() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Som registrert arbeidssøker hos NAV, må du sende inn et meldekort hver 14 dag.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Selv om du venter på svar på søknaden om dagpenger, må du sende inn meldekortene innen fristen.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Det er også viktig at du sender inn meldekort til riktig tid.
            </Normaltekst>
        </div>
    );
}

function Kort2() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Utbetalinger av dagpenger regnes ut basert på opplysningene fra meldekortene du sender inn.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Om du sender meldekortet for sent du vil få mindre utbetalt.
            </Normaltekst>
        </div>
    );
}

function Kort3() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Om du ikke sender meldekort, vil vi tolke det som at du ikke ønsker å være registrert som arbeidssøker
                og at du ikke har behov for dagpenger eller annen hjelp.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Om du ikke har sendt inn et meldekort tidligere, kan du se et eksempel på hvordan det fylles ut her.
            </Normaltekst>
        </div>
    );
}

interface EndStateProps {
    meldekortData: MeldekortData | null;
}

function EndState(props: EndStateProps) {
    const { meldekortData } = props
    console.log(meldekortData)
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Innsending av meldekort</Systemtittel>
            <Normaltekst className={'blokk-xs'}>Du kan nå sende inn meldekortet.</Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Sender du inn for sent vil du ikke lenger stå registrert som arbeidssøker og dagpengene vil stoppes.
            </Normaltekst>
            <Normaltekst>Gjeldende meldekort</Normaltekst>
            <div className={'meldekortinfo'}>
                <Undertekst>
                    Periode: {'01-01-1970'} - {'01-01-1970'}
                </Undertekst>
                <Lenke
                    href="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det"
                    target="_blank"
                >
                    Gå til innsending
                </Lenke>
            </div>
            <Lenke
                href="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det"
                target="_blank"
            >
                Les mer om meldekort
            </Lenke>
        </div>
    );
}

function OnboardingMeldekort() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: brukerregistreringData } = React.useContext(BrukerregistreringContext)
    const { data: oppfolgingData } = React.useContext(OppfolgingContext)
    const { data: meldekortData } = React.useContext(MeldekortContext);
    const onboardingKort = [<Kort1 />, <Kort2 />, <Kort3 />, <EndState meldekortData={meldekortData} />];
    const sisteKortiListen = onboardingKort.length - 1;
    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const startKort = erNyregistrert ? 0 : sisteKortiListen;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startKort);
    const forrigeKortRef = useRef(startKort);
    const nesteKort = () => {
        if (gjeldendeKortIndex < onboardingKort.length - 1) {
            setGjeldendeKortIndex(gjeldendeKortIndex + 1);
        }
    };
    const forrigeKort = () => {
        if (gjeldendeKortIndex > 0) {
            setGjeldendeKortIndex(gjeldendeKortIndex - 1);
        }
    };

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKortIndex) {
            const handling = `Går fra ${forrigeKortRef.current + 1} til kort ${gjeldendeKortIndex + 1}`;
            amplitudeLogger('veientilarbeid.onboarding', {
                onboarding: 'meldekort',
                handling,
                ...amplitudeData,
            });
            forrigeKortRef.current = gjeldendeKortIndex;
        }
    }, [gjeldendeKortIndex, amplitudeData]);

    const kanViseKomponent = meldekortData && erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData })

    if (!kanViseKomponent) return null

    return (
        <Panel className="blokk-s meldekort-onboarding" border>
            {erNyregistrert ? (
                <>
                    <div className={'kortwrapper'}>
                        <div className={'kortinnhold'}>{onboardingKort[gjeldendeKortIndex]}</div>
                        <Normaltekst>
                            {gjeldendeKortIndex + 1} av {onboardingKort.length}
                        </Normaltekst>
                    </div>
                    <div className={'knapper'}>
                        <Tilbakeknapp mini disabled={gjeldendeKortIndex === 0} onClick={forrigeKort} />
                        <Nesteknapp mini disabled={gjeldendeKortIndex === sisteKortiListen} onClick={nesteKort} />
                    </div>
                </>
            ) : (
                <div className={'kortwrapper'}>
                    <div className={'kortinnhold'}>
                        <EndState meldekortData={meldekortData} />
                    </div>
                </div>
            )}
        </Panel>
    );
}

export default OnboardingMeldekort;
