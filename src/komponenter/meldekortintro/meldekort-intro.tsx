import React, { useEffect, useRef, useState } from 'react';
import { Element, Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Meldekort from '../../ducks/meldekort';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './meldekort-intro.less';
import { datoMedUkedag, datoUtenTid, hentISOUke } from '../../utils/date-utils';
import {
    foersteSendedagForMeldekort,
    hentFoerstkommendeMeldekortIkkeKlarForLevering,
    hentMeldekortForLevering,
} from '../../utils/meldekort-utils';
import Meldekortstatus from './meldekortstatus';
import LenkepanelMeldekort from './lenkepanel-Meldekort';
import { hentIDag } from '../../utils/chrono';
import { meldekortLenke, omMeldekortLenke } from '../../innhold/lenker';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import Feedback from '../feedback/feedback';
import PreState from './pre-state';
import Lenke from 'nav-frontend-lenker';

const MELDEKORT_INTRO_KEY = 'meldekortintro';

function Kort1({ nesteknappintro }: { nesteknappintro: boolean }) {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>1 av {nesteknappintro ? '4' : '3'}</Undertekst>

                <Normaltekst className={'blokk-xs'}>
                    Når du er registrert som arbeidssøker, må du sende inn et meldekort hver 14. dag.
                </Normaltekst>

                <Normaltekst className={'blokk-xs'}>
                    Det er innsending av meldekort som gjør at du opprettholder status som registrert arbeidssøker.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Du må også sende meldekort i perioden du venter svar på en innsendt søknad om dagpenger.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-01'} />
        </div>
    );
}

function Kort2({ nesteknappintro }: { nesteknappintro: boolean }) {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>2 av {nesteknappintro ? '4' : '3'}</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    Utbetaling av dagpenger beregnes ut fra opplysninger du har lagt inn på meldekortet.
                </Normaltekst>
                <Normaltekst className={'blokk-xs'}>
                    Sender du inn meldekortet etter fristen, kan det føre til at du får mindre utbetalt.
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som
                    arbeidssøker.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-02'} />
        </div>
    );
}

function Kort3({ nesteknappintro }: { nesteknappintro: boolean }) {
    return (
        <div className="kortflate">
            <div>
                <Systemtittel>Introduksjon til meldekort</Systemtittel>
                <Undertekst className={'blokk-xs'}>3 av {nesteknappintro ? '4' : '3'}</Undertekst>
                <Normaltekst className={'blokk-xs'}>
                    Dersom du sender inn meldekortet for sent vil dagpengene kunne stanses, og du risikerer at
                    arbeidsoppfølging fra NAV avsluttes.
                </Normaltekst>

                <Normaltekst className={'blokk-m'}>
                    Det er derfor viktig at du sender inn meldekortene før fristen går ut.
                </Normaltekst>
            </div>
            <Feedback id={'meldekort-kort-03'} />
        </div>
    );
}

interface EndStateProps {
    meldekortData: Meldekort.Data | null;
    amplitudeData: AmplitudeData;
    lesIntroPaaNyttCB: () => void;
}

function Sluttkort(props: EndStateProps) {
    const { meldekortData, amplitudeData } = props;
    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);

    const handleKlikkLesIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
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

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <div className={'kortflate'}>
                <div>
                    <Element tag={'h1'}>MELDEKORT</Element>
                    <Systemtittel className={'blokk-xs'}>Innsending av meldekort</Systemtittel>
                    <Normaltekst className={'blokk-xs'}>
                        {`Meldekort for uke 
                        ${hentISOUke(meldekortIkkeKlarForLevering.meldeperiode?.fra!!)} og ${hentISOUke(
                            meldekortIkkeKlarForLevering.meldeperiode?.til!!
                        )} blir tilgjengelig for innsending fra ${datoMedUkedag(
                            foersteSendedagForMeldekort(meldekortIkkeKlarForLevering)
                        )}`}
                    </Normaltekst>
                    <div>
                        <LenkepanelMeldekort amplitudeData={amplitudeData} href={omMeldekortLenke}>
                            Les om meldekort
                        </LenkepanelMeldekort>
                    </div>
                </div>
                <Normaltekst>
                    <Lenke href={''} onClick={handleLesIntroPaaNytt}>
                        Vis introduksjon til meldekort
                    </Lenke>
                </Normaltekst>
            </div>
        );
    }

    if (meldekortForLevering.length > 1) {
        return (
            <div className={'kortflate'}>
                <div>
                    <Element tag={'h1'}>MELDEKORT</Element>
                    <Systemtittel className={'blokk-xs'}>Innsending av meldekort</Systemtittel>
                    <div className={'onboarding-meldekortvarsel-container'}>
                        <Normaltekst>Du har {meldekortForLevering.length} meldekort som kan sendes inn.</Normaltekst>
                    </div>
                    <LenkepanelMeldekort amplitudeData={amplitudeData} href={meldekortLenke}>
                        Send inn
                    </LenkepanelMeldekort>
                </div>
                <Normaltekst>
                    <Lenke href={''} onClick={handleLesIntroPaaNytt}>
                        Vis introduksjon til meldekort
                    </Lenke>
                </Normaltekst>
            </div>
        );
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    return (
        <div className={'kortflate'}>
            <div>
                <Element tag={'h1'}>MELDEKORT</Element>
                <Systemtittel className={'blokk-xs'}>Innsending av meldekort</Systemtittel>
                <Meldekortstatus />
                <div>
                    <LenkepanelMeldekort amplitudeData={amplitudeData} href={meldekortLenke}>
                        {`Send inn for uke 
                        ${hentISOUke(foerstkommendeMeldekort.meldeperiode?.fra!!)} og ${hentISOUke(
                            foerstkommendeMeldekort.meldeperiode?.til!!
                        )}`}
                    </LenkepanelMeldekort>
                </div>
            </div>
            <Normaltekst>
                <Lenke className={'tracking-wide'} href={''} onClick={handleLesIntroPaaNytt}>
                    Vis introduksjon til meldekort
                </Lenke>
            </Normaltekst>
        </div>
    );
}

interface MeldekortIntroProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
    hoppOverPreState: boolean;
}

function MeldekortIntro(props: MeldekortIntroProps) {
    const startkort = props.hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);
    const forrigeKortRef = useRef(gjeldendeKortIndex);
    const nesteknappIntro = props.amplitudeData.eksperimenter.includes('nesteknappIntro');
    const introKort = [
        <PreState
            tittel={'Hva er meldekort og hvordan fungerer de?'}
            lesetid={'2'}
            viewportTekst="Viser meldekort pre-state i viewPort"
            startIntroCB={nesteKort}
            hoppOverIntroCB={hoppOverIntro}
        />,
        <Kort1 nesteknappintro={nesteknappIntro} />,
        <Kort2 nesteknappintro={nesteknappIntro} />,
        <Kort3 nesteknappintro={nesteknappIntro} />,
    ];

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
            intro: 'meldekort',
            handling: 'Fullfører introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    };

    function hoppOverIntro(e: React.SyntheticEvent) {
        e.preventDefault();
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Hopper over introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    }

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKortIndex) {
            const handling =
                forrigeKortRef.current === 0
                    ? `Starter meldekortintroduksjonen`
                    : `Går fra ${forrigeKortRef.current} til kort ${gjeldendeKortIndex}`;
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
                            {nesteknappIntro ? 'Neste' : 'Fullfør'}
                        </Nesteknapp>
                    )}
                </div>
            ) : null}
        </>
    );
}

function kanViseMeldekortStatus({
    meldekortData,
    brukerInfoData,
    oppfolgingData,
    registreringData,
}: {
    meldekortData: Meldekort.Data | null;
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
}): boolean {
    const meldekortliste = meldekortData?.meldekort ?? [];
    const harMeldekort = meldekortliste.length > 0;
    if (!harMeldekort) return false;

    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const harDagpengerEllerArbeidssokerMeldekort =
        meldekortliste.filter((meldekort) => ['DAGP', 'ARBS'].includes(meldekort.meldegruppe ?? 'NULL')).length > 0;

    const brukerregistreringData = registreringData?.registrering ?? null;

    const kanViseKomponent =
        !erAAP &&
        harDagpengerEllerArbeidssokerMeldekort &&
        erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) &&
        !oppfolgingData.kanReaktiveres;

    return kanViseKomponent;
}

function MeldekortIntroWrapper() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);

    const [harSettIntro, setHarSettIntro] = React.useState<boolean>(!!hentFraBrowserStorage(MELDEKORT_INTRO_KEY));
    const [tvingVisningAvIntro, setTvingVisningAvIntro] = React.useState<boolean>(false);

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const rendreIntro = tvingVisningAvIntro || (erNyregistrert && !harSettIntro);
    const hoppOverPreState = harSettIntro || tvingVisningAvIntro;

    useEffect(() => {
        if (harSettIntro) {
            settIBrowserStorage(MELDEKORT_INTRO_KEY, 'true');
        } else {
            fjernFraBrowserStorage(MELDEKORT_INTRO_KEY);
        }
    }, [harSettIntro]);

    if (!kanViseMeldekortStatus({ meldekortData, oppfolgingData, brukerInfoData, registreringData })) {
        fjernFraBrowserStorage(MELDEKORT_INTRO_KEY);
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
        <div className={'meldekort-intro-omslutning'}>
            <Panel className={'meldekort-intro'} border>
                <div className={'overall-wrapper'}>
                    {rendreIntro ? (
                        <MeldekortIntro
                            hoppOverPreState={hoppOverPreState}
                            ferdigMedIntroCB={ferdigMedIntroCB}
                            amplitudeData={amplitudeData}
                        />
                    ) : (
                        <Sluttkort
                            amplitudeData={amplitudeData}
                            meldekortData={meldekortData}
                            lesIntroPaaNyttCB={lesIntroPaaNyttCB}
                        />
                    )}
                </div>
            </Panel>
        </div>
    );
}

export default MeldekortIntroWrapper;
