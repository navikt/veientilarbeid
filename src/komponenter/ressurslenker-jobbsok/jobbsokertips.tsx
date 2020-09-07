import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilJobbsokerkompetanse, gaTilVeiviserarbeidssoker, loggAktivitet } from '../../metrics/metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { jobbsokerkompetanseLenke, veiviserarbeidssokerLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

interface StateProps {
    harJobbbsokerbesvarelse: boolean;
}

type AllProps = StateProps & OwnProps;

const Ressurslenker = (props: AllProps) => {
    const { harJobbbsokerbesvarelse, poaGruppe, geografiskTilknytning, isKSSX } = props;
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const URL = harJobbbsokerbesvarelse ? jobbsokerkompetanseLenke : veiviserarbeidssokerLenke;

    const lenketekst = harJobbbsokerbesvarelse
        ? 'jobbsokertips-overskrift-har-besvarelse'
        : 'jobbsokertips-overskrift-har-ikke-besvarelse';

    const gaTil = harJobbbsokerbesvarelse
        ? gaTilJobbsokerkompetanse
        : gaTilVeiviserarbeidssoker;

    const aktivitet = harJobbbsokerbesvarelse
        ? 'Går til jobbsøkerkompetanse'
        : 'Går til veiviser arbeidssøker';

    const handleClick = () => {
        gaTil(servicegruppe);
        loggAktivitet({ aktivitet: aktivitet, gruppe: poaGruppe, geografiskTilknytning, isKSSX });
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
});

export default connect(mapStateToProps)(Ressurslenker);
