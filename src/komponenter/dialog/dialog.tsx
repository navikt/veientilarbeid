import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import './dialog.less';
import dialogIkon from './dialog.svg';

class Dialog extends React.Component  {
    render() {
        return (
            <section className="dialog">
                <LenkepanelBase href="/aktivitetsplan/dialog" tittelProps="undertittel" border={true}>
                    <div className="dialog__innhold">
                        <img
                            src={dialogIkon}
                            className="dialog__ikon"
                            alt="dialog-ikon"
                        />
                        <Systemtittel className="dialog__tittel">
                            <FormattedMessage id="dialog"/>
                        </Systemtittel>
                    </div>
                </LenkepanelBase>
            </section>
        );
    }
}

export default Dialog;
