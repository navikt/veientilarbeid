import React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { behovsvurderingLenke } from '../../innhold/lenker';
import './12uker-egenvurdering.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { FeaturetoggleContext, Data as FeaturetoggleData } from '../../ducks/feature-toggles';

const INTRO_KEY_12UKER = '12uker-egenvurdering';
const ANTALL_DAGER_COOL_DOWN = 7;

interface EndStateProps {
    amplitudeData: AmplitudeData;
    registreringData: Brukerregistrering.Data | null;
    skjulKort: (loggTekst: string) => void;
    sendTilOppfolging: () => void;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;
    const { ukerRegistrert } = amplitudeData;

    function handleAvslaaOppfolgingKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.skjulKort('Avslår egenvurdering 12 uker fra knapp');
    }

    function handleAvslaaOppfolgingLenke(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.skjulKort('Avslår egenvurdering 12 uker fra lenke');
    }

    function handleOnskerOppfolging(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.sendTilOppfolging();
    }

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'}>BEHOV FOR OPPFØLGING?</Element>
                    <Systemtittel className={'blokk-xs'}>Du har vært registrert i {ukerRegistrert} uker</Systemtittel>
                </div>
                <button className="egenvurdering-avslaa-knapp" onClick={handleAvslaaOppfolgingKnapp}>
                    X
                </button>
            </div>
            <div className="egenvurdering-wrapper p-1 blokk-xs">
                <div className="egenvurdering-innhold">
                    <Normaltekst>
                        Har du fortsatt tro på at du greier å skaffe deg jobb på egenhånd, eller tenker du det er behov
                        for bistand/hjelp fra en veileder ved NAV-kontoret ditt?
                    </Normaltekst>
                </div>
            </div>
            <div className="flex flex-column space-between p-1">
                <Knapp onClick={handleOnskerOppfolging} className="blokk-s">
                    Jeg ønsker hjelp
                </Knapp>
                <Normaltekst>
                    <Lenke className="tracking-wide" href={''} onClick={handleAvslaaOppfolgingLenke}>
                        Jeg klarer meg fint selv
                    </Lenke>
                </Normaltekst>
            </div>
        </div>
    );
}

export function kanVise12UkerEgenvurdering({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    featuretoggleData,
    sistVistFraLocalstorage,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
    featuretoggleData: FeaturetoggleData;
    sistVistFraLocalstorage: number;
}): boolean {
    const { ukerRegistrert, eksperimenter } = amplitudeData;
    const skalSeEksperiment = eksperimenter.includes('onboarding14a');
    const erRegistrertUke11 = ukerRegistrert === 11;
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.egenvurderinguke12'];

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    const viseEgenvurderingIgjen =
        sistVistFraLocalstorage === 0
            ? true
            : Date.now() < sistVistFraLocalstorage + ANTALL_DAGER_COOL_DOWN * 24 * 60 * 60;

    return (
        featuretoggleAktivert &&
        erRegistrertUke11 &&
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        skalSeEksperiment &&
        erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres &&
        viseEgenvurderingIgjen
    );
}

function Intro12UkerWrapper() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;

    function skjulKort(loggTekst: string) {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        amplitudeLogger('veientilarbeid.aktivitet', { aktivitet: loggTekst, ...amplitudeData });
        window.location.reload();
    }

    function sendTilOppfolging() {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        amplitudeLogger('veientilarbeid.aktivitet', { aktivitet: 'Går til 12 ukers egenvurdering', ...amplitudeData });
        window.location.assign(`${behovsvurderingLenke}/hvilken-veiledning-trengs`);
    }

    const kanViseKomponent = kanVise12UkerEgenvurdering({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
        sistVistFraLocalstorage: sistSettEgenvurdering,
    });

    if (!kanViseKomponent) {
        fjernFraBrowserStorage(INTRO_KEY_12UKER);
        return null;
    }

    const innhold = (
        <div className="tolv-uker-intro-omslutning">
            <Panel className={'tolv-uker-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort
                        amplitudeData={amplitudeData}
                        registreringData={registreringData}
                        skjulKort={skjulKort}
                        sendTilOppfolging={sendTilOppfolging}
                    />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer 12uker egenvurdering" />
            <InViewport loggTekst="Viser 12uker egenvurdering i viewport" />
        </div>
    );

    return innhold;
}

export default Intro12UkerWrapper;
