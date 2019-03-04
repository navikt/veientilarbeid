import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialog } from '../../metrics';
import { loggeUlesteDialoger } from '../../metrics';
import DialogFill from './dialog-fill';
import dialogLine from './dialog-line.svg';

import './dialog.less';
export const DIALOG_URL = '/aktivitetsplan/dialog';

interface StateProps {
    antallUleste: number;
}

class Dialog extends React.Component<StateProps>  {

    componentDidMount() {
        loggeUlesteDialoger(this.props.antallUleste);
    }

    render() {
        const linkCreator = (props: {}) => {
          return <a onClick={gaTilDialog} {...props}/>;
        };

        return (
            <section className="dialog">
                <div className="limit">
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
                            <Systemtittel className="dialog__tittel">
                                <FormattedMessage id="dialog"/>
                            </Systemtittel>
                        </div>
                    </LenkepanelBase>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallUleste: state.ulesteDialoger.data.antallUleste
});

export default connect(mapStateToProps)(Dialog);
