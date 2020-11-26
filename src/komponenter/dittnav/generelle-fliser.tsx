import * as React from 'react';
import DittNAVFliser from './components/DittnavFliser';
import './css/generelle-fliser.less';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const GenerelleFliser = () => {
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const kanViseKomponent = !underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    return <DittNAVFliser />;
};

export default GenerelleFliser;
