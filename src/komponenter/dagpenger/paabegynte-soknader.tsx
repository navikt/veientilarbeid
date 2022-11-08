import { BodyShort, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import {
    DpInnsynPaabegyntSoknad,
    useDpInnsynPaabegynteSoknaderData,
} from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useSprakValg } from '../../contexts/sprak';

import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { FORTSETT_DP_SOKNAD_URL, FORTSETT_NY_DP_SOKNAD_URL } from '../../utils/lenker';

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
    const { amplitudeData } = useAmplitudeData();
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
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

    const FORSETT_SOKNAD_URL =
        sistePabegynteSoknad?.erNySøknadsdialog === true ? FORTSETT_NY_DP_SOKNAD_URL : FORTSETT_DP_SOKNAD_URL;

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
                        `${FORSETT_SOKNAD_URL}/${sistePabegynteSoknad.behandlingsId}`
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
