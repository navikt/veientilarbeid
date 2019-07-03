import React, { useContext } from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadAlleSkjema } from '../../metrics';
import './alleskjema.less';
import { alleSkjemaSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';

const AlleSkjema = () => {
    const innsatsgruppeData: Data | null = useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    const handleButtonClick = () => {
        klikkPaSoknadAlleSkjema(innsatsgruppe);
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

export default AlleSkjema;
