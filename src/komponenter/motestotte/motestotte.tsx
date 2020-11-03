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
import './motestotte.less';
import { OppfolgingContext, Servicegruppe } from '../../ducks/oppfolging';
import { MotestotteContext } from '../../ducks/motestotte';
import { BrukerInfoContext } from '../../ducks/bruker-info';

const LANSERINGSDATO_MOTESTOTTE = new Date('2020-03-12');

function hentTekster(erSykmeldtMedArbeidsgiver: boolean) {
    return erSykmeldtMedArbeidsgiver
        ? {
              systemtittel: 'Du kan få mer veiledning',
              tekster: [
                  'Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg slutten.',
                  'Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.',
              ],
          }
        : {
              systemtittel: 'Du kan få veiledning',
              tekster: [
                  'Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb.',
                  'Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.',
              ],
          };
}

const lagKnappelytter = (antallTimer = 0, foreslattInnsatsgruppe = 'UKJENT') => () => {
    uniLogger('motestotte.gatil', { antallTimer, foreslattInnsatsgruppe });
    window.location.href = motestotteLenke;
};

const Motestotte = () => {
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

    const harGyldigMotestottebesvarelse = (): boolean => {
        if (!opprettetRegistreringDato || !motestotteData) return false;
        return opprettetRegistreringDato <= new Date(motestotteData.dato);
    };

    const skalViseMotestotteLenke =
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Servicegruppe.BKART &&
        !harGyldigMotestottebesvarelse() &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_MOTESTOTTE &&
        !oppfolgingData.reservasjonKRR &&
        foreslattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING;

    React.useEffect(() => {
        uniLogger('motestotte.visning', { antallTimer, foreslattInnsatsgruppe });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (skalViseMotestotteLenke) return null;

    return (
        <Panel border className="ramme blokk-s">
            <section className="motestotte blokk-m">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {systemtittel}
                    </Systemtittel>
                    {tekster.map((tekst) => (
                        <Normaltekst className="blokk-m motestotte__tekst">{tekst}</Normaltekst>
                    ))}
                    <Hovedknapp onClick={lagKnappelytter(antallTimer, foreslattInnsatsgruppe)}>Start</Hovedknapp>
                </div>
            </section>
        </Panel>
    );
};

export default Motestotte;
