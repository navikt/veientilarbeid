import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialog } from '../../metrics';
import { antallUlesteDialoger } from '../../metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import './dialog.less';
import { dialogLenke } from '../../innhold/lenker';

interface StateProps {
    antallUleste: number;
}

function Dialog({antallUleste}: StateProps) {
    const firstRender = React.useRef(true);

    React.useEffect(() => {
        if (firstRender.current) {
            antallUlesteDialoger(antallUleste);
        }
    });

    function byggDialogTekst() {
        switch (antallUleste) {
            case 0:
                return 'Ingen uleste dialoger';
            case 1:
                return antallUleste.toString() + ' ulest dialog';
            default:
                return antallUleste.toString() + ' uleste dialoger';
        }
    }

    const linkCreator = (props: {}) => {
        return <a onClick={() => gaTilDialog(antallUleste)} {...props}/>;
    };

    return (
        <LenkepanelBase
            href={dialogLenke}
            tittelProps="undertittel"
            linkCreator={linkCreator}
            border={true}
            className="dialog"
        >
            <div className="lenkepanel__innhold">
                <div className="lenkepanel__ikon">
                    {antallUleste > 0 ?
                        <DialogFill messagesCount={antallUleste}/> :
                        <DialogLine/>
                    }
                </div>
                <div className="lenkepanel__tekst">
                    <Undertittel>
                        <FormattedMessage id="dialog"/>
                    </Undertittel>
                    <Normaltekst className="lenkepanel__ingress">
                        {byggDialogTekst()}
                    </Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallUleste: state.ulesteDialoger.data.antallUleste
});

export default connect(mapStateToProps)(Dialog);
