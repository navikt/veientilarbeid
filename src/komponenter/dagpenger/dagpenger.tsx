import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadDagpenger } from '../../metrics/metrics';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AppState } from '../../reducer';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull
}

const Dagpenger = (props: StateProps) => {

    const { servicegruppe } = props;

    const handleButtonClick = () => {
        klikkPaSoknadDagpenger(servicegruppe);
        window.location.href = dagpengerSoknadLenke;
    }
  
    return (
        <section className="dagpenger" id="informasjonsmodul">
            <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
                {tekster['dagpenger-heading-tekst']}
            </Systemtittel>
            <Panel border className="dagpenger-ramme blokk-l">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {tekster['dagpenger-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s dagpenger__tekst">
                        {tekster['dagpenger-tekst']}
                    </Normaltekst>
                    <Knapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['dagpenger-lenke-tekst']}
                    </Knapp>
                </div>
        </Panel>
        </section>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(Dagpenger);
