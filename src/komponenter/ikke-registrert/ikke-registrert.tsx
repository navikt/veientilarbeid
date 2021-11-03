import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { loggAktivitet } from '../../metrics/metrics';
import './ikke-registrert.less';
import { registreringsLenke } from '../../innhold/lenker';
import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import { AmplitudeContext } from '../../contexts/amplitude-context';

interface Props {
    skalTilRegistrering: boolean;
}

const IkkeRegistrert = (props: Props) => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { skalTilRegistrering } = props;

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til registrering fra IkkeRegistrert', ...amplitudeData });
        window.location.assign(registreringsLenke);
    };

    const kanViseKomponent = skalTilRegistrering;
    const infoboks = document.getElementById('registrering-status-informasjon');

    if (!kanViseKomponent) return null;

    if (kanViseKomponent && infoboks) {
        infoboks.scrollIntoView({ block: 'end', inline: 'nearest' });
    }

    return (
        <Panel border className="ramme blokk-s" id="registrering-status-informasjon">
            <ErRendret loggTekst="Rendrer IkkeRegistrert" />
            <section className="egenvurdering">
                <div className="innhold">
                    <Systemtittel tag="h2" className="blokk-xs">
                        Du er ikke registrert som arbeidssøker
                    </Systemtittel>
                    <Normaltekst className="blokk-s egenvurdering__tekst">
                        Vi kan ikke se at du er registrert som arbeidssøker hos oss.
                    </Normaltekst>
                    <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                        Registrer deg som arbeidssøker
                    </Hovedknapp>
                </div>
            </section>
            <InViewport loggTekst="Viser IkkeRegistrert i viewport" />
        </Panel>
    );
};

export default IkkeRegistrert;
