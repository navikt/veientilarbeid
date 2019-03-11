import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
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

    render() {
        const linkCreator = (props: {}) => {
            return <a onClick={() => gaTilDialog(this.props.antallUleste)} {...props}/>;
        };

        const className = this.props.antallUleste > 0 ? ' uleste' : '';

        return (
            <section className={'dialog' + className}>
                <LenkepanelBase
                    href={DIALOG_URL}
                    tittelProps="undertittel"
                    linkCreator={linkCreator}
                    border={true}
                >
                    <div className="dialog__innhold">
                        {this.props.antallUleste > 0 ?
                            <DialogFill messagesCount={this.props.antallUleste}/> :
                            <img
                                src={dialogLine}
                                className="dialog__ikon"
                                alt=""
                            />
                        }
                        <div>
                            <Systemtittel className="dialog__tittel">
                                <FormattedMessage id="dialog"/>
                            </Systemtittel>
                            <Normaltekst>
                                {this.props.antallUleste > 0 ?
                                    this.props.antallUleste + ' ' :
                                    'Ingen '}
                                <FormattedMessage id="dialog-tekst"/>
                            </Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallUleste: state.ulesteDialoger.data.antallUleste
});

export default connect(mapStateToProps)(Dialog);
