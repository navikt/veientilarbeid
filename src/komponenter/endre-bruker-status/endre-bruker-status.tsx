import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { AppState } from '../../reducer';
import getStore from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import sykeforloepMetadataMock from '../../mocks/sykmeldt-info-mock';
import { selectSykmeldtInfo, State as SykeforloepMetadataState,
    ActionTypes as SykmeldtInfoActionTypes } from '../../ducks/sykmeldt-info';
import './endre-bruker-status.less';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

type Props = InjectedIntlProps & StateProps;

class EndreBrukerStatus extends React.Component<Props> {

    componentWillMount() {
        const brukerStatus = parse(window.location.search).brukerStatus;

        if (brukerStatus === 'ordinaer') {
            this.dispatchErSykmeldt(false);
        } else if (brukerStatus === 'sykmeldt') {
            this.dispatchErSykmeldt(true);
        }

    }

    dispatchErSykmeldt = (erSykmeldt: boolean) => {
        getStore().dispatch(
            {
                type: SykmeldtInfoActionTypes.HENT_SYKMELDT_INFO_OK,
                data: Object.assign({}, sykeforloepMetadataMock,
                                    { erArbeidsrettetOppfolgingSykmeldtInngangAktiv: erSykmeldt})
            }
        );
    }

    render() {

        const erSykmeldt = this.props.sykeforloepMetadata.data!.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;

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
                                this.dispatchErSykmeldt(true);
                            }}
                            type="radio"
                            id="sykmeldt"
                            value="Sykmeldt"
                            name="brukerStatus"
                            checked={erSykmeldt}
                        />
                        <label htmlFor="sykmeldt">Sykmeldt</label>
                    </div>

                    <div className="endre-bruker-status__radio-btn-wrapper">
                        <input
                            onChange={() => {
                                this.dispatchErSykmeldt(false);
                            }}
                            type="radio"
                            id="ordinaer"
                            value="Ordinær"
                            name="brukerStatus"
                            checked={!erSykmeldt}
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