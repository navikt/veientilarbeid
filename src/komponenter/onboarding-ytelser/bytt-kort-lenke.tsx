import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { ReactComponent as BytteIkon } from './bytte-ikon.svg';

const ByttKortLenke = (props: { handleByttKortKlikk: (e: React.MouseEvent) => void; valgtYtelserVisning: string }) => {
    const featuretoggleData = useFeatureToggleData();
    const kanViseKomponent = featuretoggleData['veientilarbeid.onboardingDagpenger.toggle'];

    if (!kanViseKomponent) return null;

    return (
        <div>
            <Normaltekst className={'blokk-xs'}>
                <BytteIkon />
                <Lenke href="" onClick={props.handleByttKortKlikk}>
                    {props.valgtYtelserVisning === 'dagpenger'
                        ? 'Dagpenger er ikke aktuelt'
                        : 'Dagpenger er mest aktuelt'}
                </Lenke>
            </Normaltekst>
        </div>
    );
};

export default ByttKortLenke;
