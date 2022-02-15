import * as React from 'react';
import {
    ForeslattInnsatsgruppe,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
    useBrukerregistreringData,
} from '../../contexts/brukerregistrering';
import { motestotteLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { OppfolgingContext, Servicegruppe } from '../../contexts/oppfolging';
import { MotestotteContext } from '../../contexts/motestotte';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import tekster from '../../tekster/tekster';
import { BodyShort, Button, Heading, Panel } from '@navikt/ds-react';

const LANSERINGSDATO_MOTESTOTTE = new Date('2020-03-12');

interface MotestotteTekster {
    systemtittel: String;
    tekster: Array<String>;
}

function hentTekster(erSykmeldtMedArbeidsgiver: boolean): MotestotteTekster {
    const sykmeldtStatus = erSykmeldtMedArbeidsgiver ? 'sykmeldt' : 'ikkeSykmeldt';
    const [tittelNokkel, avsnittNokkel] = [
        `motestotte-${sykmeldtStatus}-systemtittel`,
        `motestotte-${sykmeldtStatus}-avsnitt`,
    ];
    return {
        systemtittel: tekster[tittelNokkel],
        tekster: tekster[avsnittNokkel],
    };
}

const Motestotte = () => {
    const amplitudeData = useAmplitudeData();
    const data = useBrukerregistreringData();
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const motestotteData = React.useContext(MotestotteContext).data;
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    const { systemtittel, tekster } = hentTekster(erSykmeldtMedArbeidsgiver);
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
    const dinSituasjon = selectDinSituasjonSvar(data) || 'INGEN_VERDI';
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const harGyldigMotestottebesvarelse = (): boolean => {
        if (!opprettetRegistreringDato || !motestotteData) return false;
        return opprettetRegistreringDato <= new Date(motestotteData.dato);
    };

    const kanViseKomponent =
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Servicegruppe.BKART &&
        !harGyldigMotestottebesvarelse() &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE &&
        !oppfolgingData.reservasjonKRR &&
        foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING &&
        underOppfolging;

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til møtestøtte', ...amplitudeData });
        window.location.assign(motestotteLenke);
    };

    if (!kanViseKomponent) return null;

    return (
        <Panel border className="blokk-s">
            <Heading size="medium" level="1" className="blokk-xs">
                {systemtittel}
            </Heading>
            {tekster.map((tekst) => (
                <BodyShort key={tekst as string} className="blokk-xs">
                    {tekst}
                </BodyShort>
            ))}
            <Button variant="primary" onClick={handleClick}>
                Start
            </Button>
        </Panel>
    );
};

export default Motestotte;
