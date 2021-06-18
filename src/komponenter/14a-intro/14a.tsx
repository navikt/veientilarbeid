import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import { OppfolgingContext, Servicegruppe } from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './14a-intro.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import ErRendret from '../er-rendret/er-rendret';
import Feedback from '../feedback/feedback';
import Lenkepanel14A from './lenkepanel-14a';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import Lenke from 'nav-frontend-lenker';
import PreState from '../meldekortintro/pre-state';
import { UlesteDialogerContext } from '../../ducks/ulestedialoger';
import ModalWrapper from 'nav-frontend-modal';

const INTRO_KEY_14A = '14a-intro';

const ordenstall = {
    0: 'første',
    1: 'andre',
    2: 'tredje',
    3: 'fjerde',
    4: 'femte',
    5: 'sjette',
    6: 'sjuende',
    7: 'åttende',
    8: 'niende',
    9: 'tiende',
    10: 'ellevte',
    11: 'tolvte',
    12: 'trettende',
};

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">1 av 4</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    NAV har gjort en vurdering av svarene dine, og det ser ut til at du har gode muligheter til å skaffe
                    deg jobb på egenhånd.
                </Normaltekst>

                <Normaltekst>Vurderingen baserer seg på:</Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>svarene fra registreringen</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>opplysningene NAV har om din situasjon</Normaltekst>
                    </li>
                </ul>
                <Normaltekst className={'blokk-m'}>
                    NAV tar som hovedregel ikke kontakt i forbindelse med hjelp til jobbsøking de første 12 ukene etter
                    at du registrerte deg som arbeidssøker.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-01'} />
        </div>
    );
}

function Kort2() {
    const { servicegruppe } = React.useContext(OppfolgingContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">2 av 4</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            Du har mottatt brevet{' '}
                            <Lenke onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                «NAV har vurdert dine muligheter»
                            </Lenke>
                            .
                        </>
                    ) : (
                        'Du vil i løpet av den første uken motta brevet «NAV har vurdert dine muligheter».'
                    )}
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">3 av 4</Undertekst>
                <Normaltekst className={'blokk-xs'}>Du kan få hjelp fra en veileder før 12 uker har gått.</Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Da må du selv kontakte veileder ved å bruke dialogen som vises på slutten av denne introduksjonen.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Du kan gi oss beskjed om at du ønsker hjelp nå med en gang, eller se litt an hvordan du syns
                    jobbsøkingen din går før du tar kontakt.
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-03'} />
        </div>
    );
}
function Kort4() {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Hva slags hjelp kan jeg få?</Systemtittel>
                <Undertekst className="blokk-xs">4 av 4</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    En veileder sin oppgave er å besvare spørsmål, bistå rundt det å søke stillinger og tilby hjelp på
                    veien til arbeid.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Veiledere kan <strong>ikke</strong> svare på spørsmål om søknader, behandling av søknader eller
                    utbetalinger av dagpenger.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Dersom du lurer på noe om dagpenger ber vi deg bruke «Skriv til oss».
                </Normaltekst>
            </div>
            <Feedback id={'Introkort14A-04'} />
        </div>
    );
}

interface EndStateProps {
    amplitudeData: AmplitudeData;
    lesIntroPaaNyttCB: () => void;
    antallUlesteDialoger: number;
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;
    const { ukerRegistrert } = amplitudeData;

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Leser introduksjonen på nytt',
            ...amplitudeData,
        });
    };

    function handleLesIntroPaaNytt(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        handleKlikkLesIntro();
        props.lesIntroPaaNyttCB();
    }

    return (
        <div className={'sluttkort'}>
            <Element tag={'h1'}>OPPFØLGING</Element>
            <Systemtittel className={'blokk-xs'}>Om du ønsker oppfølging før 12 uker må du gi oss beskjed</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Du er inne i din {ordenstall[ukerRegistrert]} uke som registrert arbeidssøker.
            </Normaltekst>

            <Lenkepanel14A amplitudeData={amplitudeData} href={''} antallUlesteDialoger={props.antallUlesteDialoger} />

            <Normaltekst>
                <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                    Les om hva slags hjelp du kan få
                </Lenke>
            </Normaltekst>
        </div>
    );
}

interface Intro14AProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
    hoppOverPreState: boolean;
}

function Intro14A(props: Intro14AProps) {
    const introKort = [
        <PreState
            hoppOverIntroCB={hoppOverIntro}
            startIntroCB={nesteKort}
            lesetid={'3'}
            viewportTekst="Viser 14a pre-state i viewport"
            tittel={'Introduksjon til veiledning og hjelp til jobbsøking'}
        />,
        <Kort1 />,
        <Kort2 />,
        <Kort3 />,
        <Kort4 />,
    ];

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
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    amplitudeData: AmplitudeData;
}): boolean {
    const skalSeEksperiment = amplitudeData.eksperimenter.includes('onboarding14a');
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;

    const registrertUnder12Uker = amplitudeData.ukerRegistrert < 12;
    const aldersgruppeUtenForsterketInnsats = brukerInfoData.alder >= 30 && brukerInfoData.alder <= 55;

    return (
        registrertUnder12Uker &&
        aldersgruppeUtenForsterketInnsats &&
        !erAAP &&
        skalSeEksperiment &&
        erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres
    );
}

function Intro14AWrapper() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const ulesteDialoger = React.useContext(UlesteDialogerContext).data;

    const [harSettIntro, setHarSettIntro] = React.useState<boolean>(!!hentFraBrowserStorage(INTRO_KEY_14A));
    const [tvingVisningAvIntro, setTvingVisningAvIntro] = React.useState<boolean>(false);

    const erNyregistrertKss = amplitudeData.ukerRegistrert === 0;
    const rendreIntro = tvingVisningAvIntro || (erNyregistrertKss && !harSettIntro);
    const hoppOverPreState = harSettIntro || tvingVisningAvIntro;

    useEffect(() => {
        if (harSettIntro) {
            settIBrowserStorage(INTRO_KEY_14A, 'true');
        } else {
            fjernFraBrowserStorage(INTRO_KEY_14A);
        }
    }, [harSettIntro]);

    const featuretoggleAktivert = featuretoggleData['veientilarbeid.14a-intro'];
    const modalToggle = featuretoggleData['veientilarbeid.modal'];
    const kanViseKomponent =
        featuretoggleAktivert && kanVise14AStatus({ amplitudeData, oppfolgingData, brukerInfoData, registreringData });

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
                                hoppOverPreState={hoppOverPreState}
                                ferdigMedIntroCB={ferdigMedIntroCB}
                                amplitudeData={amplitudeData}
                            />
                            <ErRendret loggTekst="Rendrer 14a intro" />
                        </>
                    ) : (
                        <Sluttkort
                            amplitudeData={amplitudeData}
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

    return modalToggle && erNyregistrertKss && !harSettIntro ? innholdWrappetIModal : innhold;
}

export default Intro14AWrapper;
