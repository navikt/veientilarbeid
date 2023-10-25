import { BodyShort, Button, Heading, Box } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';
import { motestotteLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import {
    ForeslattInnsatsgruppe,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
    useBrukerregistreringData,
} from '../../hooks/use-brukerregistrering-data';
import { Servicegruppe, useOppfolgingData } from '../../hooks/use-oppfolging-data';
import { useBrukerInfoData } from '../../hooks/use-brukerinfo-data';
import { useArbeidssokerData } from '../../hooks/use-arbeidssoker-data';
import { useEffect, useState } from 'react';
import { fetchData } from '../../ducks/api-utils';
import { DataElement, MOTESTOTTE_URL, STATUS } from '../../ducks/api';

export interface Data {
    dato: string;
}

export interface State extends DataElement {
    data: Data | null;
}

export const initialState: State = {
    data: null,
    status: STATUS.NOT_STARTED,
};

const LANSERINGSDATO_MOTESTOTTE = new Date('2020-03-12');

const TEKSTER: Tekster<string> = {
    nb: {
        'sykmeldt-tittel': 'Du kan få mer veiledning',
        'sykmeldt-avsnitt1':
            'Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg slutten.',
        'sykmeldt-avsnitt2':
            'Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.',
        'ikkeSykmeldt-tittel': 'Du kan få veiledning',
        'ikkeSykmeldt-avsnitt1': 'Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb.',
        'ikkeSykmeldt-avsnitt2':
            'Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.',
    },
};

interface Props {
    state?: State;
}

const Motestotte = ({ state }: Props) => {
    const [motestotteState, setMotestotteState] = useState<State>(state ?? initialState);
    const { data: arbeidsSokerData } = useArbeidssokerData();
    const { amplitudeData } = useAmplitudeData();
    const brukerregistrering = useBrukerregistreringData();
    const { servicegruppe } = useOppfolgingData();
    const brukerInfo = useBrukerInfoData();

    useEffect(() => {
        if (arbeidsSokerData) {
            const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(arbeidsSokerData.brukerregistrering.data);

            if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
                fetchData<State, Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
            }
        }
    }, [arbeidsSokerData]);

    const sykmeldtStatus = brukerInfo.erSykmeldtMedArbeidsgiver ? 'sykmeldt' : 'ikkeSykmeldt';
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(brukerregistrering);
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistrering)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
    const dinSituasjon = selectDinSituasjonSvar(brukerregistrering) || 'INGEN_VERDI';
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    const harGyldigMotestottebesvarelse = (): boolean => {
        if (!opprettetRegistreringDato || !motestotteState.data) return false;
        return opprettetRegistreringDato <= new Date(motestotteState.data.dato);
    };

    const harBehovForArbeidsevnevurdering =
        servicegruppe === Servicegruppe.BKART ||
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING &&
            servicegruppe === Servicegruppe.IVURD);

    const kanViseKomponent =
        dinSituasjon !== 'ER_PERMITTERT' &&
        harBehovForArbeidsevnevurdering &&
        !harGyldigMotestottebesvarelse() &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE &&
        underOppfolging;

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til møtestøtte', ...amplitudeData });
        window.location.assign(motestotteLenke);
    };

    if (!kanViseKomponent) return null;

    return (
        <Box className={spacingStyles.blokkS} borderWidth="1">
            <Heading size="small" level="1" className={spacingStyles.blokkXs}>
                {tekst(`${sykmeldtStatus}-tittel`)}
            </Heading>
            <BodyShort className={spacingStyles.blokkXs}>{tekst(`${sykmeldtStatus}-avsnitt1`)}</BodyShort>
            <BodyShort className={spacingStyles.blokkXs}>{tekst(`${sykmeldtStatus}-avsnitt2`)}</BodyShort>
            <Button variant="primary" onClick={handleClick}>
                Start
            </Button>
        </Box>
    );
};

export default Motestotte;
