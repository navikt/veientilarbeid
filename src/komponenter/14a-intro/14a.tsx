import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Undertekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './14a-intro.less';
import { fjernFraLocalStorage, hentFraLocalStorage, settILocalStorage } from '../../utils/localStorage-utils';
import Feedback from '../feedback/feedback';
import Lenkepanel14A from './lenkepanel-14a';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';

const INTRO_KEY_14A = '14a-intro';

function Kort1() {
    return (
        <div>
            <Systemtittel>Hva slags type hjelp kan jeg få?</Systemtittel>
            <Undertekst className="blokk-xs">1 av 3</Undertekst>

            <Normaltekst className={'blokk-xs'}>
                Vi har gjort en vurdering og det ser ut til at du har gode muligheter til å skaffe deg en jobb på
                egenhånd.
            </Normaltekst>

            <Normaltekst className={'blokk-m'}>
                Vurderingen baserer seg på svarene du har gitt og opplysningene NAV har om din situasjon.
            </Normaltekst>

            <Feedback id={'Introkort14A-01'} />
        </div>
    );
}

function Kort2() {
    return (
        <div>
            <Systemtittel>Hva slags type hjelp kan jeg få?</Systemtittel>
            <Undertekst className="blokk-xs">2 av 3</Undertekst>
            <Normaltekst className={'blokk-xs'}>
                De 12 første ukene vil ikke NAV ta kontakt. I denne perioden har du selv ansvaret for å se etter og å
                søke på stillinger.
            </Normaltekst>
            <Normaltekst className={'blokk-m'}>
                Om du ønsker oppfølging før 12 uker, ber vi deg om å si i fra om at du ønsker å bli kontaktet.
            </Normaltekst>

            <Feedback id={'Introkort14A-02'} />
        </div>
    );
}

function Kort3() {
    return (
        <div>
            <Systemtittel>Hva slags type hjelp kan jeg få?</Systemtittel>
            <Undertekst className="blokk-xs">3 av 3</Undertekst>
            <Normaltekst className={'blokk-xs'}>De første 12 ukene har du selv ansvaret for</Normaltekst>
            <ul>
                <li>
                    <Normaltekst>Å skaffe deg oversikt over jobbmarkedet </Normaltekst>
                </li>
                <li>
                    <Normaltekst>Å søke på stillinger</Normaltekst>
                </li>
            </ul>

            <Normaltekst className={'blokk-m'}>
                Du kan finne stillinger på
                <a href={'https://arbeidsplassen.nav.no/'}>{' arbeidsplassen.no'}</a>
                <a href={'https://www.finn.no/job/browse.html'}>{', finn.no '}</a> eller andre jobbportaler.
            </Normaltekst>

            <Feedback id={'Introkort14A-03'} />
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
}

function Sluttkort(props: EndStateProps) {
    const { amplitudeData } = props;

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Leser introduksjonen på nytt',
            ...amplitudeData,
        });
    };

    const handleLesIntroPaaNytt = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        handleKlikkLesIntro();
        props.lesIntroPaaNyttCB();
    };

    return (
        <div className={'sluttkort'}>
            <Systemtittel className={'blokk-xs'}>Trenger du hjelp eller støtte?</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Bruk dialogen dersom du har spørsmål rundt det å søke stillinger, å komme i jobb eller ønsker
                arbeidsrettet hjelp.
            </Normaltekst>

            <Lenkepanel14A amplitudeData={amplitudeData} href={''}>
                ta kontakt om du lurer på noe
            </Lenkepanel14A>
            <Tilbakeknapp mini onClick={handleLesIntroPaaNytt}>
                Les om hva slags hjelp du kan få
            </Tilbakeknapp>
        </div>
    );
}

function Intro14A(props: Intro14AProps) {
    const introKort = [<Kort1 />, <Kort2 />, <Kort3 />];

    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(0);
    const forrigeKortRef = useRef(gjeldendeKortIndex);
    const nesteKort = () => {
        if (gjeldendeKortIndex < introKort.length - 1) {
            setGjeldendeKortIndex(gjeldendeKortIndex + 1);
        }
    };
    const forrigeKort = () => {
        if (gjeldendeKortIndex > 0) {
            setGjeldendeKortIndex(gjeldendeKortIndex - 1);
        }
    };
    const avsluttIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Avslutter introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    };

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
                <br />
            </div>
            <div className={'knapper'}>
                <Tilbakeknapp mini disabled={gjeldendeKortIndex === 0} onClick={forrigeKort}>
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
                        Avslutt introduksjonen{' '}
                    </Nesteknapp>
                )}
            </div>
        </>
    );
}

function kanVise14AStatus({
    brukerInfoData,
    oppfolgingData,
    registreringData,
}: {
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
}): boolean {
    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const brukerregistreringData = registreringData?.registrering ?? null;

    return (
        !erAAP && erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) && !oppfolgingData.kanReaktiveres
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

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const skalViseIntro = tvingVisningAvIntro || (erNyregistrert && !harSettIntro);

    useEffect(() => {
        if (harSettIntro) {
            settILocalStorage(INTRO_KEY_14A, 'true');
        } else {
            fjernFraLocalStorage(INTRO_KEY_14A);
        }
    }, [harSettIntro]);

    const featuretoggleAktivert = featuretoggleData['veientilarbeid.14a-intro'];
    const kanViseKomponent =
        featuretoggleAktivert && kanVise14AStatus({ oppfolgingData, brukerInfoData, registreringData });

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
                    {skalViseIntro ? (
                        <Intro14A ferdigMedIntroCB={ferdigMedIntroCB} amplitudeData={amplitudeData} />
                    ) : (
                        <Sluttkort amplitudeData={amplitudeData} lesIntroPaaNyttCB={lesIntroPaaNyttCB} />
                    )}
                </div>
            </Panel>
        </div>
    );
}

export default Intro14AWrapper;
