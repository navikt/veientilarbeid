import React from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilDialogPermittert, loggAktivitet } from '../../metrics/metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import './dialog.less';
import { dialogLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';

interface StateProps {
    antallUleste: number;
}

const DialogPermittert = (props: StateProps) => {
    const { antallUleste } = props;

    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleClick = () => {
        gaTilDialogPermittert(antallUleste, servicegruppe);
        if (antallUleste > 0) {
            loggAktivitet({ aktivitet: 'Svarer på dialog for permitterte', ...amplitudeAktivitetsData });
        } else {
            loggAktivitet({ aktivitet: 'Innleder dialog for permitterte', ...amplitudeAktivitetsData });
        }
    };

    const linkCreator = (props: {}) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a onClick={handleClick} {...props} />;
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
                    {antallUleste > 0 ? <DialogFill messagesCount={antallUleste} /> : <DialogLine />}
                </div>
                <div className="lenkepanel__tekst">
                    <Undertittel>{tekster['dialog']}</Undertittel>
                    <Normaltekst className="lenkepanel__ingress">
                        Er du fortsatt permittert?
                        <br />
                        Hvis du har begynt å jobbe igjen eller har mistet jobben, gi beskjed til NAV her.
                    </Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    antallUleste: state.ulesteDialoger.data.antallUleste,
});

export default connect(mapStateToProps)(DialogPermittert);
