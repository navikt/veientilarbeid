import React, { useState } from 'react'
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Tilbakeknapp, Nesteknapp } from 'nav-frontend-ikonknapper';

function Kort1 () {
  return (
    <div>Kort 1</div>
  )
}

function Kort2 () {
  return (
    <div>Kort 2</div>
  )
}

function Kort3 () {
  return (
    <div>Kort 3</div>
  )
}

function EndState () {
  return (
    <div>EndState</div>
  )
}

const cards = [
  <Kort1 />,
  <Kort2 />,
  <Kort3 />,
  <EndState />
]

function Meldekort () {
  const [cardNumber, setCardNumber] = useState(0)
  const increment = () => {
    if (cardNumber < cards.length - 1) {
      setCardNumber(cardNumber + 1)
    }
  }
  const decrement = () => {
    if (cardNumber > 0) {
      setCardNumber(cardNumber - 1)
    }
  }
  return(
    <Panel className="blokk-s" border>
      <Normaltekst>Kort {cardNumber + 1} av {cards.length}</Normaltekst>
      <div>cardNumber: {cardNumber}</div>
      {cards[cardNumber]}
      <Tilbakeknapp onClick={decrement} />
      <Nesteknapp onClick={increment} />
    </Panel>
  )
}

export default Meldekort
