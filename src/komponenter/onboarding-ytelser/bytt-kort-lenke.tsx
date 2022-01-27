import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { ReactComponent as BytteIkon } from './bytte-ikon.svg';
import { Link } from '@navikt/ds-react';
import './bytt-kort-lenke.less';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        aktuelt: 'Dagpenger er mest aktuelt',
        ikkeAktuelt: 'Dagpenger er ikke aktuelt',
    },
    en: {
        aktuelt: 'Unemployment benefits are most relevant',
        ikkeAktuelt: 'Unemployment benefits are not applicable',
    },
};

const ByttKortLenke = (props: { handleByttKortKlikk: (e: React.MouseEvent) => void; valgtYtelserVisning: string }) => {
    const featuretoggleData = useFeatureToggleData();
    const kanViseKomponent = featuretoggleData['veientilarbeid.onboardingDagpenger.toggle'];
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (!kanViseKomponent) return null;

    return (
        <div className="bytt-tema-container">
            <BytteIkon />
            <Link href="" onClick={props.handleByttKortKlikk}>
                {props.valgtYtelserVisning === 'dagpenger' ? tekst('ikkeAktuelt') : tekst('aktuelt')}
            </Link>
        </div>
    );
};

export default ByttKortLenke;
