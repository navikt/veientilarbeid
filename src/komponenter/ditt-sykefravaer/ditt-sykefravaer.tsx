import { useContext } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const DittSykefravaer = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const { erSykmeldtMedArbeidsgiver } = useContext(BrukerInfoContext).data;
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = erSykmeldtMedArbeidsgiver && underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    const overskrift = 'ditt-sykefravaer-overskrift';
    const ingress = 'ditt-sykefravaer-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til ditt sykefravær', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon
            href={sykefravaerLenke}
            className="sykefravaer"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <Plaster />
        </LenkepanelMedIkon>
    );
};

export default DittSykefravaer;
