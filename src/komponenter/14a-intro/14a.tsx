import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
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
import { fjernFraLocalStorage, hentFraLocalStorage, settILocalStorage } from '../../utils/localStorage-utils';
import { visEksperiment } from '../../utils/samarbeidskontor-utils';
import Feedback from '../feedback/feedback';
import Lenkepanel14A from './lenkepanel-14a';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import Lenke from 'nav-frontend-lenker';
import PreState from '../meldekortintro/pre-state';

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
                    NAV har gjort en vurdering av svarene dine og det ser ut til at du har gode muligheter til å skaffe
                    deg jobb på egenhånd.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Vurderingen baserer seg på svarene fra registreringen og opplysningene NAV har om din situasjon.
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    De 12 første ukene fra du registrerte deg som arbeidssøker, vil NAV som hovedregel ikke ta kontakt i
                    forbindelse med hjelp rundt jobbsøking.
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
                    Merk deg at dette ikke er et svar på en eventuell søknad om dagpenger.
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
                    Da må du bruke dialogen på slutten av denne introduksjonen.
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
}

interface Intro14AProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
    harSettIntro: boolean;
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

    const handleKlikkSkrivTilOss = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til skriv til oss',
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
            <Systemtittel className={'blokk-xs'}>Trenger du hjelp eller støtte?</Systemtittel>

            <Normaltekst className={'blokk-xs'}>Om du ønsker oppfølging før 12 uker må du gi oss beskjed.</Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Du er inne i din {ordenstall[ukerRegistrert]} uke som registrert arbeidssøker.
            </Normaltekst>

            <Lenkepanel14A amplitudeData={amplitudeData} href={''}>
                Ta kontakt om du ønsker hjelp
            </Lenkepanel14A>

            <Normaltekst className={'blokk-m'}>
                Har du spørsmål om dagpenger må du bruke{' '}
                <Lenke onClick={handleKlikkSkrivTilOss} href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">
                    Skriv til oss
                </Lenke>
            </Normaltekst>
            <Normaltekst>
                <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                    Les om hva slags hjelp du kan få
                </Lenke>
            </Normaltekst>
        </div>
    );
}

function Intro14A(props: Intro14AProps) {
    const introKort = [
        <PreState
            hoppOverIntroCB={hoppOverIntro}
            startIntroCB={nesteKort}
            lesetid={'3'}
            tittel={'Introduksjon om hjelp til jobbsøking fra NAV'}
        />,
        <Kort1 />,
        <Kort2 />,
        <Kort3 />,
        <Kort4 />,
    ];

    const startkort = props.harSettIntro ? 1 : 0;
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
            const handling = `Går fra ${forrigeKortRef.current + 1} til kort ${gjeldendeKortIndex + 1}`;
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

function kanVise14AStatus({
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
    const skalSeEksperiment = visEksperiment('onboarding14a', {
        geografiskTilknytning: brukerInfoData.geografiskTilknytning,
    });
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erKss = amplitudeData.gruppe === 'kss';

    return (
        erKss &&
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

    const [harSettIntro, setHarSettIntro] = React.useState<boolean>(!!hentFraLocalStorage(INTRO_KEY_14A));
    const [tvingVisningAvIntro, setTvingVisningAvIntro] = React.useState<boolean>(false);

    const erNyregistrertKss = amplitudeData.ukerRegistrert === 0;
    const rendreIntro = tvingVisningAvIntro || (erNyregistrertKss && !harSettIntro);

    useEffect(() => {
        if (harSettIntro) {
            settILocalStorage(INTRO_KEY_14A, 'true');
        } else {
            fjernFraLocalStorage(INTRO_KEY_14A);
        }
    }, [harSettIntro]);

    const featuretoggleAktivert = featuretoggleData['veientilarbeid.14a-intro'];
    const kanViseKomponent =
        featuretoggleAktivert && kanVise14AStatus({ amplitudeData, oppfolgingData, brukerInfoData, registreringData });

    if (!kanViseKomponent) {
        fjernFraLocalStorage(INTRO_KEY_14A);
        return null;
    }

    const ferdigMedIntroCB = () => {
        setHarSettIntro(true);
        setTvingVisningAvIntro(false);
    };
    const lesIntroPaaNyttCB = () => {
        setTvingVisningAvIntro(true);
    };

    return (
        <div className={'fjorten-A-intro-omslutning'}>
            <Panel className={'fjorten-A-intro'} border>
                <div className={'overall-wrapper'}>
                    {rendreIntro ? (
                        <Intro14A
                            harSettIntro={harSettIntro}
                            ferdigMedIntroCB={ferdigMedIntroCB}
                            amplitudeData={amplitudeData}
                        />
                    ) : (
                        <Sluttkort amplitudeData={amplitudeData} lesIntroPaaNyttCB={lesIntroPaaNyttCB} />
                    )}
                </div>
            </Panel>
        </div>
    );
}

export default Intro14AWrapper;
