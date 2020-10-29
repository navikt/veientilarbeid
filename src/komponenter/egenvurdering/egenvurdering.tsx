import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { seEgenvurdering, gaTilEgenvurdering, loggAktivitet } from '../../metrics/metrics';
import {
    BrukerregistreringContext,
    selectForeslattInnsatsgruppe,
    selectOpprettetRegistreringDato
} from '../../ducks/brukerregistrering';
import './egenvurdering.less';
import { behovsvurderingLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import {AmplitudeAktivitetContext} from "../../ducks/amplitude-aktivitet-context";

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

export const antallTimerSidenRegistrering = (registreringsDato: Date) => {
    return antallTimerMellomAOgBRundetOpp(registreringsDato, new Date());
};

const Egenvurdering = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const data = React.useContext(BrukerregistreringContext).data;
    const opprettetRegistreringDatoString = selectOpprettetRegistreringDato(data);
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(data)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
    const timerSidenRegistrering =  antallTimerSidenRegistrering(opprettetRegistreringDato!);

    React.useEffect(() => {
        seEgenvurdering(foreslattInnsatsgruppe);
        loggAktivitet({ aktivitet: 'Viser egenvurdering', ...amplitudeAktivitetsData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleButtonClick = () => {
        gaTilEgenvurdering(timerSidenRegistrering, foreslattInnsatsgruppe);
        loggAktivitet({ aktivitet: 'Går til egenvurdering', ...amplitudeAktivitetsData })
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

export default Egenvurdering;
