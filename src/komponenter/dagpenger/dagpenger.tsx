import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadDagpenger } from '../../metrics/metrics';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Dagpenger = () => {

    const formidlingsgruppe = React.useContext(OppfolgingContext).data.formidlingsgruppe;
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleButtonClick = () => {
        klikkPaSoknadDagpenger(formidlingsgruppe, servicegruppe);
        window.location.href = dagpengerSoknadLenke;
    };
  
    return (
        <div className="dagpenger">
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
        </div>
    );
};

export default Dagpenger;
