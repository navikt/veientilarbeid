import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Egenvurdering from '../../ducks/egenvurdering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './14a-intro.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import ErRendret from '../er-rendret/er-rendret';
import { FeaturetoggleContext, Data as FeaturetoggleData } from '../../ducks/feature-toggles';
import { UlesteDialogerContext } from '../../ducks/ulestedialoger';
import ModalWrapper from 'nav-frontend-modal';
import { kanVise12UkerEgenvurdering } from '../12uker-egenvurdering/12uker-egenvurdering';
import EgenVurdering from '../12uker-egenvurdering/12uker-egenvurdering';
import { KssStartkort, KssKortliste, KssSluttkort } from './kss';
import { StandardStartkort, StandardKortliste, StandardSluttkort } from './standardinnsats';

const INTRO_KEY_14A = '14a-intro';
const INTRO_KEY_12UKER = '12uker-egenvurdering';

interface Intro14AProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
    hoppOverPreState: boolean;
    skalViseKssKort: boolean;
}

function Intro14A(props: Intro14AProps) {
    const [Startkort, Kortliste] = props.skalViseKssKort
        ? [KssStartkort, KssKortliste]
        : [StandardStartkort, StandardKortliste];
    const introKort = [<Startkort hoppOverIntroCB={hoppOverIntro} startIntroCB={nesteKort} />, ...Kortliste];

    const startkort = props.hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);
    const forrigeKortRef = useRef(gjeldendeKortIndex);

    function nesteKort() {
        if (gjeldendeKortIndex < introKort.length - 1) {
            setGjeldendeKortIndex(gjeldendeKortIndex + 1);
        }
    }

    const forrigeKort = () => {
        if (gjeldendeKortIndex > 0) {
            setGjeldendeKortIndex(gjeldendeKortIndex - 1);
        }
    };
    const avsluttIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Fullfører introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    };

    function hoppOverIntro() {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Hopper over intro',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    }

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKortIndex) {
            const handling =
                forrigeKortRef.current === 0
                    ? `Starter 14a-introduksjonen`
                    : `Går fra ${forrigeKortRef.current} til kort ${gjeldendeKortIndex}`;
            amplitudeLogger('veientilarbeid.intro', {
                intro: '14a',
                handling,
                ...props.amplitudeData,
            });
            forrigeKortRef.current = gjeldendeKortIndex;
        }
    }, [gjeldendeKortIndex, props.amplitudeData]);

    return (
        <>
            <div className={'kortwrapper'}>
                <div className={'kortinnhold'}>{introKort[gjeldendeKortIndex]}</div>
            </div>
            {gjeldendeKortIndex !== 0 ? (
                <div className={'knapper'}>
                    <Tilbakeknapp mini disabled={gjeldendeKortIndex === 1} onClick={forrigeKort}>
                        Forrige
                    </Tilbakeknapp>
                    {gjeldendeKortIndex !== introKort.length - 1 ? (
                        <Nesteknapp mini onClick={nesteKort}>
                            {' '}
                            Neste{' '}
                        </Nesteknapp>
                    ) : (
                        <Nesteknapp mini onClick={avsluttIntro}>
                            {' '}
                            Fullfør{' '}
                        </Nesteknapp>
                    )}
                </div>
            ) : null}
        </>
    );
}

export function kanVise14AStatus({
    brukerInfoData,
    oppfolgingData,
    registreringData,
    amplitudeData,
    featuretoggleData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
    featuretoggleData: FeaturetoggleData;
}): boolean {
    const skalSeEksperiment = amplitudeData.eksperimenter.includes('onboarding14a');
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.14a-intro'];

    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    return (
        featuretoggleAktivert &&
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        skalSeEksperiment &&
        sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres
    );
}

interface IntroProps {
    visKvittering?: string;
}

function Intro14AWrapper(props: IntroProps) {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: egenvurderingData } = React.useContext(Egenvurdering.EgenvurderingContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const ulesteDialoger = React.useContext(UlesteDialogerContext).data;

    const [harSettIntro, setHarSettIntro] = React.useState<boolean>(!!hentFraBrowserStorage(INTRO_KEY_14A));
    const [tvingVisningAvIntro, setTvingVisningAvIntro] = React.useState<boolean>(false);

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });

    const sistSettEgenvurdering = Number(hentFraBrowserStorage(INTRO_KEY_12UKER)) ?? 0;
    const erNyregistrertKss = amplitudeData.ukerRegistrert === 0;
    const rendreIntro = tvingVisningAvIntro || (erNyregistrertKss && !harSettIntro);
    const hoppOverPreState = harSettIntro || tvingVisningAvIntro;

    const [visEgenvurderingsKomponent, setVisEgenvurderingsKomponent] = React.useState<boolean>(
        kanVise12UkerEgenvurdering({
            brukerInfoData,
            egenvurderingData,
            oppfolgingData,
            registreringData,
            amplitudeData,
            featuretoggleData,
            sistVistFraLocalstorage: sistSettEgenvurdering,
        })
    );

    useEffect(() => {
        if (harSettIntro) {
            settIBrowserStorage(INTRO_KEY_14A, 'true');
        } else {
            fjernFraBrowserStorage(INTRO_KEY_14A);
        }
    }, [harSettIntro]);

    const modalToggle = featuretoggleData['veientilarbeid.modal'];

    const skalViseKssKort = kanVise14AStatus({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseKomponent = erStandardInnsatsgruppe && !visEgenvurderingsKomponent;
    const Sluttkort = skalViseKssKort ? KssSluttkort : StandardSluttkort;

    if (visEgenvurderingsKomponent) {
        fjernFraBrowserStorage(INTRO_KEY_14A);
        return <EgenVurdering setVisEgenvurderingsKomponent={setVisEgenvurderingsKomponent} />;
    }

    if (!kanViseKomponent) {
        fjernFraBrowserStorage(INTRO_KEY_14A);
        return null;
    }

    const ferdigMedIntroCB = () => {
        setHarSettIntro(true);
        setTvingVisningAvIntro(false);
        const sluttkortBakModal = document.getElementById('innhold-registrering');
        if (sluttkortBakModal) {
            sluttkortBakModal.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
    };

    const lukkerModalCB = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Lukker modal',
            ...amplitudeData,
        });
        ferdigMedIntroCB();
    };

    const lesIntroPaaNyttCB = () => {
        setTvingVisningAvIntro(true);
    };

    const stylingKlasse =
        modalToggle && erNyregistrertKss && !harSettIntro
            ? 'fjorten-A-intro-omslutning-modal'
            : 'fjorten-A-intro-omslutning';

    const innhold = (
        <div className={stylingKlasse}>
            <Panel className={'fjorten-A-intro'} border>
                <div className={'overall-wrapper'}>
                    {rendreIntro ? (
                        <>
                            <Intro14A
                                skalViseKssKort={skalViseKssKort}
                                hoppOverPreState={hoppOverPreState}
                                ferdigMedIntroCB={ferdigMedIntroCB}
                                amplitudeData={amplitudeData}
                            />
                            <ErRendret loggTekst="Rendrer 14a intro" />
                        </>
                    ) : (
                        <Sluttkort
                            amplitudeData={amplitudeData}
                            registreringData={registreringData}
                            lesIntroPaaNyttCB={lesIntroPaaNyttCB}
                            antallUlesteDialoger={ulesteDialoger.antallUleste}
                        />
                    )}
                </div>
            </Panel>
        </div>
    );

    const innholdWrappetIModal = (
        <>
            <div id={'innhold-registrering'} className={'fjorten-A-intro-omslutning'}>
                <Panel className={'fjorten-A-intro'} border>
                    <div className={'overall-wrapper'}>
                        <Sluttkort
                            amplitudeData={amplitudeData}
                            registreringData={registreringData}
                            lesIntroPaaNyttCB={lesIntroPaaNyttCB}
                            antallUlesteDialoger={ulesteDialoger.antallUleste}
                        />
                    </div>
                </Panel>
            </div>

            <ModalWrapper
                shouldCloseOnOverlayClick={false}
                onRequestClose={lukkerModalCB}
                isOpen={rendreIntro}
                contentLabel={'test'}
            >
                {innhold}
            </ModalWrapper>
        </>
    );

    return modalToggle && skalViseKssKort && erNyregistrertKss && !harSettIntro ? innholdWrappetIModal : innhold;
}

export default Intro14AWrapper;
