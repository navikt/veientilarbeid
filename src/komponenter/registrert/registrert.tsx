import React, { useContext, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { loggAktivitet } from '../../metrics/metrics';
import Opplysninger from '../innsyn/registreringsopplysninger';
import './registrert.less';
import Meldekortstatus from './meldekortstatus';
import Onboardingwrapper from '../onboarding/meldekort-intro';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { BrukerInfoContext } from '../../ducks/bruker-info';

const Registrert = () => {
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const { geografiskTilknytning } = React.useContext(BrukerInfoContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const autentiseringData = React.useContext(AutentiseringContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { data: featuretoggledata } = React.useContext(FeaturetoggleContext);

    const kanViseKomponent =
        oppfolgingData.formidlingsgruppe === 'ARBS' &&
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 &&
        underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }
    if (!brukerregistreringData) {
        return (
            <div className="blokk-s">
                <AlertStripeInfo>
                    <Element>Du er registrert som arbeidssøker</Element>
                </AlertStripeInfo>
            </div>
        );
    }
    const { registrering } = brukerregistreringData;
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse } = registrering;
    const showOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse;
    const erEksperimentkontor = [
        '030112',
        '030105',
        '3413',
        '3407',
        '3401',
        '3807',
        '3803',
        '1120',
        '1121',
        '110302',
        '110303',
        '3808',
        '110306',
        '110307',
        '030114',
        '3418',
        '3411',
        '030108',
        '030109',
        '1149',
        '110301',
    ].includes(geografiskTilknytning || 'null');

    const handleClickOpen = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra registreringen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <div className="blokk-s registrerings-container">
            <AlertStripeInfo className={showOpplysninger ? 'registrering-info' : ''}>
                <Element>Du er registrert som arbeidssøker</Element>
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

            {featuretoggledata['veientilarbeid.meldekortonboarding'] && erEksperimentkontor ? (
                <Onboardingwrapper />
            ) : (
                <Meldekortstatus />
            )}
        </div>
    );
};

export default Registrert;
