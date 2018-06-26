import * as React from 'react';
import { connect } from 'react-redux';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { AppState } from '../../reducer';

const hvordansokejobber = require('./muligheter-i-arbeidsmarkedet.svg');

interface StateProps {
    visMia: boolean;
}

class MuligheterIArbeidsmarkedet extends React.Component<StateProps> {
    render() {
        if (!this.props.visMia) {
            return null;
        }
        return (
            <Lenkepanel className="ressurslenke" href="/mia/">
                <img
                    src={hvordansokejobber}
                    alt="Forstørrelsesglass"
                    className="ressurslenke__illustrasjon"
                />
                <div className="ressurslenke__tekst">
                    <Systemtittel className="blokk-xs">
                        <FormattedMessage id="mia-overskrift"/>
                    </Systemtittel>
                    <Element>
                        <FormattedMessage id="mia-beskrivelse"/>
                    </Element>
                </div>
            </Lenkepanel>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    visMia: state.featureToggles.data['veientilarbeid.mia'],
});

export default connect(mapStateToProps)(MuligheterIArbeidsmarkedet);