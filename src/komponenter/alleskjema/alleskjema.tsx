import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadAlleSkjema, loggAktivitet } from '../../metrics/metrics';
import './alleskjema.less';
import { alleSkjemaSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const AlleSkjema = (props: AmplitudeAktivitetsProps) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const { amplitudeAktivitetsData } = props;

    const handleButtonClick = () => {
        klikkPaSoknadAlleSkjema(servicegruppe);
        loggAktivitet({ aktivitet: 'Går til alle skjema', ...amplitudeAktivitetsData });
        window.location.href = alleSkjemaSoknadLenke;
    };
  
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
