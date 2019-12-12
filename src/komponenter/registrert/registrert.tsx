import React, { useContext } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { klikkPaDineOpplysninger } from '../../metrics/metrics'
import Opplysninger from '../innsyn/registreringsopplysninger'
import './registrert.less'

const Registrert = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const brukerinfoData = React.useContext(BrukerInfoContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const { registrering } = brukerregistreringData;
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse } = registrering;
    const { dinSituasjon } = besvarelse;
    const dinSituasjonOrIngenVerdi = dinSituasjon ? dinSituasjon : 'INGEN_VERDI';
    const { registreringType, rettighetsgruppe } = brukerinfoData;
    const { formidlingsgruppe, servicegruppe, underOppfolging } = oppfolgingData;
    const underOppfolgingJaNei = underOppfolging ? 'ja' : 'nei';
    const registreringTypeOrIngenVerdi = registreringType ? registreringType : 'INGEN_VERDI';
    const showOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse
    const metrikkData = {
        servicegruppe,
        formidlingsgruppe,
        rettighetsgruppe,
        dinSituasjon: dinSituasjonOrIngenVerdi,
        underOppfolging: underOppfolgingJaNei,
        registreringType: registreringTypeOrIngenVerdi
    }

    const handleClickOpen = () => {
        klikkPaDineOpplysninger(metrikkData)
    }

    return (
        <div className="blokk-s">
            <AlertStripeInfo className={showOpplysninger ? 'registrering-info' : ''}>
                <Element>Du er registrert som arbeidssøker</Element>
            </AlertStripeInfo>
            { showOpplysninger ?
                <Ekspanderbartpanel tittel="Se svarene fra registreringen" border tittelProps="normaltekst" className="registrering-svar" onClick={ handleClickOpen }>
                    <Opplysninger
                        opprettetDato={ opprettetDato }
                        manueltRegistrertAv={ manueltRegistrertAv }
                        besvarelse={ besvarelse }
                        teksterForBesvarelse={ teksterForBesvarelse }
                        metrikkData={ metrikkData }
                    />
                </Ekspanderbartpanel>
                : null
            }
        </div>
    );
};

export default Registrert;
