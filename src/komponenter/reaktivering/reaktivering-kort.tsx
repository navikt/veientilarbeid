import * as React from 'react';
import { useLocalStorage } from '../../hooks/use-localstorarge'
import ReaktiveringMelding from './reaktivering-melding'
import ReaktiveringIkkeAktueltMelding from './reaktivering-ikke-aktuelt-melding'

const ReaktiveringKort = () => {
  const [ reaktivering, setReaktivering ] = useLocalStorage('vta-kan-reaktiveres-visning', true)

  return reaktivering ? <ReaktiveringMelding setReaktivering={setReaktivering} /> : <ReaktiveringIkkeAktueltMelding /> 
};

export default ReaktiveringKort;
