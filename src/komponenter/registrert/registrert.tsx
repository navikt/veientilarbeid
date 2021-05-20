import React, { useContext, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { loggAktivitet } from '../../metrics/metrics';
import Opplysninger from '../innsyn/registreringsopplysninger';
import './registrert.less';
import MeldekortIntroWrapper from '../meldekortintro/meldekort-intro';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import Intro14AWrapper from '../14a-intro/14a';
import InViewport from '../in-viewport/in-viewport';

const Registrert = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const autentiseringData = React.useContext(AutentiseringContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);
    const featuretoggleData = React.useContext(FeaturetoggleContext).data;
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const featureToggleErAktivert = featuretoggleData['veientilarbeid.registrert-permittert'];

    const kanViseKomponent =
        oppfolgingData.formidlingsgruppe === 'ARBS' &&
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 &&
        underOppfolging;

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
        <div className="blokk-s registrerings-container">
            <AlertStripeInfo className={showOpplysninger ? 'registrering-info' : ''}>
                <Element>{tittel}</Element>
            </AlertStripeInfo>
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
            <div className={'intro-wrapper'}>
                <Intro14AWrapper />
                <MeldekortIntroWrapper />
            </div>
            <InViewport loggTekst="Registreringsboks i viewport" />
        </div>
    );
};

export default Registrert;
