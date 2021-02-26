import React, { useEffect, useRef, useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { Data as MeldekortData, MeldekortContext } from '../../ducks/meldekort';
import { OppfolgingContext } from '../../ducks/oppfolging';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './meldekort-intro.less';
import { datoUtenTid, hentISOUke, datoMedUkedag } from '../../utils/date-utils';
import {
    foersteSendedagForMeldekort,
    hentFoerstkommendeMeldekortIkkeKlarForLevering,
    hentMeldekortForLevering,
} from '../../utils/meldekort-utils';
import Meldekortstatus from './meldekortstatus';
import { hentFraLocalStorage, settILocalStorage } from '../../demo/demo-state';
import { EtikettInfo } from 'nav-frontend-etiketter';
import LenkepanelMeldekort from './lenkepanel-Meldekort';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { hentIDag } from '../../utils/chrono';
import { meldekortLenke, omMeldekortLenke } from '../../innhold/lenker';

const MELDEKORT_INTRO_KEY = 'meldekortintro';

function Kort1() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Introduksjon til meldekort</Systemtittel>

            <Normaltekst className={'blokk-xs'}>
                Når du er registrert som arbeidssøker, må du sende inn et meldekort hver 14. dag.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Dersom du har søkt om dagpenger må du sende inn meldekort. Det må du gjøre selv om du ikke har fått svar
                på søknaden.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Det er innsending av meldekort som gjør at du opprettholder status som registrert arbeidssøker.
            </Normaltekst>
        </div>
    );
}

function Kort2() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Introduksjon til meldekort</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Utbetaling av dagpenger beregnes ut fra opplysninger du har lagt inn på meldekortet.
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Sender du inn meldekortet etter fristen, kan det føre til at du får mindre utbetalt.
            </Normaltekst>
            <Normaltekst className={'blokk-xs'}>
                Lar du være å sende inn meldekort, tolker NAV det som at du ikke ønsker å stå registrert som
                arbeidssøker.
            </Normaltekst>
        </div>
    );
}

function Kort3() {
    return (
        <div>
            <Systemtittel className={'blokk-xs'}>Introduksjon til meldekort</Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Dersom du sender inn meldekortet for sent vil dagpengene kunne stanses, og du risikerer at
                arbeidsoppfølging fra NAV avsluttes.
            </Normaltekst>

            <Normaltekst className={'blokk-xs'}>
                Det er derfor viktig at du sender meldekortene inn før fristen går ut.
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

    if (meldekortForLevering.length > 1) {
        return <div>Vent litt, så får du en lenke av meg</div>;
    }

    if (meldekortForLevering.length === 0) {
        const meldekortIkkeKlarForLevering = hentFoerstkommendeMeldekortIkkeKlarForLevering(dato, meldekortData);
        if (!meldekortIkkeKlarForLevering) return null;

        return (
            <div>
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
                <Tilbakeknapp mini onClick={handleLesIntroPaaNytt}>
                    Vis introduksjon til meldekort
                </Tilbakeknapp>
            </div>
        );
    }
    const foerstkommendeMeldekort = meldekortForLevering[0];

    return (
        <div>
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
            <Tilbakeknapp mini onClick={handleLesIntroPaaNytt}>
                Vis introduksjon til meldekort
            </Tilbakeknapp>
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
                <EtikettInfo mini>
                    {gjeldendeKortIndex + 1} av {introKort.length}
                </EtikettInfo>
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
                        Avslutt introduksjonen{' '}
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
    const { rettighetsgruppe } = React.useContext(BrukerInfoContext).data;
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const [erFerdigMedIntro, setErFerdigMedIntro] = React.useState(hentFraLocalStorage(MELDEKORT_INTRO_KEY) || false);
    const brukerregistreringData = registreringData ? registreringData.registrering : null;
    const erNyregistrert = amplitudeData.ukerRegistrert === 0;

    const meldekortliste = meldekortData?.meldekort ?? [];
    const harMeldekort = meldekortliste.length > 0;
    if (!harMeldekort) return null;

    const erAAP = rettighetsgruppe === 'AAP';
    const harDagpengerEllerArbeidssokerMeldekort =
        meldekortliste.filter((meldekort) => ['DAGP', 'ARBS'].includes(meldekort.meldegruppe ?? 'NULL')).length > 0;

    const kanViseKomponent =
        !erAAP &&
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
        <Panel className={'meldekort-onboarding'} border>
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
