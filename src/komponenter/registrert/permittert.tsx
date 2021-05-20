import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import './registrert.less';

interface Props {
    visRegistrertSomPermittert: boolean;
}

function Permittert(props: Props) {
    const { visRegistrertSomPermittert } = props;
    if (!visRegistrertSomPermittert) return null;
    return (
        <div className="permittert-blokk">
            <Normaltekst>
                Ha tett kontakt med arbeidsgiveren din om situasjonen fremover, nå når du er permittert.
            </Normaltekst>
            <Normaltekst>
                Når du har begynt i jobben din igjen, eller mister jobben, så gir du beskjed til NAV slik.
            </Normaltekst>
            <Normaltekst>Du finner informasjon om dagpenger og permittering her.</Normaltekst>
        </div>
    );
}

export default Permittert;
