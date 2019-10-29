import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

const Registrert = () => {
    /* seEffect(() => {
        seRegistrert();
    }, []);

    const handleClick = () => {
        gaTilRegistrert();
    };*/

    return (
        <AlertStripeInfo className="blokk-s">
            <Element>Du er registrert som arbeidssøker</Element>
        </AlertStripeInfo>
    );
};

export default Registrert;
