import React from 'react';
import { gaTilCV } from '../../metrics/metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull
}

const CV = (props: StateProps) => {

    const { servicegruppe } = props;

    const handleClick = () => {
        gaTilCV(servicegruppe);
    };

    return (
        <LenkepanelMedIkon
            href={cvLenke}
            alt=""
            onClick={handleClick}
            overskrift="cv-overskrift"
        >
            <CvIkon/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(CV);
