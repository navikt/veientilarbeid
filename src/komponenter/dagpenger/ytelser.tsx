import { BodyShort, Heading, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Har du spørsmål om å søke eller motta pengestøtte?',
        stillSporsmal: 'Du kan stille spørsmål om ytelser via',
        skrivTilOss: 'skriv til oss',
        og: 'og',
        chat: 'chat',
        lesOm: 'Du kan lese om livssituasjoner NAV kan hjelpe med på',
        forsiden: 'forsiden',
        av: 'av',
    },
    en: {
        heading: 'Do you have questions about applying for or receiving financial support?',
        stillSporsmal: 'You can ask questions about benefits via',
        skrivTilOss: 'write to us',
        og: 'and',
        chat: 'chat',
        lesOm: 'You can read about life situations in which NAV can help on',
        forsiden: 'the frontpage',
        av: 'of',
    },
};
const Ytelser = () => {
    const { amplitudeData } = useAmplitudeData();

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <Heading size="small" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            <BodyShort className={spacingStyles.blokkXs}>
                {`${tekst('stillSporsmal')} `}
                <Link
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk('Går til STO fra ytelser-kort', 'https://mininnboks.nav.no/sporsmal/skriv/ARBD')
                    }
                >
                    {tekst('skrivTilOss')}
                </Link>
                {` ${tekst('og')} `}
                <Link
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk('Går til chat fra ytelser-kort', 'https://www.nav.no/person/kontakt-oss/chat/')
                    }
                >
                    {tekst('chat')}
                </Link>
                .
            </BodyShort>
            <BodyShort>
                {`${tekst('lesOm')} `}
                <Link
                    href="https://www.nav.no/"
                    onClick={() => loggLenkeKlikk('Går til forsiden fra ytelse kort', 'https://www.nav.no/')}
                >
                    {tekst('forsiden')}
                </Link>
                {` ${tekst('av')} nav.no`}
            </BodyShort>
        </>
    );
};

export default Ytelser;
