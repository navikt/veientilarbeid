import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import './alleskjema.less';
import { alleSkjemaSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';

const AlleSkjema = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til alle skjema', ...amplitudeAktivitetsData });
        window.location.assign(alleSkjemaSoknadLenke);
    };

    return (
        <div className="alleskjema">
            <Panel border className="alleskjema-ramme blokk-l">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {tekster['alleskjema-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s dagpenger__tekst">{tekster['alleskjema-tekst']}</Normaltekst>
                    <Knapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['alleskjema-lenke-tekst']}
                    </Knapp>
                </div>
            </Panel>
        </div>
    );
};

export default AlleSkjema;
