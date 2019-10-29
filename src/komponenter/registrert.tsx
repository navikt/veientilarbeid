import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import tekster from '../tekster/tekster';

const Registrert = () => {
    return (
        <AlertStripeInfo className="blokk-s">
            <Element>{tekster.registrert}</Element>
        </AlertStripeInfo>
    );
};

export default Registrert;
