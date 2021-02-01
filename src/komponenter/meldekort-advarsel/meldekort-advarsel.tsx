import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';

function MeldekortAdvarsel({ frister: dagerEtterFastsattMeldedag }: { frister: number }) {
    if (dagerEtterFastsattMeldedag === null) return null;
    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);

    // Viser strenger melding fra dag 3 (torsdag)
    const tillegg = dagerEtterFastsattMeldedag > 2 ? <LittStrengereVarsel /> : null;

    return (
        <>
            <Normaltekst>
                Du har{' '}
                <b>
                    {' '}
                    {dagerTilInaktivering} {dagerTilInaktivering === 0 || dagerTilInaktivering > 1 ? 'dager' : 'dag'}{' '}
                </b>
                på deg før fristen for meldekortet går ut.
            </Normaltekst>
            {tillegg}
            <Knapp>Gå til meldekortet</Knapp>
        </>
    );
}

const LittStrengereVarsel = () => {
    return (
        <div className={'strenger-varsel'}>
            <Element>Dersom du ikke sender inn meldekort vil</Element>

            <ul className={'konsekvenser'}>
                <li>
                    <Normaltekst>du ikke lenger være registrert som arbeidssøker</Normaltekst>
                </li>
                <li>
                    <Normaltekst>dagpengeutbetalingene dine stoppes</Normaltekst>
                </li>
            </ul>
        </div>
    );
};

function beregnDagerTilInaktivering(dagerEtterFastsattMeldedag: number) {
    // Inaktivering skjer natt til tirsdag (dag 8)
    return 7 - dagerEtterFastsattMeldedag;
}

export default MeldekortAdvarsel;
