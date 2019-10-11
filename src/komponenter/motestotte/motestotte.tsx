import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { gaTilMotestotte, seMotestotte } from '../../metrics/metrics';
import {
    BrukerregistreringContext,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato
} from '../../ducks/brukerregistrering';
import { antallTimerSidenRegistrering } from '../egenvurdering/egenvurdering'
import { motestotteLenke } from '../../innhold/lenker';
import './motestotte.less';

interface InputProps {
    erSykmeldtMedArbeidsgiver: boolean;
}

const Motestotte = ({erSykmeldtMedArbeidsgiver}: InputProps) => {

    const data = React.useContext(BrukerregistreringContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt


    React.useEffect(() => {
        seMotestotte(foreslattInnsatsgruppe);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleButtonClick = () => {
        gaTilMotestotte(antallTimerSidenRegistrering(opprettetRegistreringDato!), foreslattInnsatsgruppe);
        window.location.href = motestotteLenke;
    };

    if (erSykmeldtMedArbeidsgiver) {
        return <section className="motestotte blokk-m">
            <div className="innhold">
                <Systemtittel tag="h1" className="blokk-xs">
                    Du kan få mer veiledning
                </Systemtittel>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg
                    slutten. </Normaltekst>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for
                    deg.
                </Normaltekst>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Det du forteller vil også bli brukt i en skriftlig vurdering av behovet ditt for hjelp fra NAV.
                </Normaltekst>
                <Hovedknapp onClick={handleButtonClick}>
                    Start
                </Hovedknapp>
            </div>
        </section>
    }

    return (
        <section className="motestotte blokk-m">
            <div className="innhold">
                <Systemtittel tag="h1" className="blokk-xs">
                    Du kan få veiledning
                </Systemtittel>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Du har svart at du har utfordringer som hindrer deg i å søke eller være i jobb.
                </Normaltekst>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for
                    deg.
                </Normaltekst>
                <Normaltekst className="blokk-m motestotte__tekst">
                    Det du forteller vil også bli brukt i en skriftlig vurdering av behovet ditt for hjelp fra NAV.
                </Normaltekst>
                <Hovedknapp onClick={handleButtonClick}>
                    Start
                </Hovedknapp>
            </div>
        </section>
    );
};

export default Motestotte;