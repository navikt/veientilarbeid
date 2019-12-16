import * as React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import './krr-melding.less';
import { difiLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { klikkPaDifiLenke } from '../../metrics/metrics';
import { useContext } from 'react';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { OppfolgingContext } from '../../ducks/oppfolging';

class KrrMelding extends React.Component<{}> {
    render() {
        const brukerregistreringData = useContext(BrukerregistreringContext).data;
        const brukerinfoData = React.useContext(BrukerInfoContext).data;
        const oppfolgingData = React.useContext(OppfolgingContext).data;
        const { registrering } = brukerregistreringData;
        const { besvarelse } = registrering;
        const { dinSituasjon } = besvarelse;
        const dinSituasjonOrIngenVerdi = dinSituasjon ? dinSituasjon : 'INGEN_VERDI';
        const { registreringType, rettighetsgruppe } = brukerinfoData;
        const { formidlingsgruppe, servicegruppe, underOppfolging, reservasjonKRR } = oppfolgingData;
        const underOppfolgingJaNei = underOppfolging ? 'ja' : 'nei';
        const registreringTypeOrIngenVerdi = registreringType ? registreringType : 'INGEN_VERDI';

        const metrikkData = {
            servicegruppe,
            formidlingsgruppe,
            rettighetsgruppe,
            dinSituasjon: dinSituasjonOrIngenVerdi,
            underOppfolging: underOppfolgingJaNei,
            registreringType: registreringTypeOrIngenVerdi,
            reservasjonKRR,
        };

        const klikkLenkeMetrikk = () => klikkPaDifiLenke(metrikkData);

        return (
            <AlertStripeAdvarsel className="krr-melding blokk-xs">
                <Normaltekst className="blokk-xs">
                    {tekster['krr-melding-ingress']}
                </Normaltekst>
                <Normaltekst>
                    {tekster['krr-melding-kulepunkt-ingress']}
                </Normaltekst>
                <ul>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt1']}</Normaltekst></li>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt2']}</Normaltekst></li>
                    <li><Normaltekst>{tekster['krr-melding-kulepunkt3']}</Normaltekst></li>
                </ul>
                <Lenke href={difiLenke} onClick={klikkLenkeMetrikk}>
                    <Normaltekst>
                        {tekster['krr-melding-lenketekst']}
                    </Normaltekst>
                </Lenke>
            </AlertStripeAdvarsel>
        );
    }
}

export default KrrMelding;


