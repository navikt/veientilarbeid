import { useContext } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { BrukerInfoContext } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';

const DittSykefravaer = () => {
    const amplitudeData = useAmplitudeData();
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
