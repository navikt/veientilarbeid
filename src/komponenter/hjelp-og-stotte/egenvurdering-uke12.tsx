import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { Next } from '@navikt/ds-icons';
import { useProfil } from '../../contexts/profil';
import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';
import * as React from 'react';
import spacingStyles from '../../spacing.module.css';

export const INTRO_KEY_12UKER = '12uker-egenvurdering';

const TEKSTER = {
    nb: {
        heading: 'Du har vært registrert i',
        uker: 'uker',
        beskrivelse:
            'Har du fortsatt tro på at du greier å skaffe deg jobb på egenhånd, eller tenker du det er behov for hjelp og støtte fra en veileder ved NAV-kontoret ditt?',
        hjelp: 'Jeg ønsker hjelp',
        kss: 'Jeg klarer meg fint selv',
    },
    en: {
        heading: 'You have been registered for',
        uker: 'weeks',
        beskrivelse:
            'Do you still think you can manage to get a job on your own, or do you want help from a NAV counselor?',
        hjelp: 'I want help',
        kss: 'I want to handle it on my own',
    },
};

function EgenvurderingUke12() {
    const { amplitudeData } = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;
    const { lagreProfil } = useProfil();

    const lagreEgenvurderingDato = () => {
        const datoNaa = new Date().toISOString();
        const egenvurderingProfilId = hentProfilnokkelFraLocalStorage(INTRO_KEY_12UKER);

        settIBrowserStorage(INTRO_KEY_12UKER, datoNaa);
        lagreProfil({
            [egenvurderingProfilId]: datoNaa,
        });
    };

    function avslaarEgenvurdering(event: React.SyntheticEvent) {
        event.preventDefault();
        lagreEgenvurderingDato();
        loggAktivitet({ aktivitet: 'Avslår 12 ukers egenvurdering fra lenke', ...amplitudeData });
    }

    function sendTilEgenvurdering() {
        lagreEgenvurderingDato();
        loggAktivitet({ aktivitet: 'Går til 12 ukers egenvurdering', ...amplitudeData });
        window.location.assign(`${behovsvurderingLenke}/hvilken-veiledning-trengs`);
    }

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <Heading level="2" size="medium" className={spacingStyles.blokkXs}>
                {`${tekst('heading')} ${ukerRegistrert} ${tekst('uker')}`}
            </Heading>
            <BodyShort className={spacingStyles.blokkXs}>{tekst('beskrivelse')}</BodyShort>
            <Button
                variant="primary"
                onClick={sendTilEgenvurdering}
                className={spacingStyles.blokkS}
                icon={<Next />}
                iconPosition="right"
            >
                {tekst('hjelp')}
            </Button>
            <BodyShort className={spacingStyles.mb1}>
                <Link href="" onClick={avslaarEgenvurdering}>
                    {tekst('kss')}
                </Link>
            </BodyShort>
        </>
    );
}

export default EgenvurderingUke12;
