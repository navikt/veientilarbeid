import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadDagpenger } from '../../metrics';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';

class Dagpenger extends React.Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    handleButtonClick = () => {
        klikkPaSoknadDagpenger();
        window.location.href = dagpengerSoknadLenke;
    }

    render() {
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
                        <Knapp onClick={this.handleButtonClick} className="blokk-xs">
                            {tekster['dagpenger-lenke-tekst']}
                        </Knapp>
                    </div>
            </Panel>
            </section>
        );
    }
}

export default Dagpenger;
