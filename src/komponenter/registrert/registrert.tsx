import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { loggAktivitet } from '../../metrics/metrics';
import Opplysninger from '../innsyn/registreringsopplysninger';
import DagpengerStatus from '../dagpenger-status/dagpenger-status';
import './registrert.less';
import MeldekortIntroWrapper from '../onboardingMeldekort/meldekort-intro';
import { BrukerregistreringContext } from '../../context/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { FeaturetoggleContext } from '../../context/feature-toggles';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import KvitteringWrapper from '../kvitteringer/kvittering-wrapper';
import InViewport from '../in-viewport/in-viewport';
import Permittert from './permittert';
import Ytelser from '../onboarding-ytelser/ytelser';

const Registrert = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const autentiseringData = React.useContext(AutentiseringContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);
    const featuretoggleData = React.useContext(FeaturetoggleContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const [visKvittering, setVisKvittering] = useState('');

    const featureToggleErAktivert = featuretoggleData['veientilarbeid.registrert-permittert'];
    const oppdatertStylingFeaturetoggle =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-oppdatert-styling'];

    const kanViseKomponent =
        oppfolgingData.formidlingsgruppe === 'ARBS' &&
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 &&
        underOppfolging;

    const scrollToRegistrering = () => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        const kvittering = new URLSearchParams(window.location.search).get('visKvittering');
        const registreringsboks = document.getElementById('registrering-status-container');
        if (goto === 'registrering' && registreringsboks) {
            registreringsboks.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
        setVisKvittering(kvittering || '');
    };

    useEffect(() => {
        scrollToRegistrering();
    }, []);

    if (!kanViseKomponent) {
        return null;
    }

    if (!brukerregistreringData || !brukerregistreringData.registrering) {
        return (
            <div className="blokk-s">
                <AlertStripeInfo>
                    <Element>Du er registrert som arbeidssøker</Element>
                </AlertStripeInfo>
                <InViewport loggTekst="Tom registreringsboks i viewport" />
            </div>
        );
    }
    const { registrering } = brukerregistreringData;
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse } = registrering;
    const showOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse;

    const visRegistrertSomPermittert = featureToggleErAktivert && besvarelse.dinSituasjon === 'ER_PERMITTERT';

    const tittel = visRegistrertSomPermittert
        ? 'Du er registrert som permittert (arbeidssøker)'
        : 'Du er registrert som arbeidssøker';

    const handleClickOpen = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra registreringen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <div
            id="registrering-status-container"
            className={
                oppdatertStylingFeaturetoggle
                    ? 'oppdatert-registrerings-container blokk-s'
                    : 'registrerings-container blokk-s'
            }
        >
            <AlertStripeInfo className={showOpplysninger ? 'registrering-info' : ''}>
                <Element>{tittel}</Element>
            </AlertStripeInfo>
            <Permittert visRegistrertSomPermittert={visRegistrertSomPermittert} />
            {showOpplysninger ? (
                <Ekspanderbartpanel
                    tittel="Se svarene dine fra registreringen"
                    border
                    className="registrering-svar"
                    onClick={handleClickOpen}
                >
                    <Opplysninger
                        opprettetDato={opprettetDato}
                        manueltRegistrertAv={manueltRegistrertAv}
                        besvarelse={besvarelse}
                        teksterForBesvarelse={teksterForBesvarelse}
                        amplitudeData={amplitudeData}
                    />
                </Ekspanderbartpanel>
            ) : null}

            {visKvittering && <KvitteringWrapper kvittering={visKvittering} />}

            <div className={oppdatertStylingFeaturetoggle ? 'oppdatert-intro-wrapper' : 'intro-wrapper'}>
                <DagpengerStatus />
                <Onboarding14A />
                <MeldekortIntroWrapper />
                <Ytelser />
            </div>
            <InViewport loggTekst="Registreringsboks i viewport" />
        </div>
    );
};

export default Registrert;
