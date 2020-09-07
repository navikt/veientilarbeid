import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { uniLogger } from '../../metrics/uni-logger'
import { loggAktivitet } from '../../metrics/metrics';
import './paminnelse.less';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

const sjekkKontonummer = (props: OwnProps) => {
    const { poaGruppe, geografiskTilknytning, isKSSX } = props;

    const handleClick = () => {
        uniLogger('sjekkKontonummer.click');
        loggAktivitet({ aktivitet: 'Går til sjekk kontonummer', gruppe: poaGruppe, geografiskTilknytning, isKSSX });
    }
    return (
        <div className="wrapper">
            <Panel border className="ramme blokk-s">
                <section className="paminnelse">
                    <div className="innhold">
                        <Systemtittel tag="h2" className="blokk-xs">
                            Sjekk kontonummer
                        </Systemtittel>
                        <Normaltekst className="blokk-xs">
                            For å unngå forsinkelser i utbetalinger og saksbehandling er det viktig å sjekke at du har registrert det rette kontonummeret hos oss.
                        </Normaltekst>
                        <Lenke href="https://www.nav.no/person/personopplysninger/#utbetaling" onClick={handleClick} target='_blank'>Kontroller kontonummer</Lenke>
                    </div>
                </section>
            </Panel>
        </div>
    );
}

export default sjekkKontonummer;


