import { useState } from 'react';
import { BodyShort, ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { Sprak } from '../../contexts/sprak';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        header: 'Hvorfor ble arbeidssøkerperioden min avsluttet?',
        vanligsteGrunn: 'Vanligste årsak til dette er',
        meldekortSent: 'at du har sendt inn ett eller flere meldekort for sent',
        meldekortNei: 'at du på et meldekort har svart nei på om du fortsatt ønsker å være registrert som arbeidssøker',
        fortsattRegistrert: 'Dersom du ønsker å være registrert som arbeidssøker må du',
        sendMeldekort: 'sende inn meldekortet innen fristen hver 14. dag',
        svarJa: 'svare ja på at du fortsatt ønsker å være registrert som arbeidssøker',
        konsekvens:
            'Gjør du ikke dette vil NAV gå ut fra at du ikke ønsker å være registrert som arbeidssøker og at du heller ikke har behov for å motta dagpenger eller tiltakspenger.',
    },
    en: {
        header: 'Hvorfor ble arbeidssøkerperioden min avsluttet?',
        vanligsteGrunn: 'Vanligste årsak til dette er',
        meldekortSent: 'at du har sendt inn ett eller flere meldekort for sent',
        meldekortNei: 'at du på et meldekort har svart nei på om du fortsatt ønsker å være registrert som arbeidssøker',
        fortsattRegistrert: 'Dersom du ønsker å være registrert som arbeidssøker må du',
        sendMeldekort: 'sende inn meldekortet innen fristen hver 14. dag',
        svarJa: 'svare ja på at du fortsatt ønsker å være registrert som arbeidssøker',
        konsekvens:
            'Gjør du ikke dette vil NAV gå ut fra at du ikke ønsker å være registrert som arbeidssøker og at du heller ikke har behov for å motta dagpenger eller tiltakspenger.',
    },
};

interface Props {
    sprak: Sprak;
}

function Innhold(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    return (
        <div className={spacingStyles.mt1}>
            <BodyShort className={spacingStyles.mb1}>
                {tekst('vanligsteGrunn')}
                <ul>
                    <li>{tekst('meldekortSent')}</li>
                    <li>{tekst('meldekortNei')}</li>
                </ul>
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>
                {tekst('fortsattRegistrert')}
                <ul>
                    <li>{tekst('sendMeldekort')}</li>
                    <li>{tekst('svarJa')}</li>
                </ul>
            </BodyShort>
            <BodyShort className={spacingStyles.mb1}>{tekst('konsekvens')}</BodyShort>
        </div>
    );
}

function ReadMoreInaktivering(props: Props) {
    const { amplitudeData } = useAmplitudeData();
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);

    const handleClickOpenReadMoreInaktivering = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Åpner ReadMore om inaktivering', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpenReadMoreInaktivering}>
            <Innhold sprak={props.sprak} />
        </ReadMore>
    );
}

export { ReadMoreInaktivering };
