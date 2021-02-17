import React, {useEffect, useRef, useState} from 'react'
import {Normaltekst, Systemtittel, Undertekst} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {Nesteknapp, Tilbakeknapp} from 'nav-frontend-ikonknapper';
import {AmplitudeContext} from '../../ducks/amplitude-context';
import {amplitudeLogger} from '../../metrics/amplitude-utils'
import './meldekort.less'
import Lenke from "nav-frontend-lenker";

function Kort1() {
    return (
        <div>
            <Systemtittel className={"blokk-xs"}>Hvordan fungerer meldekort i NAV?</Systemtittel>

            <Normaltekst className={"blokk-xs"}>
                Som registrert arbeidssøker hos NAV, må du sende inn et meldekort hver 14 dag.
            </Normaltekst>

            <Normaltekst className={"blokk-xs"}>
                Selv om du venter på svar på søknaden om dagpenger, må du sende inn meldekortene innen fristen.
            </Normaltekst>

            <Normaltekst className={"blokk-xs"}>
                Det er også viktig at du sender inn meldekort til riktig tid.
            </Normaltekst>
        </div>
    )
}

function Kort2() {
    return (
        <div>
            <Systemtittel className={"blokk-xs"}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={"blokk-xs"}>
                Utbetalinger av dagpenger regnes ut basert på opplysningene fra meldekortene du sender inn.
            </Normaltekst>

            <Normaltekst className={"blokk-xs"}>
                Om du sender meldekortet for sent du vil få mindre utbetalt.
            </Normaltekst>
        </div>
    )
}

function Kort3() {
    return (
        <div>
            <Systemtittel className={"blokk-xs"}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={"blokk-xs"}>
                Om du ikke sender meldekort, vil vi tolke det som at du ikke ønsker å være registrert som arbeidssøker
                og at du ikke har behov for dagpenger eller annen hjelp.
            </Normaltekst>

            <Normaltekst className={"blokk-xs"}>
                Om du ikke har sendt inn et meldekort tidligere, kan du se et eksempel på hvordan det fylles ut her.
            </Normaltekst>

        </div>

    )
}

function EndState(fra, til) {
    return (
        <div>
            <Systemtittel className={"blokk-xs"}>Innsending av meldekort</Systemtittel>
            <Normaltekst className={"blokk-xs"}>
                Du kan nå sende inn meldekortet.
            </Normaltekst>
            <Normaltekst className={"blokk-xs"}>
                Sender du inn for sent vil du ikke lenger stå registrert som arbeidssøker og dagpengene vil stoppes.
            </Normaltekst>
            <Normaltekst>
                Gjeldende meldekort
            </Normaltekst>
            <div className={"meldekortinfo"}>
            <Undertekst>
                Periode: {"01-01-1970"} - {"01-01-1970"}
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
    )
}

const onboardingKort = [
    <Kort1/>,
    <Kort2/>,
    <Kort3/>,
    <EndState/>
]

function Meldekort() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const sisteKortiListen = onboardingKort.length - 1
    const startKort = parseInt(amplitudeData.ukerRegistrert, 10) > 0 ? sisteKortiListen : 0
    const [gjeldendeKort, setGjeldendeKort] = useState(startKort)
    const forrigeKortRef = useRef(startKort)
    const nesteKort = () => {
        if (gjeldendeKort < onboardingKort.length - 1) {
            setGjeldendeKort(gjeldendeKort + 1)
        }
    }
    const forrigeKort = () => {
        if (gjeldendeKort > 0) {
            setGjeldendeKort(gjeldendeKort - 1)
        }
    }

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKort) {
            const handling = `Går fra ${forrigeKortRef.current + 1} til kort ${gjeldendeKort + 1}`
            amplitudeLogger('veientilarbeid.onboarding', {
                onboarding: 'meldekort',
                handling,
                ...amplitudeData
            })
            forrigeKortRef.current = gjeldendeKort
        }
    }, [gjeldendeKort, amplitudeData])

    return (
        <Panel className="blokk-s" border>
            <div className={"kortwrapper"}>
                <div className={"kortinnhold"}>
                {onboardingKort[gjeldendeKort]}
                </div>
                {gjeldendeKort !== sisteKortiListen
                    ?
                    <Normaltekst>{gjeldendeKort + 1} av {onboardingKort.length}</Normaltekst>
                    : null
                }
            </div>
            { gjeldendeKort !== sisteKortiListen
                ?
                <div className={"knapper"}>
                    <Tilbakeknapp onClick={forrigeKort}/>
                    <Nesteknapp onClick={nesteKort}/>
                </div>
                : null
            }
        </Panel>
    )
}

export default Meldekort
