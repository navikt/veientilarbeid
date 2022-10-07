import { BodyShort, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { DpInnsynPaabegyntSoknad } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { FORTSETT_DP_SOKNAD_URL } from '../../utils/lenker';
import { useSWR } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';

const TEKSTER = {
    nb: {
        pabegynt: 'Du har også en påbegynt søknad du kan',
        fortsette: 'fortsette på',
    },
    en: {
        pabegynt: 'You also have an ongoing application that you can',
        fortsette: 'continue on',
    },
};

const PaabegynteSoknader = ({ dato, komponent }: { dato?: string; komponent: string }) => {
    const amplitudeData = useAmplitudeData();
    const { data: paabegynteSoknader = [] } = useSWR<DpInnsynPaabegyntSoknad[]>(`${DP_INNSYN_URL}/paabegynte`);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    if (!dato) {
        return null;
    }

    const sistePabegynteSoknad = paabegynteSoknader.sort(
        (a: DpInnsynPaabegyntSoknad, b: DpInnsynPaabegyntSoknad) =>
            new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime()
    )[0];

    const harPaabegyntSoknadNyereEnnDato =
        sistePabegynteSoknad && new Date(sistePabegynteSoknad.sistEndret).getTime() > new Date(dato).getTime();

    if (!harPaabegyntSoknadNyereEnnDato) {
        return null;
    }

    return (
        <BodyShort className={spacingStyles.blokkXs}>
            {tekst('pabegynt')}{' '}
            <Link
                href={sistePabegynteSoknad.behandlingsId}
                onClick={() =>
                    loggLenkeKlikk(
                        `Fortsetter på søknad - fra "dagpenger-tema - ${komponent}"`,
                        `${FORTSETT_DP_SOKNAD_URL}/${sistePabegynteSoknad.behandlingsId}`
                    )
                }
            >
                {tekst('fortsette')}
            </Link>
            .
        </BodyShort>
    );
};

export default PaabegynteSoknader;
