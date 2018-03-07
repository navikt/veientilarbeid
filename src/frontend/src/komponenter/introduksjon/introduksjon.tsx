import * as React from 'react';
import { Component } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import OverlaySide from './overlaySide';
import Overlay from './overlay';
import { FormattedMessage } from 'react-intl';
import { parse } from 'query-string';
import { getCurrentUrlWithoutQueryParam } from '../../utils/utils';

interface State {
    visOverlay: boolean;
}

export default class Introduksjon extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            visOverlay: parse(location.search).visOverlay === 'true'
        };
    }

    closeOverlay() {
        history.pushState(history.state, '', getCurrentUrlWithoutQueryParam('visOverlay'));
        this.setState({
            visOverlay: false
        });
    }

    render() {
        return (this.state.visOverlay) ? (
            <Overlay
                close={() => this.closeOverlay()}
                appElementSelector=".appContainer"
            >
                <OverlaySide>
                    <div className="overlay__illustrasjon-jobbsoker"/>
                    <Innholdstittel className="blokk-s">
                        <FormattedMessage id="introduksjon-overskrift" />
                    </Innholdstittel>
                    <Normaltekst>
                        <FormattedMessage id="introduksjon-brodtekst" />
                    </Normaltekst>
                </OverlaySide>
                <OverlaySide>
                    <div className="overlay__illustrasjon-jobbsoker"/>
                    <Innholdstittel className="blokk-s">TODO FO-169</Innholdstittel>
                </OverlaySide>
            </Overlay>
        ) : (null);
    }
}