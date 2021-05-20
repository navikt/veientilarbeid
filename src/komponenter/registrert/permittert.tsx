import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
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
                Når du har begynt i jobben din igjen, eller mister jobben, så{' '}
                <Lenke href="https://www.nav.no/arbeid/no/dagpenger#gi-beskjed-hvis-situasjonen-din-endrer-seg">
                    gir du beskjed til NAV slik
                </Lenke>
                .
            </Normaltekst>
            <Normaltekst>
                Du finner{' '}
                <Lenke href="https://www.nav.no/arbeid/no/permittert">
                    informasjon om dagpenger og permittering her
                </Lenke>
                .
            </Normaltekst>
        </div>
    );
}

export default Permittert;
