import React  from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import {AmplitudeAktivitetContext} from "../../ducks/amplitude-aktivitet-context";

const Meldekort = () => {
    const meldekortNyTekst = React.useContext(FeaturetoggleContext).data['veientilarbeid.meldekort.ny-tekst'];
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);

    const overskrift = 'meldekort-overskrift';
    const ingress = meldekortNyTekst ? 'meldekort-ingress-ny' : 'meldekort-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til meldekortet', ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon
            href={meldekortLenke}
            className="meldekort"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <EmailText />
        </LenkepanelMedIkon>
    );
}

export default Meldekort;
