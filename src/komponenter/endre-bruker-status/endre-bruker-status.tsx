import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { AppState } from '../../reducer';
import getStore from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import sykeforloepMetadataMock from '../../mocks/sykmeldt-info-mock';
import { selectSykmeldtInfo, State as SykeforloepMetadataState } from '../../ducks/sykmeldt-info';
import './endre-bruker-status.less';
import { ActionType } from '../../ducks/actions';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

type Props = InjectedIntlProps & StateProps;

class EndreBrukerStatus extends React.Component<Props> {

    componentWillMount() {
        const brukerStatus = parse(window.location.search).brukerStatus;

        if (brukerStatus === 'ordinaer') {
            this.dispatchType(false);
        } else if (brukerStatus === 'sykmeldtMedArbeidsgiver') {
            this.dispatchType(true);
        }
    }

    dispatchType = (erSyk: boolean) => {
        getStore().dispatch(
            {
                type: ActionType.HENT_SYKMELDT_INFO_OK,
                data: Object.assign({}, sykeforloepMetadataMock,
                                    { erSykmeldtMedArbeidsgiver: erSyk})
            }
        );
    }

    render() {

        const erSykmeldtMedArbeidsgiver = this.props.sykeforloepMetadata.data.erSykmeldtMedArbeidsgiver;

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
                                this.dispatchType(true);
                            }}
                            type="radio"
                            id="sykmeldt"
                            value="Sykmeldt"
                            name="brukerStatus"
                            checked={erSykmeldtMedArbeidsgiver === true}
                        />
                        <label htmlFor="sykmeldt">Sykmeldt</label>
                    </div>

                    <div className="endre-bruker-status__radio-btn-wrapper">
                        <input
                            onChange={() => {
                                this.dispatchType(false);
                            }}
                            type="radio"
                            id="ordinaer"
                            value="Ordinær"
                            name="brukerStatus"
                            checked={erSykmeldtMedArbeidsgiver === false}
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