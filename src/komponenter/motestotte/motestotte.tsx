import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { gaTilMotestotte, seMotestotte} from '../../metrics';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe, selectOpprettetRegistreringDato } from '../../ducks/brukerregistrering';
import { antallTimerSidenRegistrering } from '../egenvurdering/egenvurdering'
import {motestotteLenke} from '../../innhold/lenker';
import './motestotte.less';

interface StateProps {
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe;
    opprettetRegistreringDato: Date | null;
}

interface InputProps{
    erSykmeldtMedArbeidsgiver: boolean;
}

type MotestotteProps = StateProps & InputProps;

class Motestotte extends React.Component<MotestotteProps> {

    componentDidMount() {
        seMotestotte(this.props.foreslattInnsatsgruppe);
    }

    handleButtonClick = () => {
        const { opprettetRegistreringDato, foreslattInnsatsgruppe } = this.props;

        gaTilMotestotte(antallTimerSidenRegistrering(opprettetRegistreringDato!), foreslattInnsatsgruppe);
        window.location.href = motestotteLenke;
    };

    render() {
        const {erSykmeldtMedArbeidsgiver} = this.props;

        if(erSykmeldtMedArbeidsgiver){
            return <section className="motestotte blokk-m">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        Du kan få mer veiledning
                    </Systemtittel>
                    <Normaltekst className="blokk-m motestotte__tekst">
                        Du har svart at du trenger mer veiledning nå som retten til sykepenger nærmer seg slutten.                    </Normaltekst>
                    <Normaltekst className="blokk-m motestotte__tekst">
                        Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.
                    </Normaltekst>
                    <Normaltekst className="blokk-m motestotte__tekst">
                        Det du forteller vil også bli brukt i en skriftlig vurdering av behovet ditt for hjelp fra NAV.
                    </Normaltekst>
                    <Hovedknapp onClick={this.handleButtonClick}>
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
                        Vi ønsker å bli bedre kjent med situasjonen din, slik at du kan få veiledning som passer for deg.
                    </Normaltekst>
                    <Normaltekst className="blokk-m motestotte__tekst">
                        Det du forteller vil også bli brukt i en skriftlig vurdering av behovet ditt for hjelp fra NAV.
                    </Normaltekst>
                    <Hovedknapp onClick={this.handleButtonClick}>
                        Start
                    </Hovedknapp>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const opprettetRegistreringDato = selectOpprettetRegistreringDato(state);

    return {
        foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state)!, // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
        opprettetRegistreringDato: opprettetRegistreringDato ? new Date(opprettetRegistreringDato): null,
    };
};

export default connect(mapStateToProps)(Motestotte);