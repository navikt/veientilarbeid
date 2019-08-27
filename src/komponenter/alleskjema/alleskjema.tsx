import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadAlleSkjema } from '../../metrics/metrics';
import './alleskjema.less';
import { alleSkjemaSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AppState } from '../../reducer';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull
}

const AlleSkjema = (props: StateProps) => {
    const { servicegruppe } = props;

    const handleButtonClick = () => {
        klikkPaSoknadAlleSkjema(servicegruppe);
        window.location.href = alleSkjemaSoknadLenke;
    }
  
    return (
        <div className="alleskjema">
            <Panel border className="alleskjema-ramme blokk-l">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {tekster['alleskjema-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s dagpenger__tekst">
                        {tekster['alleskjema-tekst']}
                    </Normaltekst>
                    <Knapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['alleskjema-lenke-tekst']}
                    </Knapp>
                </div>
        </Panel>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(AlleSkjema);
