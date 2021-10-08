import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { loggAktivitet } from '../../metrics/metrics';
import './ikke-registrert.less';
import { registreringsLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';

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

    if (!kanViseKomponent) return null;

    return (
        <Panel border className="ramme blokk-s">
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
        </Panel>
    );
};

export default IkkeRegistrert;
