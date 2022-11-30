import { Next } from '@navikt/ds-icons/cjs';
import { BodyShort, Button, Heading, Link } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';
import { useProfil } from '../../contexts/profil';

import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';
import * as React from 'react';

export const AVSLAATT_EGENVURDERING = 'egenvurdering-avslaatt';

const TEKSTER = {
    nb: {
        heading: 'Hva trenger du for å komme i jobb?',
        beskrivelse:
            'Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv mener.',
        svar: 'Svar her',
        kss: 'Jeg ønsker å klare meg selv',
    },
    en: {
        heading: 'How can you get back to work?',
        beskrivelse:
            'You have a right to get a textual assessment of your need to get help from NAV. Tell us about your needs.',
        svar: 'Answer here',
        kss: 'I want to handle it on my own',
    },
};

const EgenvurderingIVURD = () => {
    const { amplitudeData } = useAmplitudeData();
    const { lagreProfil } = useProfil();

    const lagreEgenvurderingDato = () => {
        const datoNaa = new Date().toISOString();
        const egenvurderingProfilId = hentProfilnokkelFraLocalStorage(AVSLAATT_EGENVURDERING);

        lagreProfil({
            [egenvurderingProfilId]: datoNaa,
        });
    };

    const handleButtonClick = () => {
        lagreEgenvurderingDato();
        loggAktivitet({ aktivitet: 'Går til egenvurdering fra sluttkort', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    function avslaarEgenvurdering(event: React.SyntheticEvent) {
        event.preventDefault();
        lagreEgenvurderingDato();
        loggAktivitet({ aktivitet: 'Avslår egenvurdering fra sluttkort', ...amplitudeData });
    }

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <ErRendret loggTekst="Rendrer egenvurdering på sluttkort" />
            <Heading level="2" size="medium" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            <BodyShort className={spacingStyles.blokkXs}>{tekst('beskrivelse')}</BodyShort>
            <Button
                variant="primary"
                onClick={handleButtonClick}
                className={spacingStyles.blokkXs}
                icon={<Next />}
                iconPosition="right"
            >
                <span>{tekst('svar')}</span>
            </Button>
            <BodyShort className={spacingStyles.blokkXs}>
                <Link href={''} onClick={avslaarEgenvurdering}>
                    {tekst('kss')}
                </Link>
            </BodyShort>
            <InViewport loggTekst="Viser egenvurdering i viewport på sluttkort" />
        </>
    );
};

export default EgenvurderingIVURD;
