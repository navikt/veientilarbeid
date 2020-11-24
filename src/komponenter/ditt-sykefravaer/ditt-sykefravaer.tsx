import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import {loggAktivitet} from '../../metrics/metrics';
import Plaster from './plaster';
import {sykefravaerLenke} from '../../innhold/lenker';
import {AmplitudeAktivitetContext} from '../../ducks/amplitude-aktivitet-context';
import {BrukerInfoContext} from '../../ducks/bruker-info';
import {UnderOppfolgingContext} from '../../ducks/under-oppfolging';

const DittSykefravaer = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { erBrukerUnderOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = erSykmeldtMedArbeidsgiver && erBrukerUnderOppfolging;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser ditt sykefravær', ...amplitudeAktivitetsData });
        }
    }, [amplitudeAktivitetsData, kanViseKomponent]);

    if (!kanViseKomponent) {
        return null;
    }

    const overskrift = 'ditt-sykefravaer-overskrift';
    const ingress = 'ditt-sykefravaer-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til ditt sykefravær', ...amplitudeAktivitetsData });
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
