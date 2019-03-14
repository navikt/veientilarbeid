import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialog } from '../../metrics';
import { antallUlesteDialoger } from '../../metrics';
import DialogFill from './dialog-fill';
import dialogLine from './dialog-line.svg';
import './dialog.less';

export const DIALOG_URL = '/aktivitetsplan/dialog';

interface StateProps {
    antallUleste: number;
}

class Dialog extends React.Component<StateProps> {

    componentDidMount() {
        antallUlesteDialoger(this.props.antallUleste);
    }

    byggDialogTekst() {
        let dialogTekst;
        switch (this.props.antallUleste) {
            case 0:
                dialogTekst = 'Ingen uleste dialoger';
                break;
            case 1:
                dialogTekst = this.props.antallUleste.toString() + ' ulest dialog';
                break;
            default:
                dialogTekst = this.props.antallUleste.toString() + ' uleste dialoger';
                break;
        }
        return dialogTekst;
    }

    render() {
        const linkCreator = (props: {}) => {
            return <a onClick={() => gaTilDialog(this.props.antallUleste)} {...props}/>;
        };

        return (
            <LenkepanelBase
                href={DIALOG_URL}
                tittelProps="undertittel"
                linkCreator={linkCreator}
                border={true}
                className="dialog"
            >
                <div className="lenkepanel__innhold">
                    <div className="lenkepanel__ikon">
                        {this.props.antallUleste > 0 ?
                            <DialogFill messagesCount={this.props.antallUleste}/> :
                            <img src={dialogLine} alt=""/>
                        }
                    </div>
                    <div className="lenkepanel__tekst">
                        <Undertittel>
                            <FormattedMessage id="dialog"/>
                        </Undertittel>
                        <Normaltekst>
                            {this.byggDialogTekst()}
                        </Normaltekst>
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallUleste: state.ulesteDialoger.data.antallUleste
});

export default connect(mapStateToProps)(Dialog);
