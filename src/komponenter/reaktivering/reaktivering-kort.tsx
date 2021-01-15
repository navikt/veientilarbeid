import * as React from 'react';
import { useLocalStorage } from '../../hooks/use-localstorarge'
import ReaktiveringMelding from './reaktivering-melding'
import ReaktiveringIkkeAktueltMelding from './reaktivering-ikke-aktuelt-melding'

interface Variant {
  updated: string;
  state: boolean;
};

function getDagerMellom (datoStart: string, datoSlutt: Date): number {
  const start = new Date(new Date(datoStart).toISOString().substr(0, 10))
  const slutt = new Date(datoSlutt.toISOString().substr(0, 10))
  const millis= slutt.getMilliseconds() - start.getMilliseconds()
  const dager = millis > 0 ? Math.floor(millis / 86400000) : 1
  return dager
}

function getReaktiveringsState (variant: Variant): boolean {
  const { updated, state } = variant
  const dagerMellom = getDagerMellom(updated, new Date())
  return dagerMellom >= 28 ? true : state
}

const ReaktiveringKort = () => {
  const [ reaktiveringsState, setReaktiveringsstate ] = React.useState(true)
  const [ reaktiveringVariant, setReaktiveringVariant ] = useLocalStorage('vta-kan-reaktiveres-visning', {
    updated: new Date(),
    state: true
  })

  React.useEffect(() => {
    setReaktiveringsstate(getReaktiveringsState(reaktiveringVariant))
  }, [reaktiveringVariant])

  return reaktiveringsState ? <ReaktiveringMelding setReaktivering={setReaktiveringVariant} /> : <ReaktiveringIkkeAktueltMelding /> 
};

export default ReaktiveringKort;
