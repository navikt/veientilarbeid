import React from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialog, loggAktivitet } from '../../metrics/metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import './dialog.less';
import { dialogLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { POAGruppe } from '../../utils/get-poa-group'

interface StateProps {
    antallUleste: number;
}

interface OwnProps {
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

type AllProps = StateProps & OwnProps;

const Dialog = (props: AllProps) => {
    const { antallUleste, poaGruppe, geografiskTilknytning, isKSSX } = props;
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleClick = () => {
        gaTilDialog(antallUleste, servicegruppe);
        if (antallUleste > 0) {
            loggAktivitet({ aktivitet: 'Svarer på dialog', gruppe: poaGruppe, geografiskTilknytning, isKSSX })
        } else {
            loggAktivitet({ aktivitet: 'Innleder dialog', gruppe: poaGruppe, geografiskTilknytning, isKSSX})
        }
    };
    
    const linkCreator = (props: {}) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a onClick={handleClick} {...props}/>;
    };

    const byggDialogTekst = () => {
        switch (antallUleste) {
            case 0:
                return 'Send melding hvis du lurer på noe';
            case 1:
                return antallUleste.toString() + ' ulest melding';
            default:
                return antallUleste.toString() + ' uleste meldinger';
        }
    }

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
                        {tekster['dialog']}
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
    antallUleste: state.ulesteDialoger.data.antallUleste,
});

export default connect(mapStateToProps)(Dialog);
