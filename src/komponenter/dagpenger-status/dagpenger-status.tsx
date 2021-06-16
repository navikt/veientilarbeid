import React from 'react';
import './dagpenger-status.less';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import * as PaabegynteSoknader from '../../ducks/paabegynte-soknader';
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
import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';

const virkedager = require('@alheimsins/virkedager');

function DagpengerStatus() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);
    const { data: paabegynteSoknaderData } = React.useContext(PaabegynteSoknader.PaabegynteSoknaderContext);
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
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadFerdigBehandlet) return <FerdigBehandletSoknad />;
    if (dagpengerSokeStatus === DagpengerSokestatuser.soknadUnderBehandling)
        return <SoknadTilBehandling behandlingskjeder={behandlingskjeder} />;
    if (dagpengerSokeStatus === DagpengerSokestatuser.harPaabegynteSoknader)
        return <PaabegyntSoknad behandling={sisteBehandling} />;
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
                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om dagpenger må du bruke{' '}
                    <Lenke href="https://mininnboks.nav.no/sporsmal/skriv/ARBD">Skriv til oss</Lenke> eller{' '}
                    <Lenke href="https://www.nav.no/person/kontakt-oss/chat/">Chat</Lenke>
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
                            <Normaltekst>Du kan begynne nå og fortsette senere</Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
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
function FerdigBehandletSoknad() {
    return (
        <DagpengerDekorator tittle={'Søknaden din om dagpenger er ferdig behandlet'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    Vi har ikke digitalisert utfallet av behandlingen, men du kan lese svarbrevet{' '}
                    <Lenke className={'tracking-wide'} href={''}>
                        her
                    </Lenke>
                </Normaltekst>
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

function PaabegyntSoknad({ behandling }: { behandling: Behandling | null }) {
    return (
        <DagpengerDekorator tittle={'Du har startet på en søknad om dagpenger, men ikke sendt den inn'}>
            <div>
                <Normaltekst className={'blokk-xs gul-uthevingslinje'}>
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
                            {behandling ? (
                                <Normaltekst>
                                    Du startet på søknaden den{' '}
                                    {prettyPrintDato(new Date(behandling.sistOppdatert).toISOString())}
                                </Normaltekst>
                            ) : null}
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
    const kopiAvDatoForSisteInnsendteSoknad = new Date(datoForSisteInnsendteSoknad.toISOString());
    const datoForForventetSvar = new Date(virkedager(kopiAvDatoForSisteInnsendteSoknad, 30));
    const dagensDato = new Date();

    const ForventetSvar = () => {
        return (
            <Normaltekst className={'blokk-xs'}>
                Du kan forvente svar innen {prettyPrintDato(datoForForventetSvar?.toISOString())}
            </Normaltekst>
        );
    };

    const Saksbehandlingstider = () => {
        return (
            <Normaltekst className={'blokk-xs'}>
                Normal saksbehandlingstid er 30 dager. Se{' '}
                <Lenke href="https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav">
                    saksbehandlingsoversikten
                </Lenke>{' '}
                for mer informasjon.
            </Normaltekst>
        );
    };

    return (
        <DagpengerDekorator tittle={'Vi har mottatt søknad om dagpenger'}>
            <div>
                <Normaltekst className={'blokk-xs'}>
                    Siste søknad mottatt: {prettyPrintDato(datoForSisteInnsendteSoknad?.toISOString())}{' '}
                </Normaltekst>
                {dagensDato < datoForForventetSvar ? <ForventetSvar /> : <Saksbehandlingstider />}
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
            <ErRendret loggTekst="Rendrer dagpengerstatus" />
            <div>
                <Element tag={'h1'}>DAGPENGER</Element>
                <Systemtittel className={'blokk-xs'}>{props.tittle}</Systemtittel>
            </div>
            {props?.children}
            <InViewport loggTekst="Viser dagpengerstatus i viewPort" />
        </div>
    );
}

export default DagpengerStatus;
