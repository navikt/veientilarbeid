import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialog } from '../../metrics';
import { loggeUlesteDialoger } from '../../metrics';
import DialogFill from './dialog-fill';

import './dialog.less';

interface StateProps {
    antallUlesteDialoger: number;
}

class Dialog extends React.Component<StateProps>  {

    componentDidMount() {
        loggeUlesteDialoger(this.props.antallUlesteDialoger);
    }

    render() {
        const linkCreator = (props: {}) => {
          return <a onClick={gaTilDialog} {...props}/>;
        };

        return (
            <section className="dialog">
                <LenkepanelBase
                    href="/aktivitetsplan/dialog"
                    tittelProps="undertittel"
                    linkCreator={linkCreator}
                    border={true}
                >
                    <div className="dialog__innhold">
                        <DialogFill messagesCount={this.props.antallUlesteDialoger}/>
                        <Systemtittel className="dialog__tittel">
                            <FormattedMessage id="dialog"/>
                        </Systemtittel>
                    </div>
                </LenkepanelBase>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallUlesteDialoger: state.ulesteDialoger.data.antallUlesteDialoger
});

export default connect(mapStateToProps)(Dialog);
