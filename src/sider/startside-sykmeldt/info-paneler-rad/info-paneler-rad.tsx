import * as React from 'react';
import './info-paneler-rad.less';
import InfoPanel from './info-panel';
import sykefravaerBilde from './sykefravaer.svg';
import hjelpTilJobbBilde from './hjelp-til-jobb.svg';
import { AppState } from '../../../reducer';
import {
    FremtidigSituasjonSvar,
    hentRegistrering,
    selectRegistrering,
    State as RegistreringState
} from '../../../ducks/registrering';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface StateProps {
    registrering: RegistreringState;
}

interface DispatchProps {
    hentRegistrering: () => void;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

function lagTiltaksInfoLenke(tiltaksInfoLenkeBase: string, fremtidigSituasjon?: FremtidigSituasjonSvar): string {
    return tiltaksInfoLenkeBase + (fremtidigSituasjon ? `?fremdtidigSituasjon=${fremtidigSituasjon}` : '');
}

class InfoPanelerRad extends React.Component<Props> {

    componentDidMount() {
        this.props.hentRegistrering();
    }

    render() {

        const {data} = this.props.registrering;

        const fremdtidigSituasjon = data ? data.registrering.besvarelse.fremtidigSituasjon : undefined;
        const tiltaksInfoLenkeBase = this.props.intl.messages['info-paneler-rad-hjelp-til-jobb-lenke-url'];

        const tiltaksInfoLenke = lagTiltaksInfoLenke(tiltaksInfoLenkeBase, fremdtidigSituasjon);

        return (
            <div className="info-paneler-rad">
                <InfoPanel
                    tittelId="info-paneler-rad-hjelp-til-jobb-tittel"
                    tekstId="info-paneler-rad-hjelp-til-jobb-tekst"
                    lenkeTekstId="info-paneler-rad-hjelp-til-jobb-lenke-tekst"
                    lenkeUrl={tiltaksInfoLenke}
                    bilde={hjelpTilJobbBilde}
                />
                <InfoPanel
                    tittelId="info-paneler-rad-ditt-sykefravaer-tittel"
                    tekstId="info-paneler-rad-ditt-sykefravaer-tekst"
                    lenkeTekstId="info-paneler-rad-ditt-sykefravaer-lenke-tekst"
                    lenkeUrlId="info-paneler-rad-ditt-sykefravaer-lenke-url"
                    bilde={sykefravaerBilde}
                />
            </div>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    registrering: selectRegistrering(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentRegistrering: () => dispatch(hentRegistrering()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(InfoPanelerRad));