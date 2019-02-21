import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import './dialog.less';
import dialogIkon from './dialog.svg';
import { gaTilDialog } from '../../metrics';

class Dialog extends React.Component  {
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
