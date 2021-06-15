import React from 'react';
import './dagpenger-status.less';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import * as PaabegynteSoknader from '../../ducks/paabegynte-soknader';
import * as MuligeEttersendelser from '../../ducks/mulige-ettersendelser';
import * as Sakstema from '../../ducks/sakstema';
import { kanVise14AStatus } from '../14a-intro/14a';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import beregnDagpengerSokeStatus, { DagpengerSokestatuser } from './beregn-dagpenger-status';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';

function DagpengerStatus() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: paabegynteSoknaderData } = React.useContext(PaabegynteSoknader.PaabegynteSoknaderContext);
    const { data: muligeEttersendelserData } = React.useContext(MuligeEttersendelser.MuligeEttersendelserContext);
    const { data: sakstemaData } = React.useContext(Sakstema.SakstemaContext);

    const featuretoggleAktivert = featuretoggleData['veientilarbeid.dagpenger-status'];

    const kanViseKomponent =
        featuretoggleAktivert && kanVise14AStatus({ amplitudeData, oppfolgingData, brukerInfoData, registreringData });

    if (!kanViseKomponent) return null;

    const opprettetRegistreringDatoString = registreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const dagpengerSaksTema = sakstemaData.sakstema.find((tema) => tema.temakode === 'DAG');
    const behandlingskjeder = dagpengerSaksTema ? dagpengerSaksTema.behandlingskjeder : null;
    const paabegynteSoknader = paabegynteSoknaderData.soknader;
    const rettighetsgruppe = brukerInfoData.rettighetsgruppe;
    const ettersendelser = muligeEttersendelserData;

    const dagpengerSokeStatus = beregnDagpengerSokeStatus({
        opprettetRegistreringDato,
        rettighetsgruppe,
        paabegynteSoknader,
        behandlingskjeder,
    });

    if (dagpengerSokeStatus === DagpengerSokestatuser.mottarDagpenger)
        return <div>KOMPONENT FOR MOTTAR DAGPENGER IKKE LAGET</div>;
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadFerdigBehandlet)
        return <div>KOMPONENT FOR SOKNAD FERDIG BEHANDLET IKKE LAGET</div>;
    if (ettersendelser.length > 0) return <EttersendVedlegg />;
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadUnderBehandling)
        return (
            <div>
                <SoknadTilBehandling />
            </div>
        );
    if (dagpengerSokeStatus === DagpengerSokestatuser.harPaabegynteSoknader) return <PaabegyntSoknad />;
    else if (dagpengerSokeStatus === DagpengerSokestatuser.ukjentStatus) return <IkkeSoktDagpenger />;
    else return null;
}

function IkkeSoktDagpenger() {
    return (
        <DagpengerDekorator tittle={'Du har ikke søkt om dagpenger'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    Du kan tidligst få dagpenger fra den dagen du sender inn søknaden.
                </Normaltekst>
                <Normaltekst>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke>
                </Normaltekst>
            </div>

            <div>
                <LenkepanelBase
                    href={'https://www.nav.no/soknader/nb/person/arbeid/dagpenger'}
                    border={true}
                    className={'meldekort-send-inn-kort'}
                >
                    <div className="lenkepanel__innhold">
                        <div className="ml-1">
                            <Element>Søk om dagpenger</Element>
                            <Normaltekst>Du er registrert som ***</Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''}>
                        Dagpenger er ikke aktuelt for meg
                    </Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function PaabegyntSoknad() {
    return (
        <DagpengerDekorator tittle={'Du har en påbegynt søknad'}>
            <div>
                <Normaltekst className={'blokk-xs'}>Du begynte på den for PLACEHOLDER dager siden</Normaltekst>
                <Normaltekst>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke>
                </Normaltekst>
            </div>

            <div>
                <LenkepanelBase
                    href={'https://www.nav.no/soknader/nb/person/arbeid/dagpenger'}
                    border={true}
                    className={'meldekort-send-inn-kort'}
                >
                    <div className="lenkepanel__innhold">
                        <div className="ml-1">
                            <Element>Fortsett på søknaden</Element>
                            <Normaltekst>...</Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''}>
                        Gå til dagpengeroversikt (side #2)
                    </Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function EttersendVedlegg() {
    return (
        <DagpengerDekorator tittle={'Du må ettersende vedlegg'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    Du begynte på søknaden om dagpenger for PLACEHOLDER dager siden
                </Normaltekst>
                <Normaltekst>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke>
                </Normaltekst>
            </div>

            <div>
                <LenkepanelBase
                    href={'https://www.nav.no/soknader/nb/person/arbeid/dagpenger'}
                    border={true}
                    className={'meldekort-send-inn-kort'}
                >
                    <div className="lenkepanel__innhold">
                        <div className="ml-1">
                            <Element>Gå til ettersending</Element>
                            <Normaltekst>...</Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''}>
                        Gå til dagpengeroversikt (side #2)
                    </Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function SoknadTilBehandling() {
    return (
        <DagpengerDekorator tittle={'Vi har mottatt en søknad om dagpenger'}>
            <div>
                <Normaltekst className={'blokk-xs'}>Innsendt/Mottattdato: PLACEHOLDER</Normaltekst>
                <Normaltekst className={'blokk-xs'}>Du kan forvente svar innen 22 virkedager PLACEHOLDER</Normaltekst>
            </div>
            <div className="blokk-xs">
                <Normaltekst>
                    <Lenke className={'tracking-wide'} href={''}>
                        Gå til dagpengeroversikt (side #2)
                    </Lenke>
                </Normaltekst>
            </div>
            <div>
                <Normaltekst>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

interface DapengerDekoratorProps {
    tittle: string;
    children: React.ReactNode;
}

function DagpengerDekorator(props: DapengerDekoratorProps) {
    return (
        <div className={'dagpenger-status-omslutning'}>
            <div>
                <Element style={{ color: 'red' }}>DAGPENGER</Element>
                <Systemtittel>{props.tittle}</Systemtittel>
            </div>
            {props?.children}
        </div>
    );
}

export default DagpengerStatus;
