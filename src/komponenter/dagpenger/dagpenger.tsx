import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const Dagpenger = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const kanViseKomponent = underOppfolging && !erSykmeldtMedArbeidsgiver;

    React.useEffect(() => {
        loggAktivitet({ aktivitet: 'Viser dagpengesøknad', ...amplitudeData });
    }, [amplitudeData]);

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
                    <Knapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['dagpenger-lenke-tekst']}
                    </Knapp>
                </div>
            </Panel>
        </div>
    );
};

export default Dagpenger;
