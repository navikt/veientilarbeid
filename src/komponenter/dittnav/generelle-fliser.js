import * as React from 'react';
import Rad from '../../innhold/rad';
import DittNAVFliser from './components/DittnavFliser';
import './css/generelle-fliser.less';
import {UnderOppfolgingContext} from '../../ducks/under-oppfolging';

const GenerelleFliser = () => {
    const { erBrukerUnderOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const kanViseKomponent = !erBrukerUnderOppfolging;

  if (!kanViseKomponent) {
    return null
  }

    return (
        <Rad>
            <DittNAVFliser />
        </Rad>
    );
};

export default GenerelleFliser
