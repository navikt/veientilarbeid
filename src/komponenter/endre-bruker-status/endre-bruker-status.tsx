import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import getStore from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import sykeforloepMetadataMock from '../../mocks/sykeforloep-metadata-mock';
import { selectSykeforloepMetadata, State as SykeforloepMetadataState,
    ActionTypes as SykeforloepMetadataActionTypes } from '../../ducks/sykeforloep-metadata';
import './endre-bruker-status.less';

interface StateProps {
    sykeforloepMetadata: SykeforloepMetadataState;
}

type Props = InjectedIntlProps & StateProps;

class EndreBrukerStatus extends React.Component<Props> {

    dispatchErSykmeldt = (erSykmeldt: boolean) => {
        console.log(erSykmeldt); // tslint:disable-line
        getStore().dispatch(
            {
                type: SykeforloepMetadataActionTypes.HENT_SYKEFORLOEP_METADATA_OK,
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
    sykeforloepMetadata: selectSykeforloepMetadata(state),
});

export default connect(mapStateToProps)(injectIntl(EndreBrukerStatus));