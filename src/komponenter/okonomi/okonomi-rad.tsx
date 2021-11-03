import * as React from 'react';
import OkonomiPanel from './okonomi-panel';
import './okonomi-rad.less';

import DagpengerBilde from './dagpenger';
import NyRettTilSykepengerBilde from './ny-rett-til-sykepenger';
import OkonomiskSosialhjelpBilde from './okonomisk-sosialhjelp';
import { dagpengerLesmerLenke, sosialhjelpLenke, sykepengerLenke } from '../../innhold/lenker';
import { AutentiseringContext, InnloggingsNiva } from '../../contexts/autentisering';
import { BrukerInfoContext } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import OkonomiRadDagpenger from './okonomi-rad-dagpenger';

const OkonomiRad = () => {
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const skjulBoksFeaturetoggleAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulOkonomiBoks'];
    const kanViseKomponent =
        isLevel4 && underOppfolging && erSykmeldtMedArbeidsgiver && !skjulBoksFeaturetoggleAktivert;
    return !kanViseKomponent ? null : (
        <div className="okonomi-rad blokk-l">
            <OkonomiPanel
                tittelId="okonomi-rad-stotte-arbeidsledig-tittel"
                lenkeTekstId="okonomi-rad-stotte-arbeidsledig-lenke-tekst"
                lenkeUrl={dagpengerLesmerLenke}
            >
                <DagpengerBilde className="okonomi-panel--bilde blokk-s" />
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-nodsituasjon-tittel"
                lenkeTekstId="okonomi-rad-nodsituasjon-lenke-tekst"
                lenkeUrl={sosialhjelpLenke}
            >
                <OkonomiskSosialhjelpBilde className="okonomi-panel--bilde blokk-s" />
            </OkonomiPanel>
            <OkonomiPanel
                tittelId="okonomi-rad-sykepenger-tittel"
                lenkeTekstId="okonomi-rad-sykepenger-lenke-tekst"
                lenkeUrl={sykepengerLenke}
            >
                <NyRettTilSykepengerBilde className="okonomi-panel--bilde blokk-s" />
            </OkonomiPanel>
        </div>
    );
};

const OkonomiRadVarianter = () => {
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    return erSykmeldtMedArbeidsgiver ? <OkonomiRad /> : <OkonomiRadDagpenger />;
};

export default OkonomiRadVarianter;
