import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilJobbsokerkompetanse, gaTilVeiviserarbeidssoker } from '../../metrics/metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { jobbsokerkompetanseLenke, veiviserarbeidssokerLenke } from '../../innhold/lenker';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';

interface StateProps {
    harJobbbsokerbesvarelse: boolean;
    servicegruppe: ServicegruppeOrNull;
}

type AllProps = StateProps

const Ressurslenker = (props: AllProps) => {
    const { harJobbbsokerbesvarelse, servicegruppe } = props;
    const URL = harJobbbsokerbesvarelse ? jobbsokerkompetanseLenke : veiviserarbeidssokerLenke;

    const lenketekst = harJobbbsokerbesvarelse
        ? 'jobbsokertips-overskrift-har-besvarelse'
        : 'jobbsokertips-overskrift-har-ikke-besvarelse';

    const gaTil = harJobbbsokerbesvarelse
        ? gaTilJobbsokerkompetanse
        : gaTilVeiviserarbeidssoker;


    const handleClick = () => {
        gaTil(servicegruppe);
    };

    return (
        <LenkepanelMedIkon
            href={URL}
            alt=""
            onClick={handleClick}
            overskrift={lenketekst}
        >
            <JobbsokertipsIkon/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harJobbbsokerbesvarelse: state.jobbsokerbesvarelse.harJobbsokerbesvarelse,
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(Ressurslenker);
