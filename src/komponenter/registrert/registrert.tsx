import React, { useContext } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import Opplysninger from '../innsyn/registreringsopplysninger'

const Registrert = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const { registrering } = brukerregistreringData;
    const { opprettetDato, manueltRegistrertAv, besvarelse } = registrering;

    return (
        <div className="blokk-s">
            <AlertStripeInfo>
                <Element>Du er registrert som arbeidssøker.</Element>
            </AlertStripeInfo>
            <Ekspanderbartpanel tittel="Se svarene fra registreringen" border>
                <Opplysninger
                    opprettetDato={ opprettetDato }
                    manueltRegistrertAv={ manueltRegistrertAv }
                    besvarelse={ besvarelse }
                />
            </Ekspanderbartpanel>
        </div>
    );
};

export default Registrert;
