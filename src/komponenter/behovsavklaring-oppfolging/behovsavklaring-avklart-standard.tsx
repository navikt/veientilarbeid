import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel, ReadMore, Link } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { BehovForVeiledningResponse, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { aktivitetsplanLenke, dialogLenke } from '../../innhold/lenker';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { AmplitudeStandardAktivitetsData, loggAktivitet } from '../../metrics/metrics';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { MouseEventHandler } from 'react';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du har gode muligheter til å klare deg selv',
        headingUenig: 'Du har sagt at du ønsker hjelp',
        beskrivelseEnig: 'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egenhånd.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeadingEnig: 'Gi beskjed dersom du likevel ønsker veiledning',
        readMoreInnholdEnig: 'Du kan når som helst ta kontakt for å starte samhandling med en veileder.',
        gaTilDialog: 'Gå til dialogen',
        gaTilAktivitetsplan: 'Gå til din aktivitetsplan',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

export function onClickDialogKnapp(behovForVeiledning: BehovForVeiledningResponse, amplitudeData: AmplitudeData) {
    return () => {
        loggAktivitet({
            aktivitet: `Trykker på gå til dialog-knapp - ${behovForVeiledning?.oppfolging}`,
            ...amplitudeData,
        });
        const dialogId = behovForVeiledning?.dialogId ? `/${behovForVeiledning?.dialogId}` : '';
        window.location.href = `${dialogLenke}${dialogId}`;
    };
}

export function loggLenkeKlikkTilAmplitude(
    data: AmplitudeStandardAktivitetsData
): MouseEventHandler<HTMLAnchorElement> {
    return (e) => {
        e.preventDefault();
        loggAktivitet(data);
        window.location.href = (e.target as HTMLAnchorElement).href;
    };
}

function BehovsavklaringAvklartStandard() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { behovForVeiledning } = useBehovForVeiledning();
    const { amplitudeData } = useAmplitudeData();

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - avklart - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnig')}</BodyLong>
                <ReadMore size="medium" header={tekst('readMoreHeadingEnig')} className={spacingStyles.mb1}>
                    <BodyLong className={spacingStyles.blokkXs}>{tekst('readMoreInnholdEnig')}</BodyLong>
                    <Button onClick={onClickDialogKnapp(behovForVeiledning, amplitudeData)}>
                        {tekst('gaTilDialog')}
                    </Button>
                </ReadMore>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <Link
                        href={dialogLenke}
                        onClick={loggLenkeKlikkTilAmplitude({
                            aktivitet: 'Behovsavklaring - avklart - standard - går til dialogen',
                            ...amplitudeData,
                        })}
                    >
                        {tekst('gaTilDialog')}
                    </Link>
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <Link
                        href={aktivitetsplanLenke}
                        onClick={loggLenkeKlikkTilAmplitude({
                            aktivitet: 'Behovsavklaring - avklart - standard - går til aktivitetsplanen',
                            ...amplitudeData,
                        })}
                    >
                        {tekst('gaTilAktivitetsplan')}
                    </Link>
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - avklart - standard i viewport" />
        </Panel>
    );
}

export default BehovsavklaringAvklartStandard;
