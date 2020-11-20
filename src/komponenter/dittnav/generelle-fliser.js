import * as React from 'react'
import Rad from '../../innhold/rad';
import { OppfolgingContext } from '../../ducks/oppfolging';
import DittNAVFliser from './components/DittnavFliser'
import './css/generelle-fliser.less';

const GenerelleFliser = () => {
  const { underOppfolging } = React.useContext(OppfolgingContext).data
  const kanViseKomponent = !underOppfolging
  if (!kanViseKomponent) {
    return null
  }
  return <Rad><DittNAVFliser /></Rad>
}

export default GenerelleFliser
