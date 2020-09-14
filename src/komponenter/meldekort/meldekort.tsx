import React  from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilMeldekort, loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const Meldekort = (props: AmplitudeAktivitetsProps) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const meldekortNyTekst = React.useContext(FeaturetoggleContext).data['veientilarbeid.meldekort.ny-tekst'];

    const overskrift = 'meldekort-overskrift';
    const ingress = meldekortNyTekst ? 'meldekort-ingress-ny' : 'meldekort-ingress';
    const { amplitudeAktivitetsData } = props;

    const handleClick = () => {
        gaTilMeldekort(servicegruppe);
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
