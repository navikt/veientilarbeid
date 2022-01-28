import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../../innhold/lenker';
import { mine_dagpenger_url } from '../../../url';
import SkrivTilOssOgChat from './skriv-til-oss-og-chat';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har ikke sendt inn søknad om dagpenger',
        ingress: 'Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.',
        sok: 'Søk om dagpenger',
        feil: 'Mener du dette er feil, kan du sjekke',
        mineDagpenger: 'Mine dagpenger',
    },
    en: {
        heading: 'You have not submitted an application for unemployment benefits',
        ingress: 'You can receive unemployment benefits at the earliest from the day you submit the application.',
        sok: 'Apply for unemployment benefits',
        feil: 'If you think this is wrong, you can check',
        mineDagpenger: 'My unemployment benefits',
    },
};

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    const handleButtonClick = () => {
        loggAktivitet({
            aktivitet: 'Går til dagpengesøknad fra "dagpenger-tema - ikke søkt dagpenger"',
            ...amplitudeData,
        });
        window.location.assign(dagpengerSoknadLenke);
    };

    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {tekst('heading')}
            </Heading>

            <BodyShort className={'blokk-xs'}>{tekst('ingress')}</BodyShort>

            <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                {tekst('sok')}
            </Button>

            <BodyShort className={'blokk-xs'}>
                {`${tekst('feil')} `}
                <Link
                    className={'tracking-wide'}
                    href={mine_dagpenger_url}
                    onClick={() =>
                        loggLenkeKlikk(
                            'Går til Mine dagpenger fra "dagpenger-tema - ikke søkt dagpenger"',
                            mine_dagpenger_url
                        )
                    }
                >
                    {tekst('mineDagpenger')}
                </Link>
            </BodyShort>

            <SkrivTilOssOgChat amplitudeTemaNavn='"dagpenger-tema - ikke søkt dagpenger"' />
        </>
    );
};

export default Sluttkort;
