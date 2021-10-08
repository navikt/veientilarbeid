import * as React from 'react';
import DittNAVFliser from './components/DittnavFliser';
import './css/generelle-fliser.less';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

interface Props {
    skalTilRegistrering: boolean;
}

function RegistreringsStatus(props: Props) {
    const kanViseKomponent = props.skalTilRegistrering;
    if (!kanViseKomponent) return null;
    return <div>Du er ikke registrert som arbeidssøker</div>;
}

const GenerelleFliser = () => {
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const goto = new URLSearchParams(window.location.search).get('goTo');
    const skalTilRegistrering = goto === 'registrering';

    const kanViseKomponent = !underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <>
            <RegistreringsStatus skalTilRegistrering={skalTilRegistrering} />
            <DittNAVFliser />
        </>
    );
};

export default GenerelleFliser;
