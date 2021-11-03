import { useContext } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { BrukerInfoContext } from '../../contexts/bruker-info';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import Rad from '../../innhold/rad';
import Dagpenger from '../dagpenger/dagpenger';
import AlleSkjema from '../alleskjema/alleskjema';
import SjekkKontonummer from '../paminnelser/sjekk-kontonummer';
import TrekkDagpengeSoknad from '../meldinger/trekk-dp-soknad';
import tekster from '../../tekster/tekster';

const OkonomiRadDagpenger = () => {
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = useContext(BrukerInfoContext).data;
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);

    const skjulBoksFeaturetoggleAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulOkonomiBoks'];

    const kanViseKomponent = underOppfolging && !erSykmeldtMedArbeidsgiver && !skjulBoksFeaturetoggleAktivert;

    return !kanViseKomponent ? null : (
        <Rad>
            <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
                {tekster['dagpenger-heading-tekst']}
            </Systemtittel>
            <div className="tokol">
                <Dagpenger />
                <AlleSkjema />
            </div>
            <div className="tokol">
                <SjekkKontonummer />
                <TrekkDagpengeSoknad />
            </div>
        </Rad>
    );
};

export default OkonomiRadDagpenger;
