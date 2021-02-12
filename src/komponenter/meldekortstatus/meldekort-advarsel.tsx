import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { meldekortLenke } from '../../innhold/lenker';
import { BrukerInfoContext } from '../../ducks/bruker-info';

function MeldekortAdvarsel({
    dagerEtterFastsattMeldedag,
    amplitudeData,
}: {
    dagerEtterFastsattMeldedag: number;
    amplitudeData: AmplitudeData;
}) {
    const { rettighetsgruppe } = React.useContext(BrukerInfoContext).data;
    if (dagerEtterFastsattMeldedag === null) return null;

    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);
    // Viser strenger melding fra dag 3 (torsdag)
    const tillegg = dagerEtterFastsattMeldedag > 2 ? <LittStrengereVarsel rettighetsgruppe={rettighetsgruppe} /> : null;

    const meldekortknappKlikk = () => {
        loggAktivitet({ aktivitet: 'Går til meldekort fra advarsel', ...amplitudeData });
        window.location.assign(meldekortLenke);
    };

    return (
        <>
            {dagerTilInaktivering === 0 ? (
                <Normaltekst>Siste frist for innsending av meldekortet er i kveld klokken 23:00</Normaltekst>
            ) : (
                <Normaltekst>
                    Du har{' '}
                    <b>
                        {dagerTilInaktivering}{' '}
                        {dagerTilInaktivering === 0 || dagerTilInaktivering > 1 ? 'dager' : 'dag'}{' '}
                    </b>
                    på å sende inn meldekort. Fristen er mandag klokken 23:00.
                </Normaltekst>
            )}
            {tillegg}
            <br />
            <Normaltekst>
                Det er innsending av meldekortet som opprettholder din status som arbeidssøker hos NAV.
            </Normaltekst>
            {['DAGP', 'IYT'].includes(rettighetsgruppe) ? (
                <Normaltekst>
                    Opplysningene du oppgir i meldekortet brukes også til å beregne utbetalingen av dagpenger.
                </Normaltekst>
            ) : null}
            <Knapp onClick={meldekortknappKlikk}>Gå til meldekortet</Knapp>
        </>
    );
}

const LittStrengereVarsel = ({ rettighetsgruppe }: { rettighetsgruppe: string }) => {
    const dagpengerKonsekvensMelding = {
        DAGP: 'dagpengeutbetalingene dine stoppes',
        IYT: 'en eventuell søknad om dagpenger kunne bli avslått',
    };

    return (
        <div className={'strenger-varsel'}>
            <Element>Dersom du ikke sender inn meldekort vil</Element>

            <ul className={'konsekvenser'}>
                <li>
                    <Normaltekst>du ikke lenger være registrert som arbeidssøker</Normaltekst>
                </li>
                {['DAGP', 'IYT'].includes(rettighetsgruppe) ? (
                    <li>
                        <Normaltekst>{dagpengerKonsekvensMelding[rettighetsgruppe]}</Normaltekst>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

function beregnDagerTilInaktivering(dagerEtterFastsattMeldedag: number) {
    // Inaktivering skjer natt til tirsdag (dag 8)
    return 7 - dagerEtterFastsattMeldedag;
}

export default MeldekortAdvarsel;
