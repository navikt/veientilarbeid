import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import { useState } from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { ReactComponent as BytteIkon } from './bytte-ikon.svg';

export const YTELSER_TEMA_SWITCH_KEY = 'ytelser_tema_switch_key';

const ByttKortLenke = (props: { amplitudeTemaTag: string }) => {
    const { amplitudeTemaTag } = props;
    const amplitudeData = useAmplitudeData();

    const [valgtYtelserVisning, setValgtYtelserVisning] = useState<boolean>(
        !!hentFraBrowserStorage(YTELSER_TEMA_SWITCH_KEY)
    );

    const handleByttKortKlikk = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: amplitudeTemaTag,
            handling: `Avviser dagpenger-tema`,
            amplitudeData,
        });
        setValgtYtelserVisning(!valgtYtelserVisning);
        settIBrowserStorage(YTELSER_TEMA_SWITCH_KEY, valgtYtelserVisning ? 'false' : 'true');
    };

    return (
        <div>
            <Normaltekst className={'blokk-xs'}>
                <BytteIkon />
                <Lenke href="" onClick={handleByttKortKlikk}>
                    {valgtYtelserVisning ? 'Dagpenger er ikke aktuelt' : 'Dagpenger er mest aktuelt'}
                </Lenke>
            </Normaltekst>
        </div>
    );
};

export default ByttKortLenke;
