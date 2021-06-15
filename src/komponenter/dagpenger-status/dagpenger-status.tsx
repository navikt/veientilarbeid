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
import beregnDagpengerSokeStatus, { DagpengerSokestatuser, sistOppdaterteBehandling } from './beregn-dagpenger-status';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { lenker } from '../dittnav/utils/lenker';
import { Behandling } from '../../utils/dager-fra-innsendt-soknad';
import prettyPrintDato from '../../utils/pretty-print-dato';

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

    let sisteBehandling = null;
    if (opprettetRegistreringDato && behandlingskjeder)
        sisteBehandling = sistOppdaterteBehandling(behandlingskjeder, opprettetRegistreringDato);

    if (dagpengerSokeStatus === DagpengerSokestatuser.mottarDagpenger) {
        return <MottarDagpenger behandling={sisteBehandling} />;
    }
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadFerdigBehandlet)
        return <div>KOMPONENT FOR SOKNAD FERDIG BEHANDLET IKKE LAGET</div>;
    if (ettersendelser.length > 0) return <EttersendVedlegg />;
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadUnderBehandling)
        return (
            <div>
                <SoknadTilBehandling behandlingskjeder={behandlingskjeder} />
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
                        </div>
                    </div>
                </LenkepanelBase>

                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function MottarDagpenger({ behandling }: { behandling: Behandling | null }) {
    return (
        <DagpengerDekorator tittle={'Du har fått innvilget dagpenger'}>
            <div>
                {behandling ? (
                    <Normaltekst className={'blokk-xs'}>
                        Du fikk svar på søknaden {prettyPrintDato(new Date(behandling.sistOppdatert).toISOString())}
                    </Normaltekst>
                ) : null}
            </div>

            <div>
                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
                </Normaltekst>
                <Normaltekst>
                    Gå til{' '}
                    <Lenke className={'tracking-wide'} href={lenker.saksoversikt.url}>
                        din saksoversikt
                    </Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function PaabegyntSoknad() {
    return (
        <DagpengerDekorator tittle={'Du har startet på en  søknad om dagpenger, men ikke sendt den inn'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    <b>Du kan tidligst få dagpenger</b> fra den dagen du sender inn søknaden.
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

                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
                </Normaltekst>
                <Normaltekst>
                    Gå til{' '}
                    <Lenke className={'tracking-wide'} href={lenker.saksoversikt.url}>
                        din saksoversikt
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
                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
                </Normaltekst>
                <Normaltekst>
                    Gå til{' '}
                    <Lenke className={'tracking-wide'} href={lenker.saksoversikt.url}>
                        din saksoversikt
                    </Lenke>
                </Normaltekst>
            </div>
        </DagpengerDekorator>
    );
}

function SoknadTilBehandling({ behandlingskjeder }: { behandlingskjeder: Behandling[] | null }) {
    const datoForSisteInnsendeSoknad = (behandlingskjeder: Behandling[] | null): Date => {
        if (!behandlingskjeder) return new Date();

        const dato = behandlingskjeder
            .filter((behandling) => behandling.status === 'UNDER_BEHANDLING')
            .sort((a, b) => {
                return new Date(b.sistOppdatert).getTime() - new Date(a.sistOppdatert).getTime();
            })[0].sistOppdatert;

        return new Date(dato);
    };

    const datoForSisteInnsendteSoknad = datoForSisteInnsendeSoknad(behandlingskjeder);

    return (
        <DagpengerDekorator tittle={'Vi har mottatt søknad om dagpenger'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    Siste søknad mottatt: {prettyPrintDato(datoForSisteInnsendteSoknad?.toISOString())}{' '}
                </Normaltekst>
                <Normaltekst className={'blokk-xs'}>Du kan forvente svar innen 24. juli</Normaltekst>
            </div>

            <div>
                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
                </Normaltekst>
                <Normaltekst>
                    Gå til{' '}
                    <Lenke className={'tracking-wide'} href={lenker.saksoversikt.url}>
                        din saksoversikt
                    </Lenke>
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
                <Systemtittel className={'blokk-xs'}>{props.tittle}</Systemtittel>
            </div>
            {props?.children}
        </div>
    );
}

export default DagpengerStatus;
