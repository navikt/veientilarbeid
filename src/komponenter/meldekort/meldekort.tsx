import React  from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilMeldekort } from '../../metrics/metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull;
}

const Meldekort = (props: StateProps) => {
    const { servicegruppe } = props;
    const overskrift = 'meldekort-overskrift';
    const ingress = 'meldekort-ingress';

    const handleClick = () => {
        gaTilMeldekort(servicegruppe);
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

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(Meldekort);
