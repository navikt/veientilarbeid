import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import './dialog.less';
import dialogIkon from './dialog.svg';
import { gaTilDialog } from '../../metrics';

interface StateProps {
    antallUlesteDialoger: number;
}

class Dialog extends React.Component<StateProps>  {
    render() {
        const { antallUlesteDialoger } = this.props;

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
                        <img
                            src={dialogIkon}
                            className="dialog__ikon"
                            alt="dialog-ikon"
                        />
                        <Systemtittel className="dialog__tittel">
                            {antallUlesteDialoger}<FormattedMessage id="dialog"/>
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
