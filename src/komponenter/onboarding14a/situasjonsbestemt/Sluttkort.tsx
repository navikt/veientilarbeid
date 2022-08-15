import { Servicegruppe, useOppfolgingData } from '../../../contexts/oppfolging';
import Lenkepanel14A from '../lenkepanel-14a';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../../contexts/ulestedialoger';
import { behovsvurderingLenke, dialogLenke } from '../../../innhold/lenker';
import { hentEllerSettFraBrowserStorage } from '../../../utils/browserStorage-utils';
import { HAR_MOTTATT_EGENVURDERING_KVITTERING } from '../../kvitteringer/behovsvurdering-legacy';
import TemaLenkepanel from '../../tema/tema-lenkepanel';
import { Heading, BodyShort } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        headingEtterVedtak: 'Du har rett til å få hjelp og støtte fra en veileder',
        ingressEtterVedtak: 'Du kan stille spørsmål til veilederen i dialogen nedenfor.',
        headerForEgenvurdering: 'Du vil motta et brev som forteller hva NAV kan tilby deg av hjelp',
        ingressForEgenvurdering: 'Vanligvis sender vi brevet innen noen uker. Tar det lengre tid vil vi ta kontakt.',
        tekstForEgenvurdering: 'Du kan når som helst ta kontakt og fortelle oss hva du ønsker at vi hjelper deg med.',
        tittelEgenvurdering: 'Hva trenger du hjelp til?',
        beskrivelseEgenvurdering: 'Svar oss her',
        defaultTittel: 'Du vil motta et brev som forteller hva NAV kan tilby deg av hjelp',
        defaultIngress: 'Du får tilsendt brevet i løpet av noen uker. Tar det lengre tid vil vi ta kontakt.',
        defaultTekst: 'Du kan stille spørsmål til veileder i dialogen nedenfor.',
    },
    en: {
        headingEtterVedtak: 'You are entitled to help and support from a counselor',
        ingressEtterVedtak: 'You can ask questions to the counselor by contacting us via the dialogue.',
        headerForEgenvurdering: 'You will receive a letter telling you what NAV can offer you in terms of help',
        ingressForEgenvurdering:
            'We usually send the letter within a few weeks. If it takes longer, we will get in touch.',
        tekstForEgenvurdering: 'You can contact us at any time and tell us what you want us to help you with.',
        tittelEgenvurdering: 'What do you need help with?',
        beskrivelseEgenvurdering: 'Answer here',
        defaultTittel: 'You will receive a letter telling you what NAV can offer you in terms of help',
        defaultIngress: 'You will receive the letter within a few weeks. If it takes longer, we will get in touch.',
        defaultTekst: 'You can ask questions to the counselor by contacting us via the dialogue.',
    },
};

function Sluttkort() {
    const amplitudeData = useAmplitudeData();
    const { antallUleste } = useUlesteDialogerData();
    const { servicegruppe } = useOppfolgingData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const har_mottatt_egenvurdering_kvittering = hentEllerSettFraBrowserStorage(
        HAR_MOTTATT_EGENVURDERING_KVITTERING,
        ''
    );

    if (servicegruppe === Servicegruppe.BFORM) {
        return (
            <>
                <Heading size="medium" className={'blokk-xs'}>
                    {tekst('headingEtterVedtak')}
                </Heading>

                <BodyShort className={'blokk-xs'}>{tekst('ingressEtterVedtak')}</BodyShort>
                <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
            </>
        );
    } else if (!har_mottatt_egenvurdering_kvittering) {
        return (
            <>
                <Heading size="medium" className={'blokk-xs'}>
                    {tekst('headerForEgenvurdering')}
                </Heading>

                <BodyShort className={'blokk-xs'}>{tekst('ingressForEgenvurdering')}</BodyShort>
                <BodyShort className={'blokk-xs'}>{tekst('tekstForEgenvurdering')}</BodyShort>
                <TemaLenkepanel
                    href={`${behovsvurderingLenke}/hvilken-veiledning-trengs`}
                    amplitudeTema={'14a'}
                    amplitudeTilstand="sluttkort"
                    amplitudeHandling={'går til egenvurdering fra '}
                    tittel={tekst('tittelEgenvurdering')}
                    beskrivelse={tekst('beskrivelseEgenvurdering')}
                />
            </>
        );
    }
    return (
        <>
            <Heading size="medium" className={'blokk-xs'}>
                {tekst('defaultTittel')}
            </Heading>

            <BodyShort className={'blokk-xs'}>{tekst('defaultIngress')}</BodyShort>
            <BodyShort className={'blokk-xs'}>{tekst('defaultTekst')}</BodyShort>

            <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
        </>
    );
}

export default Sluttkort;
