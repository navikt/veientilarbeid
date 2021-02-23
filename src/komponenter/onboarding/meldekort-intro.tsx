import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { Data as MeldekortData, MeldekortContext } from '../../ducks/meldekort';
import { OppfolgingContext } from '../../ducks/oppfolging';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './meldekort-intro.less';
import { datoUtenTid, hentISOUke } from '../../utils/date-utils';
import { hentMeldekortForLevering } from '../../utils/meldekort-utils';
import Meldekortstatus from './meldekortstatus';
import { erDemo } from '../../utils/app-state-utils';
import { hentDagRelativTilFastsattMeldedag, hentFraLocalStorage, settILocalStorage } from '../../demo/demo-state';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { EtikettInfo } from 'nav-frontend-etiketter';
import LenkepanelMeldekort from './lenkepanel-Meldekort';

const MELDEKORT_INTRO_KEY = 'meldekortintro';

function Kort1() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Som registrert arbeidssøker hos NAV, må du sende inn et meldekort hver 14 dag.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Selv om du venter på svar på søknaden om dagpenger, må du sende inn meldekortene innen fristen.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Det er også viktig at du sender inn meldekort til riktig tid.
            </Normaltekst>
        </div>
    );
}

function Kort2() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Utbetalinger av dagpenger regnes ut basert på opplysningene fra meldekortene du sender inn.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Om du sender meldekortet for sent du vil få mindre utbetalt.
            </Normaltekst>
        </div>
    );
}

function Kort3() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Hvordan fungerer meldekort i NAV?</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Om du ikke sender meldekort, vil vi tolke det som at du ikke ønsker å være registrert som arbeidssøker
                og at du ikke har behov for dagpenger eller annen hjelp.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Om du ikke har sendt inn et meldekort tidligere, kan du se et eksempel på hvordan det fylles ut her.
            </Normaltekst>
        </div>
    );
}

interface EndStateProps {
    meldekortData: MeldekortData | null;
    amplitudeData: AmplitudeData;
    lesIntroPaaNyttCB: () => void;
}

interface MeldekortIntroProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
}

function Sluttkort(props: EndStateProps) {
    const { meldekortData, amplitudeData } = props;
    const dato = erDemo() ? hentDagRelativTilFastsattMeldedag() : datoUtenTid(new Date().toISOString());
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Leser introduksjonen på nytt',
            ...amplitudeData,
        });
    };
    if (meldekortForLevering.length === 0) {
        return null;
    }
    if (meldekortForLevering.length > 1) {
        return <div>Vent litt, så får du en lenke av meg</div>;
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    const handleLesIntroPaaNytt = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();
        handleKlikkLesIntro();
        props.lesIntroPaaNyttCB();
    };

    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Innsending av meldekort</Systemtittel>

            <Meldekortstatus iDag={datoUtenTid(dato.toISOString())} />

            <div>
                <LenkepanelMeldekort
                    amplitudeData={amplitudeData}
                    href={
                        'https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det'
                    }
                >
                    {`Send inn for uke 
                    ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} og ${hentISOUke(
                        foerstkommendeMeldekort.meldeperiode?.til!!
                    )}`}
                </LenkepanelMeldekort>
            </div>
            <Lenke className={'lesIgjenLenke'} href="" onClick={handleLesIntroPaaNytt}>
                Les kort beskrivelse til meldekort
            </Lenke>
        </div>
    );
}

function MeldekortIntro(props: MeldekortIntroProps) {
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

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKortIndex) {
            const handling = `Går fra ${forrigeKortRef.current + 1} til kort ${gjeldendeKortIndex + 1}`;
            amplitudeLogger('veientilarbeid.intro', {
                intro: 'meldekort',
                handling,
                ...props.amplitudeData,
            });
            forrigeKortRef.current = gjeldendeKortIndex;
        }
    }, [gjeldendeKortIndex, props.amplitudeData]);

    return (
        <>
            <div className={'kortwrapper'}>
                <Normaltekst>
                    <EtikettInfo>
                        {gjeldendeKortIndex + 1} av {introKort.length}
                    </EtikettInfo>
                </Normaltekst>
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
                    <Nesteknapp mini onClick={props.ferdigMedIntroCB}>
                        {' '}
                        Fullfør{' '}
                    </Nesteknapp>
                )}
            </div>
        </>
    );
}

function Onboardingwrapper() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: meldekortData } = React.useContext(MeldekortContext);
    const { data: registreringData } = React.useContext(BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(OppfolgingContext);
    const { data: featuretoggledata } = React.useContext(FeaturetoggleContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const [erFerdigMedIntro, setErFerdigMedIntro] = React.useState(hentFraLocalStorage(MELDEKORT_INTRO_KEY) || false);
    const brukerregistreringData = registreringData ? registreringData.registrering : null;
    const erNyregistrert = amplitudeData.ukerRegistrert === 0;

    if (!featuretoggledata['veientilarbeid.meldekortonboarding']) return null;

    const meldekortliste = meldekortData?.meldekort ?? [];
    const harMeldekort = meldekortliste.length > 0;
    if (!harMeldekort) return null;
    const harDagpengerEllerArbeidssokerMeldekort =
        meldekortliste.filter((meldekort) => ['DAGP', 'ARBS'].includes(meldekort.meldegruppe ?? 'NULL')).length > 0;

    const kanViseKomponent =
        harDagpengerEllerArbeidssokerMeldekort &&
        erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !kanReaktiveres;

    if (!kanViseKomponent) return null;

    const ferdiMedIntroCB = () => {
        setErFerdigMedIntro(true);
        settILocalStorage(MELDEKORT_INTRO_KEY, 'meldekort_intro');
    };
    const lesIntroPaaNyttCB = () => {
        setErFerdigMedIntro(false);
    };

    return (
        <Panel className="blokk-s meldekort-onboarding" border>
            <div className={'overall-wrapper'}>
                {!erFerdigMedIntro && erNyregistrert ? (
                    <MeldekortIntro ferdigMedIntroCB={ferdiMedIntroCB} amplitudeData={amplitudeData} />
                ) : (
                    <Sluttkort
                        amplitudeData={amplitudeData}
                        meldekortData={meldekortData}
                        lesIntroPaaNyttCB={lesIntroPaaNyttCB}
                    />
                )}
            </div>
        </Panel>
    );
}

export default Onboardingwrapper;
