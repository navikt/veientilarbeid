import * as React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Egenvurdering from '../../ducks/egenvurdering';
import * as Brukerregistrering from '../../context/brukerregistrering';
import * as Oppfolging from '../../context/oppfolging';
import * as BrukerInfo from '../../context/bruker-info';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { behovsvurderingLenke } from '../../innhold/lenker';
import { plussDager } from '../../utils/date-utils';
import './12uker-egenvurdering.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { FeaturetoggleContext, Data as FeaturetoggleData } from '../../context/feature-toggles';

const INTRO_KEY_12UKER = '12uker-egenvurdering';
const ANTALL_DAGER_COOL_DOWN = 7;

interface EndStateProps {
    amplitudeData: AmplitudeData;
    registreringData: Brukerregistrering.Data | null;
    avslaarEgenvurdering: (loggTekst: string) => void;
    sendTilEgenvurdering: () => void;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;
    const { ukerRegistrert } = amplitudeData;

    function handleAvslaaOppfolgingKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.avslaarEgenvurdering('Avslår 12 ukers egenvurdering fra x-knapp');
    }

    function handleAvslaaOppfolgingLenke(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.avslaarEgenvurdering('Avslår 12 ukers egenvurdering fra lenke');
    }

    function handleOnskerOppfolging(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.sendTilEgenvurdering();
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
                        for hjelp og støtte fra en veileder ved NAV-kontoret ditt?
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
    egenvurderingData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    featuretoggleData,
    sistVistFraLocalstorage,
}: {
    brukerInfoData: BrukerInfo.Data;
    egenvurderingData: Egenvurdering.Data | null;
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

    const egenvurderingbesvarelseDato = egenvurderingData ? new Date(egenvurderingData.sistOppdatert) : null;
    const opprettetRegistreringDatoString = registreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const harEgenvurderingEtter11Uker = (): boolean => {
        let isValid = false;
        if (opprettetRegistreringDato && egenvurderingbesvarelseDato) {
            const dato77dagerEtterRegistrering = plussDager(opprettetRegistreringDato, 77);
            isValid = dato77dagerEtterRegistrering.getTime() < egenvurderingbesvarelseDato.getTime();
        }
        return isValid;
    };

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
        !harEgenvurderingEtter11Uker() &&
        viseEgenvurderingIgjen
    );
}

interface EgenVurderingsProps {
    setVisEgenvurderingsKomponent: (boolean: boolean) => void;
}

function Intro12UkerWrapper(props: EgenVurderingsProps) {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: egenvurderingData } = React.useContext(Egenvurdering.EgenvurderingContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;

    function avslaarEgenvurdering(loggTekst: string) {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        props.setVisEgenvurderingsKomponent(false);
    }

    function sendTilEgenvurdering() {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        loggAktivitet({ aktivitet: 'Går til 12 ukers egenvurdering', ...amplitudeData });
        window.location.assign(`${behovsvurderingLenke}/hvilken-veiledning-trengs`);
    }

    const kanViseKomponent = kanVise12UkerEgenvurdering({
        amplitudeData,
        egenvurderingData,
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
                        avslaarEgenvurdering={avslaarEgenvurdering}
                        sendTilEgenvurdering={sendTilEgenvurdering}
                    />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer 12 ukers egenvurdering" />
            <InViewport loggTekst="Viser 12 ukers egenvurdering i viewport" />
        </div>
    );

    return innhold;
}

export default Intro12UkerWrapper;
