import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import Rad from '../../innhold/rad';
import Dagpenger from '../dagpenger/dagpenger';
import AlleSkjema from '../alleskjema/alleskjema';
import SjekkKontonummer from '../paminnelser/sjekk-kontonummer';
import TrekkDagpengeSoknad from '../meldinger/trekk-dp-soknad';
import tekster from '../../tekster/tekster';

const OkonomiRadDagpenger = () => {
    const { erBrukerUnderOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = erBrukerUnderOppfolging;

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
