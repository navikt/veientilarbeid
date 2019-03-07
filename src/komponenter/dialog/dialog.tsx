import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { Power2, TweenLite } from 'gsap/all';
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

class Dialog extends React.Component<StateProps>  {

    componentDidMount() {
        antallUlesteDialoger(this.props.antallUleste);

        if (this.props.antallUleste > 0) {
            const notification = document.querySelector('.notification circle');
            const text = document.querySelector('.notification text');
            TweenLite.to(notification, 0.7, {fill: '#c30000', delay: 0.5, ease: Power2.easeOut});
            TweenLite.to(notification, 0.7, {attr: {r: '10'}, delay: 0.5, ease: Power2.easeOut});
            TweenLite.to(text, 0.5, {opacity: 1, delay: 0.7, ease: Power2.easeOut});
        }
    }

    render() {
        const linkCreator = (props: {}) => {
          return <a onClick={() => gaTilDialog(this.props.antallUleste)} {...props}/>;
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
