import Lenke from 'nav-frontend-lenker';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { ReactComponent as BytteIkon } from './bytte-ikon.svg';
import './bytt-kort-lenke.less';

const ByttKortLenke = (props: { handleByttKortKlikk: (e: React.MouseEvent) => void; valgtYtelserVisning: string }) => {
    const featuretoggleData = useFeatureToggleData();
    const kanViseKomponent = featuretoggleData['veientilarbeid.onboardingDagpenger.toggle'];

    if (!kanViseKomponent) return null;

    return (
        <div className="bytt-tema-container">
            <BytteIkon />
            <Lenke href="" onClick={props.handleByttKortKlikk}>
                {props.valgtYtelserVisning === 'dagpenger' ? 'Dagpenger er ikke aktuelt' : 'Dagpenger er mest aktuelt'}
            </Lenke>
        </div>
    );
};

export default ByttKortLenke;
