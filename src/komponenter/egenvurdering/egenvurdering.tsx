import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { seEgenvurdering, gaTilEgenvurdering } from '../../metrics/metrics';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import {
    ForeslattInnsatsgruppe,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato
} from '../../ducks/brukerregistrering';
import './egenvurdering.less';
import { behovsvurderingLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

export const antallTimerSidenRegistrering = (registreringsDato: Date) => {
    return antallTimerMellomAOgBRundetOpp(registreringsDato, new Date());
};

interface StateProps {
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe;
    opprettetRegistreringDato: Date | null;
}

const Egenvurdering = ({opprettetRegistreringDato, foreslattInnsatsgruppe}: StateProps) => {

    React.useEffect(() => {
        seEgenvurdering(foreslattInnsatsgruppe);
    }, []);

    const handleButtonClick = () => {
        gaTilEgenvurdering(antallTimerSidenRegistrering(opprettetRegistreringDato!), foreslattInnsatsgruppe);
        window.location.href = behovsvurderingLenke;
    };

    return (
        <Panel border className="ramme blokk-s">
            <section className="egenvurdering">
                <div className="innhold">
                    <Systemtittel tag="h2" className="blokk-xs">
                        {tekster['egenvurdering-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s egenvurdering__tekst">
                        {tekster['egenvurdering-tekst']}
                    </Normaltekst>
                    <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['egenvurdering-lenke-tekst']}
                    </Hovedknapp>
                </div>
            </section>
        </Panel>
    );
};

const mapStateToProps = (state: AppState): StateProps => {
    const opprettetRegistreringDato = selectOpprettetRegistreringDato(state);

    return {
        foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state)!, // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
        opprettetRegistreringDato: opprettetRegistreringDato ? new Date(opprettetRegistreringDato) : null,
    };
};

export default connect(mapStateToProps)(Egenvurdering);