import { useContext } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeContext } from '../../contexts/amplitude-context';
import { BrukerInfoContext } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';

const Dagpenger = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = useContext(BrukerInfoContext).data;
    const kanViseKomponent = underOppfolging && !erSykmeldtMedArbeidsgiver;

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til dagpengesøknad', ...amplitudeData });
        window.location.assign(dagpengerSoknadLenke);
    };

    return !kanViseKomponent ? null : (
        <div className="dagpenger">
            <Panel border className="dagpenger-ramme blokk-l">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        {tekster['dagpenger-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s dagpenger__tekst">{tekster['dagpenger-tekst']}</Normaltekst>
                    <Knapp onClick={() => handleButtonClick()} className="blokk-xs" htmlType="button">
                        {tekster['dagpenger-lenke-tekst']}
                    </Knapp>
                </div>
            </Panel>
        </div>
    );
};

export default Dagpenger;
