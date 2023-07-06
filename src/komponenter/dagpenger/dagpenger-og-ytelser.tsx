import { useEffect, useState } from 'react';
import { useProfil } from '../../contexts/profil';

import DagpengerOgYtelserInnhold from './dagpenger-og-ytelser-innhold';
import { hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

function DagpengerOgYtelser() {
    const YTELSER_TEMA_VIS_KEY = 'ytelser_tema_vis_key';
    const YTELSER_VISNING_PROFIL_KEY = hentProfilnokkelFraLocalStorage(YTELSER_TEMA_VIS_KEY);

    const { amplitudeData } = useAmplitudeData();
    const { profil, lagreProfil } = useProfil();

    const valgtVisningFraProfil = profil?.[YTELSER_VISNING_PROFIL_KEY];
    const valgtVisningFraBrowserStorage = hentFraBrowserStorage(YTELSER_TEMA_VIS_KEY);

    const [valgtYtelserVisning, setValgtYtelserVisning] = useState<string>(
        (valgtVisningFraProfil ?? valgtVisningFraBrowserStorage ?? 'dagpenger') as string
    );

    useEffect(() => {
        if (profil && profil[YTELSER_VISNING_PROFIL_KEY]) {
            setValgtYtelserVisning(profil[YTELSER_VISNING_PROFIL_KEY] as string);
        }
    }, [profil, YTELSER_VISNING_PROFIL_KEY]);

    const handleByttVisningKlikk = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: 'ytelser',
            handling: `Avviser dagpenger-tema`,
            ...amplitudeData,
        });

        const valgtVisning = valgtYtelserVisning === 'dagpenger' ? 'ytelser' : 'dagpenger';
        setValgtYtelserVisning(valgtVisning);
        lagreProfil({ [YTELSER_VISNING_PROFIL_KEY]: valgtVisning });
        settIBrowserStorage(YTELSER_TEMA_VIS_KEY, valgtVisning);
    };

    return (
        <DagpengerOgYtelserInnhold handleByttVisningKlikk={handleByttVisningKlikk} valgtVisning={valgtYtelserVisning} />
    );
}

export default DagpengerOgYtelser;
