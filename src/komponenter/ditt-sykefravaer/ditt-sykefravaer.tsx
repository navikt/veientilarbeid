import { useContext } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        overskrift: 'Ditt sykefravær',
        ingress: 'Se sykemeldingene dine og annen informasjon om sykefraværet ditt.',
    },
    en: {
        overskrift: 'Your sick leave',
        ingress: 'See information about your sick leave',
    },
};

const DittSykefravaer = () => {
    const amplitudeData = useAmplitudeData();
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = erSykmeldtMedArbeidsgiver && underOppfolging;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (!kanViseKomponent) {
        return null;
    }

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til ditt sykefravær', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon
            href={sykefravaerLenke}
            className="sykefravaer"
            alt=""
            onClick={handleClick}
            overskrift={tekst('overskrift')}
            ingress={tekst('ingress')}
        >
            <Plaster />
        </LenkepanelMedIkon>
    );
};

export default DittSykefravaer;
