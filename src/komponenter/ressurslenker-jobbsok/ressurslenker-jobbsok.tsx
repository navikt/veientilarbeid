import * as React from 'react';
import './ressurslenker-jobbsok.less';
import Stillingsok from './stillingsok';
import CV from './cv';
import Jobbsokertips from './jobbsokertips';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';
import {
    BrukerregistreringContext,
    FremtidigSituasjonSvar,
    selectFremtidigSituasjonSvar,
} from '../../ducks/brukerregistrering';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const RessurslenkerJobbsok = () => {
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;

    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);

    const tilbakeTilSammeArbeidsgiver =
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING;

    const visRessurslenker = underOppfolging && !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

    return visRessurslenker ? (
        <section className="ressurslenker">
            <Systemtittel tag="h2" className="ressurslenker__heading blokk-s">
                {tekster['ressurslenker-jobbsok-overskrift']}
            </Systemtittel>

            <div className="tokol">
                <Stillingsok />
                <CV />
            </div>
            <div className="tokol">
                <Jobbsokertips />
            </div>
        </section>
    ) : null;
};

export default RessurslenkerJobbsok;
