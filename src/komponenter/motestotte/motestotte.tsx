import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    selectDinSituasjonSvar,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato,
} from '../../ducks/brukerregistrering';
import { antallTimerSidenRegistrering } from '../egenvurdering/egenvurdering';
import { motestotteLenke } from '../../innhold/lenker';
import { uniLogger } from '../../metrics/uni-logger';
import { loggAktivitet } from '../../metrics/metrics';
import './motestotte.less';
import { OppfolgingContext, Servicegruppe } from '../../ducks/oppfolging';
import { MotestotteContext } from '../../ducks/motestotte';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import tekster from '../../tekster/tekster';

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

const lagKnappelytter = (antallTimer = 0, foreslattInnsatsgruppe = 'UKJENT') => () => {
    uniLogger('motestotte.gatil', { antallTimer, foreslattInnsatsgruppe });
    window.location.href = motestotteLenke;
};

const Motestotte = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeContext);
    const data = React.useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const motestotteData = React.useContext(MotestotteContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { systemtittel, tekster } = hentTekster(erSykmeldtMedArbeidsgiver);
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
    const antallTimer = antallTimerSidenRegistrering(opprettetRegistreringDato!);
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

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser møtestøtte', ...amplitudeAktivitetsData });
            uniLogger('motestotte.visning', { antallTimer, foreslattInnsatsgruppe });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kanViseKomponent, amplitudeAktivitetsData]);

    if (!kanViseKomponent) return null;

    return (
        <Panel border className="ramme blokk-s">
            <section className="motestotte blokk-m">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {systemtittel}
                    </Systemtittel>
                    {tekster.map((tekst) => (
                        <Normaltekst key={tekst as string} className="blokk-m motestotte__tekst">
                            {tekst}
                        </Normaltekst>
                    ))}
                    <Hovedknapp onClick={lagKnappelytter(antallTimer, foreslattInnsatsgruppe)}>Start</Hovedknapp>
                </div>
            </section>
        </Panel>
    );
};

export default Motestotte;
