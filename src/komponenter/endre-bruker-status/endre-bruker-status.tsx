import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { AppState } from '../../reducer';
import getStore from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import sykeforloepMetadataMock from '../../mocks/sykmeldt-info-mock';
import {
    selectSykmeldtInfo, State as SykeforloepMetadataState,
    ActionTypes as SykmeldtInfoActionTypes, RegistreringType
} from '../../ducks/sykmeldt-info';
import './endre-bruker-status.less';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

type Props = InjectedIntlProps & StateProps;

class EndreBrukerStatus extends React.Component<Props> {

    componentWillMount() {
        const brukerStatus = parse(window.location.search).brukerStatus;

        if (brukerStatus === 'ordinaer') {
            this.dispatchType(RegistreringType.ORDINAER_REGISTRERING);
        } else if (brukerStatus === 'sykmeldt') {
            this.dispatchType(RegistreringType.SYKMELDT_REGISTRERING);
        }

    }

    dispatchType = (registreringsType: RegistreringType) => {
        getStore().dispatch(
            {
                type: SykmeldtInfoActionTypes.HENT_SYKMELDT_INFO_OK,
                data: Object.assign({}, sykeforloepMetadataMock,
                                    { registreringType: registreringsType})
            }
        );
    }

    render() {

        const registreringType = this.props.sykeforloepMetadata.data!.registreringType;

        return (
            <div className="endre-bruker-status">
                <fieldset className="endre-bruker-status__fieldset">
                    <legend className="endre-bruker-status__legend">
                        <Normaltekst>
                            Endre bruker status
                        </Normaltekst>
                    </legend>

                    <div className="endre-bruker-status__radio-btn-wrapper">
                        <input
                            onChange={() => {
                                this.dispatchType(RegistreringType.SYKMELDT_REGISTRERING);
                            }}
                            type="radio"
                            id="sykmeldt"
                            value="Sykmeldt"
                            name="brukerStatus"
                            checked={registreringType === RegistreringType.SYKMELDT_REGISTRERING}
                        />
                        <label htmlFor="sykmeldt">Sykmeldt</label>
                    </div>

                    <div className="endre-bruker-status__radio-btn-wrapper">
                        <input
                            onChange={() => {
                                this.dispatchType(RegistreringType.ORDINAER_REGISTRERING);
                            }}
                            type="radio"
                            id="ordinaer"
                            value="Ordinær"
                            name="brukerStatus"
                            checked={registreringType === RegistreringType.ORDINAER_REGISTRERING}
                        />
                        <label htmlFor="ordinaer">Ordinær</label>
                    </div>

                </fieldset>
            </div>

        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    sykeforloepMetadata: selectSykmeldtInfo(state),
});

export default connect(mapStateToProps)(injectIntl(EndreBrukerStatus));