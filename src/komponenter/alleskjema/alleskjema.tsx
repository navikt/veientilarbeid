import { useContext } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import './alleskjema.less';
import { alleSkjemaSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeContext } from '../../contexts/amplitude-context';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';

const AlleSkjema = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = underOppfolging;

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til alle skjema', ...amplitudeData });
        window.location.assign(alleSkjemaSoknadLenke);
    };

    return !kanViseKomponent ? null : (
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
