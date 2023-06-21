import { BodyLong, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { mine_dagpenger_url } from '../../ducks/urls';

const TEKSTER = {
    nb: {
        sporsmal: 'Har du spørsmål om dagpenger må du bruke',
        skrivTilOss: 'skriv til oss',
        eller: 'eller',
        chat: 'chat',
        innsyn: 'For historikk, se',
        mineDagpenger: 'Mine dagpenger',
    },
    en: {
        sporsmal: 'You can ask questions about unemployment benefits via',
        skrivTilOss: 'write to us',
        eller: 'or',
        chat: 'chat',
        innsyn: 'For history, visit',
        mineDagpenger: 'My unemployment benefits',
    },
};

interface Props {
    amplitudeTemaNavn: string;
}

const SkrivTilOssChatOgMineDagpenger = (props: Props) => {
    const { amplitudeTemaNavn } = props;
    const { amplitudeData } = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    return (
        <BodyLong className={spacingStyles.blokkXs}>
            {tekst('sporsmal')}{' '}
            <Link
                href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                onClick={() =>
                    loggLenkeKlikk(
                        `Går til STO fra ${amplitudeTemaNavn}`,
                        'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                    )
                }
            >
                {tekst('skrivTilOss')}
            </Link>{' '}
            {tekst('eller')}{' '}
            <Link
                href="https://www.nav.no/person/kontakt-oss/chat/"
                onClick={() =>
                    loggLenkeKlikk(
                        `Går til chat fra ${amplitudeTemaNavn}`,
                        'https://www.nav.no/person/kontakt-oss/chat/'
                    )
                }
            >
                {tekst('chat')}
            </Link>
            .
            <br />
            {`${tekst('innsyn')} `}
            <Link
                href={mine_dagpenger_url}
                onClick={() => loggLenkeKlikk(`Går til Mine dagpenger fra ${amplitudeTemaNavn}`, mine_dagpenger_url)}
            >
                {tekst('mineDagpenger')}
            </Link>
            .
        </BodyLong>
    );
};

export default SkrivTilOssChatOgMineDagpenger;
