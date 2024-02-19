import IkkeSvartPaaBehovsavklaringStandardInnsats from './behovsavklaring-ikke-svart-standard';
import IkkeSvartPaaBehovsavklaringSituasjonsbestemt from './behovsavklaring-ikke-svart-situasjonsbestemt';
import { useProfilering } from '../../contexts/profilering';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

function IkkeSvartPaaBehovsavklaring() {
    const { profilering: profileringer } = useProfilering();
    const profilering = profileringer[0];

    const foreslattInnsatsgruppe = profilering?.profilertTil;

    if (!foreslattInnsatsgruppe) return null;

    return foreslattInnsatsgruppe === ProfilertTil.ANTATT_GODE_MULIGHETER ? (
        <IkkeSvartPaaBehovsavklaringStandardInnsats />
    ) : (
        <IkkeSvartPaaBehovsavklaringSituasjonsbestemt />
    );
}

export default IkkeSvartPaaBehovsavklaring;
