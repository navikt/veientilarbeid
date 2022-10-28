import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import { ListeElement } from '../situasjonsbestemt/situasjonsbestemt';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Dine samhandlingsverktøy mellom deg og din veileder',
        headingUenig: 'Du ønsker å klare deg selv',
        beskrivelseUenig:
            'Enn så lenge er du satt opp til å motta veiledning for å nå arbeidsmålene dine. En veileder vil vurdere det du har gitt av innspill og kanskje ta kontakt så dere kan vurdere dette sammen.',
        dialog: 'Gå til dialogen',
        aktivitetsplan: 'Gå til din aktivitetsplan',
    },
    en: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Dine samhandlingsverktøy mellom deg og din veileder',
        headingUenig: 'Du ønsker å klare deg selv',
        beskrivelseUenig:
            'Enn så lenge er du satt opp til å motta veiledning for å nå arbeidsmålene dine. En veileder vil vurdere det du har gitt av innspill og kanskje ta kontakt så dere kan vurdere dette sammen.',
        dialog: 'Gå til dialogen',
        aktivitetsplan: 'Gå til din aktivitetsplan',
    },
};

function EnigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return ListeElement(
        <Dialog />,
        <div>
            <Heading className={spacingStyles.blokkXs} size="medium">
                {tekst('headingEnig')}
            </Heading>
            <BodyLong className={spacingStyles.mb1}>[{tekst('dialog')}]</BodyLong>
            <BodyLong className={spacingStyles.mb1}>[{tekst('aktivitetsplan')}]</BodyLong>
            <ReadMoreVeileder />
        </div>
    );
}

function UenigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return ListeElement(
        <Dialog />,
        <div className={spacingStyles.fullWidth}>
            <Heading className={spacingStyles.blokkXs} size="medium">
                {tekst('headingUenig')}
            </Heading>
            <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseUenig')}</BodyLong>
            <BodyLong className={spacingStyles.mb1}>[{tekst('dialog')}]</BodyLong>
            <BodyLong className={spacingStyles.mb1}>[{tekst('aktivitetsplan')}]</BodyLong>
            <ReadMoreVeileder />
        </div>
    );
}

function BehovsavklaringSvartSituasjonsbestemt() {
    const { behovForVeiledning } = useBehovForVeiledning();
    return behovForVeiledning!.oppfolging === 'KLARE_SEG_SELV' ? <UenigMedProfilering /> : <EnigMedProfilering />;
}

export default BehovsavklaringSvartSituasjonsbestemt;
