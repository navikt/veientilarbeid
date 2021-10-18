import { useContext } from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { loggAktivitet } from '../../metrics/metrics';
import DialogFill from './dialog-fill';
import DialogLine from './dialog-line';
import './dialog.less';
import { dialogLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UlesteDialogerContext } from '../../ducks/ulestedialoger';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import * as BrukerInfo from '../../ducks/bruker-info';
import { OppfolgingContext } from '../../ducks/oppfolging';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import { kanVise14AStatus } from '../../lib/kan-vise-14a';

const Dialog = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const ulesteDialoger = useContext(UlesteDialogerContext).data;
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const { data: registreringData } = useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = useContext(OppfolgingContext);
    const { data: brukerInfoData } = useContext(BrukerInfo.BrukerInfoContext);
    const ser14aStatus = kanVise14AStatus({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const kanViseKomponent = underOppfolging && !ser14aStatus;

    const { antallUleste } = ulesteDialoger;

    const handleClick = () => {
        if (antallUleste > 0) {
            loggAktivitet({ aktivitet: 'Svarer på dialog', ...amplitudeData });
        } else {
            loggAktivitet({ aktivitet: 'Innleder dialog', ...amplitudeData });
        }
    };

    const linkCreator = (props: {}) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a onClick={handleClick} {...props} />;
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
    };

    return !kanViseKomponent ? null : (
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
                    <Normaltekst className="lenkepanel__ingress">{byggDialogTekst()}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Dialog;
