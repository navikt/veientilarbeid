import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { loggAktivitet } from '../../metrics/metrics';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    selectForeslattInnsatsgruppe,
} from '../../ducks/brukerregistrering';
import './egenvurdering.less';
import { behovsvurderingLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { OppfolgingContext, Servicegruppe } from '../../ducks/oppfolging';
import { EgenvurderingContext } from '../../ducks/egenvurdering';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const LANSERINGSDATO_EGENVURDERING = new Date(2019, 4, 10);

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    if (!a || !b) {
        return 0;
    }
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

export const antallTimerSidenRegistrering = (registreringsDato: Date) => {
    return antallTimerMellomAOgBRundetOpp(registreringsDato, new Date());
};

const Egenvurdering = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const egenvurderingData = React.useContext(EgenvurderingContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;

    const opprettetRegistreringDatoString = brukerregistreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringData)!; // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt

    const dinSituasjon = brukerregistreringData?.registrering?.besvarelse.dinSituasjon || 'INGEN_VERDI';

    const harEgenvurderingbesvarelse = egenvurderingData !== null;
    const egenvurderingbesvarelseDato = egenvurderingData ? new Date(egenvurderingData.sistOppdatert) : null;
    const egenvurderingsbesvarelseValid = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            isValid = opprettetRegistreringDato <= egenvurderingbesvarelseDato;
        }
        return isValid;
    };

    const skalViseEgenvurderingLenke =
        underOppfolging &&
        isLevel4 &&
        dinSituasjon !== 'ER_PERMITTERT' &&
        oppfolgingData.servicegruppe === Servicegruppe.IVURD &&
        (!harEgenvurderingbesvarelse || !egenvurderingsbesvarelseValid()) &&
        opprettetRegistreringDato !== null &&
        opprettetRegistreringDato >= LANSERINGSDATO_EGENVURDERING &&
        !oppfolgingData.reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
            foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS);

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til egenvurdering', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    if (!skalViseEgenvurderingLenke) {
        return null;
    }

    return (
        <Panel border className="ramme blokk-s">
            <section className="egenvurdering">
                <div className="innhold">
                    <Systemtittel tag="h2" className="blokk-xs">
                        {tekster['egenvurdering-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s egenvurdering__tekst">{tekster['egenvurdering-tekst']}</Normaltekst>
                    <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['egenvurdering-lenke-tekst']}
                    </Hovedknapp>
                </div>
            </section>
        </Panel>
    );
};

export default Egenvurdering;
