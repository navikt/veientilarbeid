import * as React from 'react';
import Rad from '../../innhold/rad';
import DittNAVFliser from './components/DittnavFliser';
import './css/generelle-fliser.less';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const GenerelleFliser = () => {
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const kanViseKomponent = !underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <Rad>
            <DittNAVFliser />
        </Rad>
    );
};

export default GenerelleFliser;
