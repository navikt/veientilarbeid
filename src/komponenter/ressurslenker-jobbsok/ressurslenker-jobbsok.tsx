import * as React from 'react';
import './ressurslenker-jobbsok.less';
import Stillingsok from './stillingsok';
import CV from './cv';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';
import {
    BrukerregistreringContext,
    FremtidigSituasjonSvar,
    selectFremtidigSituasjonSvar,
} from '../../ducks/brukerregistrering';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';

const RessurslenkerJobbsok = () => {
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const fremtidigSvar = selectFremtidigSituasjonSvar(brukerregistreringData);
    const skjulBoksFeaturetoggleAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulJobbBoks'];

    const tilbakeTilSammeArbeidsgiver =
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING;

    const visRessurslenker = underOppfolging && !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

    if (skjulBoksFeaturetoggleAktivert) return null;

    return visRessurslenker ? (
        <section className="ressurslenker">
            <Systemtittel tag="h2" className="ressurslenker__heading blokk-s">
                {tekster['ressurslenker-jobbsok-overskrift']}
            </Systemtittel>

            <div className="tokol">
                <Stillingsok />
                <CV />
            </div>
        </section>
    ) : null;
};

export default RessurslenkerJobbsok;
