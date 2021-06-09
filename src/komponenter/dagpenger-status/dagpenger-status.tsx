import React from 'react';
import './dagpenger-status.less';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import * as PaabegynteSoknader from '../../ducks/paabegynte-soknader';
import { kanVise14AStatus } from '../14a-intro/14a';
import { AmplitudeContext } from '../../ducks/amplitude-context';
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

    const featuretoggleAktivert = featuretoggleData['veientilarbeid.dagpenger-status'];

    const kanViseKomponent =
        featuretoggleAktivert && kanVise14AStatus({ amplitudeData, oppfolgingData, brukerInfoData, registreringData });

    if (!kanViseKomponent) return null;

    const soknader = paabegynteSoknaderData.soknader;
    const rettighetsgruppe = brukerInfoData.rettighetsgruppe;

    if (rettighetsgruppe === 'DAGP') return <div>KOMPONENT IKKE LAGET</div>;
    else if (rettighetsgruppe === 'IYT' && soknader.length === 0) return <IkkeSoktDagpenger />;
    else return null;
}

function IkkeSoktDagpenger() {
    return (
        <div className={'dagpenger-status-omslutning'}>
            <div>
                <Element style={{ color: 'red' }}>DAGPENGER</Element>
                <Systemtittel className={'blokk-xs'}>Du har ikke søkt om dagpenger</Systemtittel>
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
        </div>
    );
}

export default DagpengerStatus;
