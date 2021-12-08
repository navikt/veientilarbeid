import { useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import InViewport from '../in-viewport/in-viewport';
import './registrert.less';
import Temapanel from '../tema-panel/tema-panel';
import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';

const Registrert = () => {
    const brukerregistreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();

    const oppdatertStylingFeaturetoggle =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-oppdatert-styling'];

    const kanViseKomponent = useErInnloggetArbeidssoker();

    const scrollToRegistrering = () => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        const registreringsboks = document.getElementById('registrering-status-container');
        if (goto === 'registrering' && registreringsboks) {
            registreringsboks.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
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

    return (
        <div
            id="registrering-status-container"
            className={
                oppdatertStylingFeaturetoggle
                    ? 'oppdatert-registrerings-container blokk-s'
                    : 'registrerings-container blokk-s'
            }
        >
            <Temapanel />
            <InViewport loggTekst="Registreringsboks i viewport" />
        </div>
    );
};

export default Registrert;
