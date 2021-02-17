import React, { useEffect, useRef, useState } from 'react'
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {Nesteknapp, Tilbakeknapp} from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils'
import './meldekort.less'

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
                Det er også viktig at du sender inn melkort til riktig tid.
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

function EndState() {
    return (
        <div>
            <Systemtittel className={"blokk-xs"}>Hvordan fungerer meldekort i NAV?</Systemtittel>
        </div>
    )
}

const cards = [
    <Kort1/>,
    <Kort2/>,
    <Kort3/>,
    <EndState/>
]

function Meldekort() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const [cardNumber, setCardNumber] = useState(0)
    const forrigeKortRef = useRef(0)
    const nesteKort = () => {
        if (cardNumber < cards.length - 1) {
            setCardNumber(cardNumber + 1)
        }
    }
    const forrigeKort = () => {
        if (cardNumber > 0) {
            setCardNumber(cardNumber - 1)
        }
    }

    useEffect(() => {
        if (forrigeKortRef.current !== cardNumber) {
            const handling = `Går fra ${forrigeKortRef.current + 1} til kort ${cardNumber + 1}`
            console.log(handling)
            amplitudeLogger('vta.onboarding.meldekort', { handling, ...amplitudeData })
            forrigeKortRef.current = cardNumber
        }
    }, [cardNumber, amplitudeData])

    return (
        <Panel className="blokk-s" border>
            <div className={"kortwrapper"}>
                {cards[cardNumber]}
                <Normaltekst>{cardNumber + 1} av {cards.length}</Normaltekst>
            </div>
            <div className={"knapper"}>
                <Tilbakeknapp onClick={forrigeKort}/>
                <Nesteknapp onClick={nesteKort}/>
            </div>
        </Panel>
    )
}

export default Meldekort
